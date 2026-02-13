/**
 * Script de descarga: obtiene datos de una API pública (JSONPlaceholder)
 * y los guarda en la base de datos SQLite del backend.
 *
 * Ejecutar desde la raíz del proyecto: node scripts/descargar-items.js
 */

const db = require('../backend/db');

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const ORIGEN = 'jsonplaceholder';

async function descargarYGuardar() {
  console.log('Descargando desde', API_URL, '...');
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const posts = await res.json();

  const insertar = db.prepare(
    'INSERT INTO items (titulo, cuerpo, origen) VALUES (?, ?, ?)'
  );
  const insertarMuchos = db.transaction((lista) => {
    for (const p of lista) {
      insertar.run(p.title, p.body, ORIGEN);
    }
  });

  insertarMuchos(posts);
  console.log(`Guardados ${posts.length} ítems en la base de datos.`);
}

descargarYGuardar().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
