/**
 * Servidor API — Express + SQLite (sql.js).
 * Inicia la BD y monta las rutas bajo /api.
 */

const express = require('express');
const { initDb } = require('./db');
const createItemsRouter = require('./routes/items');

const PORT = process.env.PORT || 3000;

async function main() {
  const { db, save } = await initDb();
  const app = express();

  app.use(express.json());
  app.use(express.static('public'));
  app.use('/api/items', createItemsRouter(db, save));

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, mensaje: 'API producto digital' });
  });

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log('  App:    http://localhost:' + PORT + '/');
    console.log('  API:    http://localhost:' + PORT + '/api/items');
  });
}

main().catch((err) => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});
