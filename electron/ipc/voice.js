import { ipcMain, app } from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function setupVoice() {
  ipcMain.handle('voice-generate-speech', async (_, text, themeKey) => {
    try {
      const scriptPath = path.join(__dirname, '../../scripts/speak_character.py');
      const outPath = path.join(__dirname, '../../public/audio/live_briefing.mp3');

      return new Promise((resolve) => {
        const py = spawn('python', [scriptPath, themeKey || 'ironman', outPath]);

        py.stdin.write(text || '', 'utf8');
        py.stdin.end();

        let output = '';
        py.stdout.on('data', (d) => { output += d.toString(); });
        py.stderr.on('data', (d) => { console.error('[Voice] stderr:', d.toString()); });

        py.on('close', (code) => {
          if (code === 0 && fs.existsSync(outPath)) {
            resolve({ success: true, audioUrl: `/audio/live_briefing.mp3?t=${Date.now()}` });
          } else {
            console.error('[Voice] Synthesis exited with code:', code, output);
            resolve({ success: false, error: output });
          }
        });

        py.on('error', (err) => {
          console.error('[Voice] Spawn error:', err);
          resolve({ success: false, error: err.message });
        });
      });
    } catch (err) {
      console.error('[Voice] Failed:', err);
      return { success: false, error: err.message };
    }
  });
}
