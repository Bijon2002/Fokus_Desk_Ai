import { ipcMain } from 'electron';
import { authenticate, getSilentToken, refreshAccessToken, deleteSavedToken, loadCredentials } from './googleAuth.js';

function parseFromHeader(fromStr = '') {
  const match = fromStr.match(/^(.*?)\s*<(.+?)>$/);
  if (match) {
    return {
      name: match[1].replace(/^["']|["']$/g, '').trim() || match[2],
      email: match[2].trim(),
    };
  }
  return {
    name: fromStr.replace(/^["']|["']$/g, '').trim() || 'Unknown Sender',
    email: fromStr.trim(),
  };
}

function getDemoEmails() {
  const now = new Date();

  // Today email 1 (30 mins ago)
  const today1 = new Date(now.getTime() - 35 * 60 * 1000);
  // Today email 2 (2 hours ago)
  const today2 = new Date(now.getTime() - 2 * 3600 * 1000);
  // Today email 3 (4 hours ago)
  const today3 = new Date(now.getTime() - 4 * 3600 * 1000);

  // Yesterday email 1 (26 hours ago)
  const yesterday1 = new Date(now.getTime() - 26 * 3600 * 1000);
  // Yesterday email 2 (30 hours ago)
  const yesterday2 = new Date(now.getTime() - 30 * 3600 * 1000);

  // 2 days ago
  const twoDaysAgo = new Date(now.getTime() - 52 * 3600 * 1000);
  // 3 days ago
  const threeDaysAgo = new Date(now.getTime() - 76 * 3600 * 1000);

  return [
    {
      id: 'demo-1',
      senderName: 'GitHub Alerts',
      senderEmail: 'notifications@github.com',
      subject: 'Security Alert: New dependency vulnerability found',
      snippet: 'Dependabot detected a moderate severity security vulnerability in package lodash...',
      isUnread: true,
      timestamp: today1.getTime(),
      dateStr: today1.toISOString(),
      timeStr: today1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-2',
      senderName: 'Stark Industries Team',
      senderEmail: 'projects@starkindustries.corp',
      subject: 'J.A.R.V.I.S. HUD Interface Calibration Report',
      snippet: 'Telemetry confirms arc reactor synchronization at 98.4%. Ready for production deployment...',
      isUnread: true,
      timestamp: today2.getTime(),
      dateStr: today2.toISOString(),
      timeStr: today2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-3',
      senderName: 'Productivity Digest',
      senderEmail: 'updates@focusdesk.ai',
      subject: 'Your Daily Focus & Schedule Overview',
      snippet: 'You have 3 scheduled meetings today. Check your calendar tab for meeting links.',
      isUnread: false,
      timestamp: today3.getTime(),
      dateStr: today3.toISOString(),
      timeStr: today3.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-4',
      senderName: 'Linear',
      senderEmail: 'notifications@linear.app',
      subject: 'FD-104: Mailbox Schedule and Date-wise View merged',
      snippet: 'Pull request #12 has been successfully merged into main by the engineering team.',
      isUnread: false,
      timestamp: yesterday1.getTime(),
      dateStr: yesterday1.toISOString(),
      timeStr: yesterday1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-5',
      senderName: 'Google Cloud Platform',
      senderEmail: 'cloud-billing@google.com',
      subject: 'Monthly Usage & Cloud Resource Summary',
      snippet: 'Your cloud resource usage for the previous billing cycle is ready for review in GCP Console.',
      isUnread: false,
      timestamp: yesterday2.getTime(),
      dateStr: yesterday2.toISOString(),
      timeStr: yesterday2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-6',
      senderName: 'Slack Notifications',
      senderEmail: 'feedback@slack.com',
      subject: 'New mentions in #core-architecture',
      snippet: '3 new replies in the discussion thread regarding the background monitor IPC and sqlite hooks.',
      isUnread: false,
      timestamp: twoDaysAgo.getTime(),
      dateStr: twoDaysAgo.toISOString(),
      timeStr: twoDaysAgo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    },
    {
      id: 'demo-7',
      senderName: 'Figma System',
      senderEmail: 'design@figma.com',
      subject: 'Updated component tokens for Dark HUD and Tactical views',
      snippet: 'New color variables and cyber glow shaders added to the shared workspace component library.',
      isUnread: false,
      timestamp: threeDaysAgo.getTime(),
      dateStr: threeDaysAgo.toISOString(),
      timeStr: threeDaysAgo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      webUrl: 'https://mail.google.com',
      isDemo: true,
    }
  ];
}

async function fetchGmailMessages(accessToken) {
  const listRes = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages?q=in:inbox&maxResults=25',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (listRes.status === 403) {
    const text = await listRes.text();
    console.warn('[Mail] 403 error from Gmail API:', text);
    if (text.includes('SERVICE_DISABLED') || text.includes('accessNotConfigured') || text.includes('has not been used in project')) {
      throw new Error('GMAIL_SERVICE_DISABLED');
    }
    throw new Error('INSUFFICIENT_SCOPE');
  }

  if (listRes.status === 401) {
    throw new Error('UNAUTHORIZED');
  }

  if (!listRes.ok) {
    throw new Error(`Gmail API error HTTP ${listRes.status}`);
  }

  const listData = await listRes.json();
  const rawList = listData.messages || [];
  if (rawList.length === 0) return [];

  // Fetch metadata for messages in parallel
  const detailPromises = rawList.slice(0, 20).map(async (item) => {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!msgRes.ok) return null;
      const msg = await msgRes.json();

      const headers = msg.payload?.headers || [];
      const getHeader = (name) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

      const fromRaw = getHeader('From');
      const { name: senderName, email: senderEmail } = parseFromHeader(fromRaw);
      const subject = getHeader('Subject') || '(No Subject)';
      const dateHeader = getHeader('Date');
      const timestamp = msg.internalDate ? parseInt(msg.internalDate, 10) : (dateHeader ? new Date(dateHeader).getTime() : Date.now());
      const dateObj = new Date(timestamp);

      return {
        id: msg.id,
        threadId: msg.threadId,
        senderName,
        senderEmail,
        subject,
        snippet: msg.snippet || '',
        isUnread: Array.isArray(msg.labelIds) && msg.labelIds.includes('UNREAD'),
        timestamp,
        dateStr: dateObj.toISOString(),
        timeStr: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        webUrl: `https://mail.google.com/mail/u/0/#inbox/${msg.id}`,
        isDemo: false,
      };
    } catch (err) {
      console.error('[Mail] Failed to fetch message detail:', item.id, err.message);
      return null;
    }
  });

  const detailed = await Promise.all(detailPromises);
  return detailed.filter(Boolean);
}

export function setupMail() {
  loadCredentials();

  ipcMain.handle('mail-get-messages', async () => {
    try {
      const token = await getSilentToken();
      if (!token) {
        return {
          connected: false,
          needsReauth: false,
          messages: getDemoEmails(),
          message: 'Showing demo mails. Connect Google Account with Gmail permission to sync live emails.'
        };
      }

      try {
        const messages = await fetchGmailMessages(token.access_token);
        console.log(`[Mail] Fetched ${messages.length} live Gmail messages`);
        return {
          connected: true,
          needsReauth: false,
          messages,
        };
      } catch (fetchErr) {
        if (fetchErr.message === 'UNAUTHORIZED' && token.refresh_token) {
          console.log('[Mail] 401 received. Attempting refresh token...');
          const refreshed = await refreshAccessToken(token);
          const messages = await fetchGmailMessages(refreshed.access_token);
          return {
            connected: true,
            needsReauth: false,
            messages,
          };
        }

        if (fetchErr.message === 'GMAIL_SERVICE_DISABLED') {
          return {
            connected: false,
            needsReauth: false,
            serviceDisabled: true,
            activationUrl: 'https://console.developers.google.com/apis/api/gmail.googleapis.com/overview?project=687956472218',
            messages: getDemoEmails(),
            message: 'Gmail API is disabled in your Google Cloud project. Enable it at: https://console.developers.google.com/apis/api/gmail.googleapis.com/overview?project=687956472218'
          };
        }

        if (fetchErr.message === 'INSUFFICIENT_SCOPE') {
          return {
            connected: false,
            needsReauth: true,
            serviceDisabled: false,
            messages: getDemoEmails(),
            message: 'Gmail read scope is missing on this token. Click Re-Authorize to grant Gmail permission.'
          };
        }

        throw fetchErr;
      }
    } catch (err) {
      console.error('[Mail] Error loading mail messages:', err.message);
      return {
        connected: false,
        needsReauth: false,
        messages: getDemoEmails(),
        error: err.message,
      };
    }
  });

  ipcMain.handle('mail-reauth', async () => {
    deleteSavedToken();
    try {
      await authenticate(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}
