import path from 'path';
import { app, ipcMain } from 'electron';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export function setupDB() {
  const dbPath = path.join(app.getPath('userData'), 'focusdesk.db');
  db = new Database(dbPath);

  // Initialize schema
  const schemaPath = path.join(__dirname, '../../database/schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema);
  } else {
    console.error('[DB] Schema file not found at:', schemaPath);
    // Inline schema fallback
    db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        duration INTEGER NOT NULL,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed BOOLEAN DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  }

  console.log('[DB] Database initialized at:', dbPath);

  ipcMain.handle('db-get-tasks', () => {
    return db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
  });

  ipcMain.handle('db-add-task', (_, title) => {
    const info = db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
    return info.lastInsertRowid;
  });

  ipcMain.handle('db-toggle-task', (_, id, completed) => {
    db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(completed ? 1 : 0, id);
    return true;
  });

  ipcMain.handle('db-delete-task', (_, id) => {
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return true;
  });

  ipcMain.handle('db-get-note', () => {
    const row = db.prepare('SELECT * FROM notes ORDER BY id DESC LIMIT 1').get();
    return row ? row.content : '';
  });

  ipcMain.handle('db-save-note', (_, content) => {
    const row = db.prepare('SELECT id FROM notes ORDER BY id DESC LIMIT 1').get();
    if (row) {
      db.prepare('UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(content, row.id);
    } else {
      db.prepare('INSERT INTO notes (content) VALUES (?)').run(content);
    }
    return true;
  });

  ipcMain.handle('db-get-settings', () => {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const r of rows) {
      try {
        settings[r.key] = JSON.parse(r.value);
      } catch {
        settings[r.key] = r.value;
      }
    }
    return settings;
  });

  ipcMain.handle('db-save-setting', (_, key, value) => {
    const valStr = typeof value === 'string' ? value : JSON.stringify(value);
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, valStr);
    return true;
  });
}
