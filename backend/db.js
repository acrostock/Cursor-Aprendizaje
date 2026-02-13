/**
 * Base de datos SQLite con sql.js (sin compilación nativa; funciona en Windows).
 * Crea la tabla 'items' si no existe. Persistencia manual con save().
 */

const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'data.db');
let db = null;
let SQL = null;

async function initDb() {
  if (db) return { db, save };
  SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buf = fs.readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      cuerpo TEXT,
      origen TEXT,
      creado_en TEXT DEFAULT (datetime('now'))
    )
  `);
  return { db, save };
}

function save() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function getDb() {
  return db;
}

module.exports = { initDb, getDb, save };
