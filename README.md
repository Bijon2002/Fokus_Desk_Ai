# FocusDesk AI

FocusDesk AI is a desktop widget built with React, Vite, and Electron designed to keep you focused and organized. Featuring a compact, superhero-themed Heads-Up Display (HUD), it seamlessly tracks your upcoming calendar events, provides a built-in Pomodoro timer, and monitors your system resources (CPU/RAM).

## Features
- **Dynamic Theming Engine**: Switch between epic aesthetics including *J.A.R.V.I.S.*, *Spider-Suit HUD*, *Wayne Enterprises*, *Focus Desk (Dark)*, and *Day Mode (Light)*.
- **Smart Calendar Sync**: Pulls your upcoming deadlines and schedule directly from Google Calendar, highlighting urgent events in red and grouping the rest by day.
- **Pomodoro Timer**: A built-in focus timer that syncs directly with the HUD aesthetics, keeping you on track for your study or work sessions.
- **System Monitoring**: Live floating widgets tracking your CPU and RAM usage.
- **Always-on-top Mode**: Pin the widget to float above other windows while you work.

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Credentials:**
   Place your Google Calendar API `credentials.json` in the root of the project. (This file is ignored by git for security).

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   This will start both the Vite React server and the Electron app simultaneously.

## Build for Production

To package the app into a standalone executable (`.exe` for Windows):
```bash
npm run pack
```
The installer will be generated in the `release/` directory.

## Tech Stack
- React 19
- Vite 8
- Tailwind CSS v4
- Electron (with `vite-plugin-electron`)
- Better-SQLite3 (Local caching)
- Google APIs Node.js Client
- Lucide React (Icons)
