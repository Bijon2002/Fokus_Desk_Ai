import { ipcMain } from 'electron';

let si = null;

export function setupSystem() {
  ipcMain.handle('system-get-info', async () => {
    try {
      // Lazy-load systeminformation on first call
      if (!si) {
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        si = require('systeminformation');
      }

      const cpu = await si.currentLoad();
      const mem = await si.mem();

      return {
        cpuLoad: Math.round(cpu.currentLoad),
        memUsed: Math.round((mem.active / mem.total) * 100),
      };
    } catch (err) {
      console.error('[System] Error:', err.message);
      return { cpuLoad: 0, memUsed: 0 };
    }
  });
}
