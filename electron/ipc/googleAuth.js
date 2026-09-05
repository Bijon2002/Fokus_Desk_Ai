import { app, shell, safeStorage } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(app.getPath('userData'), 'token.enc');
export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/gmail.readonly'
];

let credentials = null;
let tokenData = null;
let authInProgress = false;
let pendingAuthPromise = null;

export function findCredentialsPath() {
  const electronDir = path.join(__dirname, '..');
  const defaultCreds = path.join(electronDir, 'credentials.json');
  if (fs.existsSync(defaultCreds)) return defaultCreds;

  const files = fs.readdirSync(electronDir);
  const secretFile = files.find(f => f.startsWith('client_secret_') && f.endsWith('.json'));
  if (secretFile) return path.join(electronDir, secretFile);

  return defaultCreds;
}

export function loadCredentials() {
  if (credentials) return true;
  const credPath = findCredentialsPath();
  if (fs.existsSync(credPath)) {
    try {
      const content = fs.readFileSync(credPath, 'utf8');
      const parsed = JSON.parse(content);
      credentials = parsed.installed || parsed.web;
      console.log('[GoogleAuth] Credentials loaded from:', credPath);
      return true;
    } catch (e) {
      console.error('[GoogleAuth] Error parsing credentials file:', e.message);
      return false;
    }
  }
  console.error('[GoogleAuth] Credentials not found in electron directory');
  return false;
}

export function deleteSavedToken() {
  tokenData = null;
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      fs.unlinkSync(TOKEN_PATH);
      console.log('[GoogleAuth] Saved token removed');
    } catch (e) {
      console.error('[GoogleAuth] Error deleting token file:', e.message);
    }
  }
}

export function saveToken(token) {
  try {
    const tokenStr = JSON.stringify(token);
    if (safeStorage.isEncryptionAvailable()) {
      fs.writeFileSync(TOKEN_PATH, safeStorage.encryptString(tokenStr));
    } else {
      fs.writeFileSync(TOKEN_PATH, tokenStr);
    }
    console.log('[GoogleAuth] Token saved securely');
  } catch (e) {
    console.error('[GoogleAuth] Save token error:', e.message);
  }
}

export function loadToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const raw = fs.readFileSync(TOKEN_PATH);
      const decrypted = safeStorage.isEncryptionAvailable()
        ? safeStorage.decryptString(raw)
        : raw.toString('utf8');
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('[GoogleAuth] Corrupt token, deleting');
      deleteSavedToken();
      return null;
    }
  }
  return null;
}

export async function refreshAccessToken(token) {
  if (!credentials && !loadCredentials()) {
    throw new Error('Google credentials not loaded');
  }

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
    console.error('[GoogleAuth] Token refresh failed HTTP', res.status, errBody);
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

export async function getSilentToken() {
  const saved = tokenData || loadToken();
  if (!saved) return null;

  tokenData = saved;
  // If not expired (with 60s safety buffer), return immediately
  if (!saved.expiry_date || Date.now() <= saved.expiry_date - 60000) {
    return saved;
  }

  // If expired, try silent refresh
  if (saved.refresh_token) {
    try {
      return await refreshAccessToken(saved);
    } catch (err) {
      console.warn('[GoogleAuth] Silent token refresh failed:', err.message);
      deleteSavedToken();
      return null;
    }
  }

  return null;
}

export function authenticate(forceNew = false) {
  // If an OAuth browser prompt is already running, reuse the pending promise
  if (pendingAuthPromise) {
    return pendingAuthPromise;
  }

  if (!credentials) {
    if (!loadCredentials()) {
      return Promise.reject(new Error('No Google credentials found in electron directory'));
    }
  }

  if (!forceNew) {
    const saved = tokenData || loadToken();
    if (saved) {
      tokenData = saved;
      // Check if expired or about to expire in 60s
      if (saved.expiry_date && Date.now() > saved.expiry_date - 60000) {
        if (saved.refresh_token) {
          return refreshAccessToken(saved).catch(err => {
            console.warn('[GoogleAuth] Refresh failed. Clearing token and prompting re-auth...', err.message);
            deleteSavedToken();
            return authenticate(true);
          });
        }
      } else {
        return Promise.resolve(saved);
      }
    }
  }

  authInProgress = true;

  const authPromise = new Promise((resolve, reject) => {
    let timeoutId = null;

    const server = http.createServer(async (req, res) => {
      try {
        if (req.url) {
          if (timeoutId) clearTimeout(timeoutId);
          const port = server.address().port;
          const redirectUri = `http://127.0.0.1:${port}`;
          const url = new URL(req.url, redirectUri);
          const oauthError = url.searchParams.get('error');
          if (oauthError) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`<p>Google authorization was cancelled or denied: ${oauthError}</p>`);
            server.close();
            reject(new Error(`Google OAuth failed: ${oauthError}`));
            return;
          }

          const code = url.searchParams.get('code');
          if (!code) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing Google authorization code.');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f172a;color:#ffffff">
                <h2 style="color:#38bdf8">✓ Google Services Connected!</h2>
                <p style="color:#94a3b8">Calendar & Mailbox access granted. You can close this tab and return to FocusDesk.</p>
              </body>
            </html>
          `);
          server.close();

          // Exchange code for tokens
          const params = new URLSearchParams({
            code,
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            redirect_uri: redirectUri,
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
          console.log('[GoogleAuth] OAuth completed successfully');
          resolve(tokenData);
        }
      } catch (err) {
        console.error('[GoogleAuth] OAuth callback error:', err.message);
        res.writeHead(500);
        res.end('Authentication failed. Please try again.');
        server.close();
        reject(err);
      }
    });

    server.on('error', (err) => {
      if (timeoutId) clearTimeout(timeoutId);
      reject(err);
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const redirectUri = `http://127.0.0.1:${port}`;
      const authParams = new URLSearchParams({
        client_id: credentials.client_id,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: SCOPES.join(' '),
        access_type: 'offline',
        prompt: 'consent',
      });
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${authParams.toString()}`;

      console.log('[GoogleAuth] Opening browser for Google OAuth on loopback port', port);
      shell.openExternal(authUrl);

      // Auto-cleanup server after 2 minutes if user doesn't complete auth
      timeoutId = setTimeout(() => {
        try {
          server.close();
        } catch (e) {}
        reject(new Error('Google OAuth timed out after 2 minutes'));
      }, 120000);
    });
  }).finally(() => {
    authInProgress = false;
    pendingAuthPromise = null;
  });

  pendingAuthPromise = authPromise;
  return authPromise;
}
