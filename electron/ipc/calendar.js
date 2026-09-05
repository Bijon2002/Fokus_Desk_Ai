import { ipcMain } from 'electron';
import { authenticate, getSilentToken, refreshAccessToken, deleteSavedToken, loadCredentials } from './googleAuth.js';

function getDemoCalendarEvents() {
  const now = new Date();
  const today1 = new Date(now);
  today1.setHours(10, 0, 0, 0);

  const today2 = new Date(now);
  today2.setHours(14, 30, 0, 0);

  const today3 = new Date(now);
  today3.setHours(17, 0, 0, 0);

  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
  tomorrow.setHours(11, 0, 0, 0);

  return [
    {
      id: 'demo-cal-1',
      title: 'Tactical HUD & Interface Calibration',
      time: '10:00 AM',
      rawStart: today1.toISOString(),
      description: 'Review HUD telemetry, hero themes, audio cues, and widget response times.',
      location: 'HQ Conference Room A',
      htmlLink: 'https://calendar.google.com',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      meetingType: 'Google Meet',
      isDemo: true,
    },
    {
      id: 'demo-cal-2',
      title: 'Stark Tech Architecture Sync',
      time: '02:30 PM',
      rawStart: today2.toISOString(),
      description: 'Deep dive into Arc Reactor power management algorithms and cognitive capacity models.',
      location: 'Stark Tower Lab 4',
      htmlLink: 'https://calendar.google.com',
      meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
      meetingType: 'Google Meet',
      isDemo: true,
    },
    {
      id: 'demo-cal-3',
      title: 'Daily Wrap-up & Priorities Review',
      time: '05:00 PM',
      rawStart: today3.toISOString(),
      description: 'Consolidate completed focus tasks and align on upcoming development milestones.',
      location: 'Virtual',
      htmlLink: 'https://calendar.google.com',
      meetingUrl: null,
      meetingType: null,
      isDemo: true,
    },
    {
      id: 'demo-cal-4',
      title: 'Sprint Planning & Release Checklist',
      time: '11:00 AM',
      rawStart: tomorrow.toISOString(),
      description: 'Sprint planning for next release cycle and production build signoff.',
      location: 'Virtual',
      htmlLink: 'https://calendar.google.com',
      meetingUrl: 'https://zoom.us/j/123456789',
      meetingType: 'Zoom',
      isDemo: true,
    }
  ];
}

export function setupCalendar() {
  loadCredentials();

  ipcMain.handle('calendar-get-events', async () => {
    try {
      const token = await getSilentToken();
      if (!token) {
        return {
          connected: false,
          events: getDemoCalendarEvents(),
          message: 'Showing demo calendar events. Connect Google Account to sync live events.'
        };
      }
      
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${encodeURIComponent(startOfDay.toISOString())}` +
        `&maxResults=50&singleEvents=true&orderBy=startTime`,
        { headers: { Authorization: `Bearer ${token.access_token}` } }
      );

      if (res.status === 401) {
        console.log('[Calendar] 401 received from Google Calendar API. Attempting refresh...');
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
            return { connected: true, events: formatEvents(data.items || []) };
          } catch (e) {
            deleteSavedToken();
            return { connected: false, events: getDemoCalendarEvents() };
          }
        } else {
          deleteSavedToken();
          return { connected: false, events: getDemoCalendarEvents() };
        }
      }

      const data = await res.json();
      if (data.items) {
        console.log(`[Calendar] Fetched ${data.items.length} events`);
        return { connected: true, events: formatEvents(data.items) };
      } else {
        console.warn('[Calendar] Google API response:', data);
        return { connected: false, events: getDemoCalendarEvents() };
      }
    } catch (err) {
      if (!err.message.includes('already in progress') && !err.message.includes('timed out')) {
        console.error('[Calendar] Error fetching events:', err.message);
      }
      return { connected: false, events: getDemoCalendarEvents() };
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
