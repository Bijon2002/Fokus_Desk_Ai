import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
  // DB
  getTasks: () => ipcRenderer.invoke('db-get-tasks'),
  addTask: (title) => ipcRenderer.invoke('db-add-task', title),
  toggleTask: (id, completed) => ipcRenderer.invoke('db-toggle-task', id, completed),
  deleteTask: (id) => ipcRenderer.invoke('db-delete-task', id),
  getNote: () => ipcRenderer.invoke('db-get-note'),
  saveNote: (content) => ipcRenderer.invoke('db-save-note', content),
  // Calendar
  getCalendarEvents: () => ipcRenderer.invoke('calendar-get-events'),
  reconnectCalendar: () => ipcRenderer.invoke('calendar-reauth'),
  // System
  getSystemInfo: () => ipcRenderer.invoke('system-get-info'),
  // Window & Shell controls
  closeWindow: () => ipcRenderer.invoke('window-close'),
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  pinWidgets: () => ipcRenderer.invoke('pin-widgets'),
  unpinWidgets: () => ipcRenderer.invoke('unpin-widgets'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  setOpacity: (opacity) => ipcRenderer.invoke('set-opacity', opacity),
  // Settings
  getSettings: () => ipcRenderer.invoke('db-get-settings'),
  saveSetting: (key, value) => ipcRenderer.invoke('db-save-setting', key, value),
});
