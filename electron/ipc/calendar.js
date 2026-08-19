import { app, ipcMain, shell, safeStorage } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = path.join(__dirname, '..', 'client_secret_687956472218-7rs5tqis4lvcuqtk2npp8n55n5q8p3ir.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(app.getPath('userData'), 'token.enc');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

let credentials = null;
let tokenData = null;
let authInProgress = false;

function loadCredentials() {
  if (fs.existsSync(CREDENTIALS_PATH)) {
    const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    credentials = JSON.parse(content).installed;
    console.log('[Calendar] Credentials loaded');
    return true;
  }
  console.error('[Calendar] Credentials not found at:', CREDENTIALS_PATH);
  return false;
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
      fs.unlinkSync(TOKEN_PATH);
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

  if (!res.ok) throw new Error('Token refresh failed: ' + res.status);
  const newToken = await res.json();
  tokenData = { ...token, ...newToken };
  saveToken(tokenData);
  return tokenData;
}

function authenticate() {
  return new Promise((resolve, reject) => {
    if (!credentials) return reject(new Error('No credentials'));

    // Already have a token
    const saved = tokenData || loadToken();
    if (saved) {
      tokenData = saved;
      // Check if expired
      if (saved.expiry_date && Date.now() > saved.expiry_date - 60000) {
        if (saved.refresh_token) {
          return refreshAccessToken(saved).then(resolve).catch(reject);
        }
      }
      return resolve(saved);
    }

    if (authInProgress) {
      return reject(new Error('Auth in progress — complete it in your browser'));
    }
    authInProgress = true;

    const server = http.createServer(async (req, res) => {
      try {
        if (req.url && req.url.includes('code=')) {
          const port = server.address().port;
          const url = new URL(req.url, `http://localhost:${port}`);
          const code = url.searchParams.get('code');

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body style="font-family:sans-serif;text-align:center;padding:60px"><h2 style="color:#4CAF50">✓ Authentication successful!</h2><p>Return to FocusDesk.</p></body></html>');
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

          if (!tokenRes.ok) throw new Error('Token exchange failed');
          tokenData = await tokenRes.json();
          tokenData.expiry_date = Date.now() + (tokenData.expires_in * 1000);
          saveToken(tokenData);
          console.log('[Calendar] OAuth completed');
          resolve(tokenData);
        }
      } catch (err) {
        console.error('[Calendar] OAuth error:', err.message);
        res.writeHead(500); res.end('Failed');
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

      console.log('[Calendar] OAuth on port', port);
      shell.openExternal(authUrl);
    });
  });
}

export function setupCalendar() {
  const loaded = loadCredentials();

  ipcMain.handle('calendar-get-events', async () => {
    if (!loaded) return [];

    try {
      const token = await authenticate();
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${encodeURIComponent(new Date().toISOString())}` +
        `&maxResults=50&singleEvents=true&orderBy=startTime`,
        { headers: { Authorization: `Bearer ${token.access_token}` } }
      );

      if (res.status === 401 && token.refresh_token) {
        const refreshed = await refreshAccessToken(token);
        const retry = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
          `timeMin=${encodeURIComponent(new Date().toISOString())}` +
          `&maxResults=50&singleEvents=true&orderBy=startTime`,
          { headers: { Authorization: `Bearer ${refreshed.access_token}` } }
        );
        const data = await retry.json();
        return formatEvents(data.items || []);
      }

      const data = await res.json();
      console.log(`[Calendar] Fetched ${(data.items || []).length} events`);
      return formatEvents(data.items || []);
    } catch (err) {
      console.error('[Calendar] Error:', err.message);
      return [];
    }
  });
}

function formatEvents(items) {
  return items.map(event => {
    const start = event.start?.dateTime || event.start?.date || '';
    const date = new Date(start);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { 
      id: event.id, 
      title: event.summary || '(No title)', 
      time, 
      rawStart: start,
      description: event.description || ''
    };
  });
}
