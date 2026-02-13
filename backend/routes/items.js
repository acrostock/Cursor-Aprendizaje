/**
 * Rutas API para ítems (lectura y creación con sql.js).
 */

const express = require('express');

function execToObjects(db, sql, params = []) {
  const stmt = db.prepare(sql, params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function createRouter(db, save) {
  const router = express.Router();

  // POST /api/items — crear ítem (aparece primero en la lista por ORDER BY creado_en DESC)
  router.post('/', (req, res) => {
    try {
      const { titulo, cuerpo = '', origen = 'app' } = req.body || {};
      if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
        return res.status(400).json({ error: 'titulo es obligatorio' });
      }
      const stmt = db.prepare(
        'INSERT INTO items (titulo, cuerpo, origen) VALUES (?, ?, ?)',
        [titulo.trim(), String(cuerpo).trim(), String(origen).trim() || 'app']
      );
      stmt.run();
      stmt.free();

      const [{ values: [[lastId]] }] = db.exec('SELECT last_insert_rowid()');
      const rows = execToObjects(
        db,
        `SELECT id, titulo, cuerpo, origen, creado_en FROM items WHERE id = ${lastId}`
      );
      save();
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/', (req, res) => {
    try {
      const rows = execToObjects(
        db,
        'SELECT id, titulo, cuerpo, origen, creado_en FROM items ORDER BY creado_en DESC'
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/items/count — total de ítems
  router.get('/count', (req, res) => {
    try {
      const [{ values: [[total]] }] = db.exec('SELECT COUNT(*) FROM items');
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', (req, res) => {
    try {
      const rows = execToObjects(
        db,
        'SELECT id, titulo, cuerpo, origen, creado_en FROM items WHERE id = ?',
        [req.params.id]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createRouter;
