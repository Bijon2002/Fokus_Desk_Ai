import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function voiceApiPlugin() {
  return {
    name: 'voice-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/voice-generate') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { text, themeKey } = JSON.parse(body || '{}');
              const scriptPath = path.resolve(__dirname, 'scripts/speak_character.py');
              const outPath = path.resolve(__dirname, 'public/audio/live_briefing.mp3');

              const py = spawn('python', [scriptPath, themeKey || 'ironman', outPath]);
              py.stdin.write(text || '', 'utf8');
              py.stdin.end();

              let output = '';
              py.stdout.on('data', d => { output += d.toString(); });
              py.stderr.on('data', d => { console.error('[Vite Voice] stderr:', d.toString()); });

              py.on('close', code => {
                res.setHeader('Content-Type', 'application/json');
                if (code === 0 && fs.existsSync(outPath)) {
                  res.end(JSON.stringify({
                    success: true,
                    audioUrl: `/audio/live_briefing.mp3?t=${Date.now()}`
                  }));
                } else {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: output }));
                }
              });

              py.on('error', err => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              });
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), voiceApiPlugin()],
  base: './',
  build: {
    outDir: 'dist',
  },
});
