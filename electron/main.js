import { app, BrowserWindow, ipcMain, globalShortcut, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

import { setupMonitor } from './monitor.js';
import { setupDB } from './ipc/db.js';
import { setupCalendar } from './ipc/calendar.js';
import { setupMail } from './ipc/mail.js';
import { setupSystem } from './ipc/system.js';
import { setupVoice } from './ipc/voice.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
let mainWindow;
let cpuWindow = null;
let memWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 460,
    height: 560,
    transparent: true,
    frame: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    resizable: true,
    autoHideMenuBar: true,
  });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

function createWidgetWindow(type) {
  const win = new BrowserWindow({
    width: 120,
    height: 120,
    transparent: true,
    frame: false,
    hasShadow: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  if (isDev) {
    win.loadURL(`http://localhost:5173/#widget-${type}`);
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'), { hash: `widget-${type}` });
  }

  return win;
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('ping', () => 'pong from main process');

  setupMonitor(mainWindow);
  setupDB();
  setupCalendar();
  setupMail();
  setupSystem();
  setupVoice();

  ipcMain.handle('window-close', () => {
    mainWindow.hide();
  });

  ipcMain.handle('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('pin-widgets', () => {
    if (!cpuWindow) cpuWindow = createWidgetWindow('cpu');
    if (!memWindow) memWindow = createWidgetWindow('mem');
  });

  ipcMain.handle('unpin-widgets', () => {
    if (cpuWindow) { cpuWindow.close(); cpuWindow = null; }
    if (memWindow) { memWindow.close(); memWindow = null; }
  });

  ipcMain.handle('open-external', (_, url) => {
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
      shell.openExternal(url);
    }
  });

  ipcMain.handle('set-opacity', (_, opacity) => {
    if (mainWindow && typeof opacity === 'number') {
      const clamped = Math.max(0.3, Math.min(1.0, opacity));
      mainWindow.setOpacity(clamped);
    }
  });

  // Auto-start on login (only when packaged)
  if (!isDev) {
    app.setLoginItemSettings({
      openAtLogin: true,
      path: app.getPath('exe'),
    });
  }

  // Global shortcut to show/hide
  globalShortcut.register('Alt+Space', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
