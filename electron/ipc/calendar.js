import { app, ipcMain, shell, safeStorage } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(app.getPath('userData'), 'token.enc');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

let credentials = null;
let tokenData = null;
let authInProgress = false;

function findCredentialsPath() {
  const electronDir = path.join(__dirname, '..');
  const defaultCreds = path.join(electronDir, 'credentials.json');
  if (fs.existsSync(defaultCreds)) return defaultCreds;

  const files = fs.readdirSync(electronDir);
  const secretFile = files.find(f => f.startsWith('client_secret_') && f.endsWith('.json'));
  if (secretFile) return path.join(electronDir, secretFile);

  return defaultCreds;
}

function loadCredentials() {
  const credPath = findCredentialsPath();
  if (fs.existsSync(credPath)) {
    try {
      const content = fs.readFileSync(credPath, 'utf8');
      const parsed = JSON.parse(content);
      credentials = parsed.installed || parsed.web;
      console.log('[Calendar] Credentials loaded from:', credPath);
      return true;
    } catch (e) {
      console.error('[Calendar] Error parsing credentials file:', e.message);
      return false;
    }
  }
  console.error('[Calendar] Credentials not found in electron directory');
  return false;
}

function deleteSavedToken() {
  tokenData = null;
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      fs.unlinkSync(TOKEN_PATH);
      console.log('[Calendar] Expired/invalid token removed');
    } catch (e) {
      console.error('[Calendar] Error deleting token file:', e.message);
    }
  }
}

function saveToken(token) {
  try {
    const tokenStr = JSON.stringify(token);
    if (safeStorage.isEncryptionAvailable()) {
      fs.writeFileSync(TOKEN_PATH, safeStorage.encryptString(tokenStr));
    } else {
      fs.writeFileSync(TOKEN_PATH, tokenStr);
    }
    console.log('[Calendar] Token saved');
  } catch (e) {
    console.error('[Calendar] Save token error:', e.message);
  }
}

function loadToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const raw = fs.readFileSync(TOKEN_PATH);
      const decrypted = safeStorage.isEncryptionAvailable()
        ? safeStorage.decryptString(raw)
        : raw.toString('utf8');
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('[Calendar] Corrupt token, deleting');
      deleteSavedToken();
      return null;
    }
  }
  return null;
}

