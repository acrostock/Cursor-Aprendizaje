/**
 * Rutas API para ítems (lectura desde la BD).
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/items — listar todos los ítems
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT id, titulo, cuerpo, origen, creado_en FROM items ORDER BY creado_en DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/:id — un ítem por id
router.get('/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT id, titulo, cuerpo, origen, creado_en FROM items WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'No encontrado' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
