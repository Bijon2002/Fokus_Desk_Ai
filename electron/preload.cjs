const { contextBridge, ipcRenderer } = require('electron');

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
  // System
  getSystemInfo: () => ipcRenderer.invoke('system-get-info'),
  // Window controls
  closeWindow: () => ipcRenderer.invoke('window-close'),
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  pinWidgets: () => ipcRenderer.invoke('pin-widgets'),
  unpinWidgets: () => ipcRenderer.invoke('unpin-widgets'),
});