async function refreshAccessToken(token) {
  const params = new URLSearchParams({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    refresh_token: token.refresh_token,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[Calendar] Token refresh failed HTTP', res.status, errBody);
    throw new Error('Token refresh failed: ' + res.status);
  }

  const newToken = await res.json();
  tokenData = { 
    ...token, 
    ...newToken, 
    expiry_date: Date.now() + ((newToken.expires_in || 3600) * 1000) 
  };
  saveToken(tokenData);
  return tokenData;
}

function authenticate(forceNew = false) {
  return new Promise((resolve, reject) => {
    if (!credentials) {
      if (!loadCredentials()) {
        return reject(new Error('No Google credentials found in electron directory'));
      }
    }

    if (!forceNew) {
      const saved = tokenData || loadToken();
      if (saved) {
        tokenData = saved;
        // Check if expired or about to expire in 60s
        if (saved.expiry_date && Date.now() > saved.expiry_date - 60000) {
          if (saved.refresh_token) {
            return refreshAccessToken(saved)
              .then(resolve)
              .catch(err => {
                console.warn('[Calendar] Refresh failed (likely expired/revoked grant). Clearing token and triggering re-auth...', err.message);
                deleteSavedToken();
                // Trigger browser re-auth flow
                authenticate(true).then(resolve).catch(reject);
              });
          }
        } else {
          return resolve(saved);
        }
      }
    }

    if (authInProgress) {
      return reject(new Error('Auth already in progress — please complete it in your browser'));
    }
    authInProgress = true;

    const server = http.createServer(async (req, res) => {
      try {
        if (req.url && req.url.includes('code=')) {
          const port = server.address().port;
          const url = new URL(req.url, `http://localhost:${port}`);
          const code = url.searchParams.get('code');

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f172a;color:#ffffff"><h2 style="color:#38bdf8">✓ Google Calendar Connected!</h2><p>You can close this tab and return to FocusDesk.</p></body></html>');
          server.close();
          authInProgress = false;

          // Exchange code for tokens
          const params = new URLSearchParams({
            code,
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            redirect_uri: `http://localhost:${port}`,
            grant_type: 'authorization_code',
          });

          const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
          });

          if (!tokenRes.ok) {
            const errData = await tokenRes.text();
            throw new Error('Token exchange failed: ' + errData);
          }

          tokenData = await tokenRes.json();
          tokenData.expiry_date = Date.now() + ((tokenData.expires_in || 3600) * 1000);
          saveToken(tokenData);
          console.log('[Calendar] OAuth completed successfully');
          resolve(tokenData);
        }
      } catch (err) {
        console.error('[Calendar] OAuth callback error:', err.message);
        res.writeHead(500);
        res.end('Authentication failed. Please try again.');
        server.close();
        authInProgress = false;
        reject(err);
      }
    });

    server.on('error', (err) => {
      authInProgress = false;
      reject(err);
    });

    server.listen(0, () => {
      const port = server.address().port;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(credentials.client_id)}` +
        `&redirect_uri=${encodeURIComponent(`http://localhost:${port}`)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(SCOPES.join(' '))}` +
        `&access_type=offline` +
        `&prompt=consent`;

      console.log('[Calendar] Opening browser for Google OAuth on port', port);
      shell.openExternal(authUrl);
    });
  });
}

export function setupCalendar() {
  loadCredentials();

  ipcMain.handle('calendar-get-events', async () => {
    try {
      const token = await authenticate();
      
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${encodeURIComponent(startOfDay.toISOString())}` +
        `&maxResults=50&singleEvents=true&orderBy=startTime`,
        { headers: { Authorization: `Bearer ${token.access_token}` } }
      );

      if (res.status === 401) {
        console.log('[Calendar] 401 received from Google Calendar API. Attempting refresh or re-auth...');
        if (token.refresh_token) {
          try {
            const refreshed = await refreshAccessToken(token);
            const retry = await fetch(
              `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
              `timeMin=${encodeURIComponent(startOfDay.toISOString())}` +
              `&maxResults=50&singleEvents=true&orderBy=startTime`,
              { headers: { Authorization: `Bearer ${refreshed.access_token}` } }
            );
            const data = await retry.json();
            return formatEvents(data.items || []);
          } catch (e) {
            deleteSavedToken();
          }
        } else {
          deleteSavedToken();
        }
      }

      const data = await res.json();
      if (data.items) {
        console.log(`[Calendar] Fetched ${data.items.length} events`);
        return formatEvents(data.items);
      } else {
        console.warn('[Calendar] Google API response:', data);
        return [];
      }
    } catch (err) {
      console.error('[Calendar] Error fetching events:', err.message);
      return [];
    }
  });

  ipcMain.handle('calendar-reauth', async () => {
    deleteSavedToken();
    try {
      await authenticate(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}

function extractMeetingLink(event) {
  if (event.hangoutLink) {
    return { meetingUrl: event.hangoutLink, meetingType: 'Google Meet' };
  }

  if (event.conferenceData?.entryPoints) {
    const videoEntry = event.conferenceData.entryPoints.find(ep => ep.entryPointType === 'video');
    if (videoEntry?.uri) {
      const type = videoEntry.uri.includes('meet.google.com') ? 'Google Meet'
        : videoEntry.uri.includes('zoom.us') ? 'Zoom'
        : videoEntry.uri.includes('teams.microsoft.com') ? 'Teams'
        : 'Video Call';
      return { meetingUrl: videoEntry.uri, meetingType: type };
    }
  }

  const textToScan = `${event.location || ''} ${event.description || ''}`;
  
  const meetMatch = textToScan.match(/https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/i);
  if (meetMatch) return { meetingUrl: meetMatch[0], meetingType: 'Google Meet' };

  const zoomMatch = textToScan.match(/https:\/\/[a-zA-Z0-9-.]*zoom\.us\/j\/[0-9]+(?:\?[^\s"'<>]*)?/i);
  if (zoomMatch) return { meetingUrl: zoomMatch[0], meetingType: 'Zoom' };

  const teamsMatch = textToScan.match(/https:\/\/teams\.microsoft\.com\/l\/meetup-join\/[^\s"'<>]+/i);
  if (teamsMatch) return { meetingUrl: teamsMatch[0], meetingType: 'Teams' };

  return { meetingUrl: null, meetingType: null };
}

function formatEvents(items) {
  return items.map(event => {
    const isAllDay = !event.start?.dateTime && !!event.start?.date;
    const start = event.start?.dateTime || event.start?.date || '';
    let time = 'All Day';
    if (!isAllDay && start) {
      const date = new Date(start);
      time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const { meetingUrl, meetingType } = extractMeetingLink(event);
    return { 
      id: event.id, 
      title: event.summary || '(No title)', 
      time, 
      rawStart: start,
      description: event.description || '',
      location: event.location || '',
      htmlLink: event.htmlLink || '',
      meetingUrl,
      meetingType
    };
  });
}

