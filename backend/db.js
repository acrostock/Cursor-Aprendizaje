/**
 * Conexión y preparación de la base de datos SQLite.
 * Crea la tabla 'items' si no existe.
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

// Tabla de ejemplo: ítems (ej. productos o registros descargados)
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    cuerpo TEXT,
    origen TEXT,
    creado_en TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;
