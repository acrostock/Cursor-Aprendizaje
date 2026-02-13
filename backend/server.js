/**
 * Servidor API — Express + SQLite.
 * Inicia la BD y monta las rutas bajo /api.
 */

const express = require('express');
const itemsRouter = require('./routes/items');

// Inicializar BD (crea tablas si no existen)
require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/items', itemsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, mensaje: 'API producto digital' });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log('  GET /api/health');
  console.log('  GET /api/items');
});
