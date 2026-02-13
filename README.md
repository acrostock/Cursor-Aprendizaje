# Cursor-Aprendizaje — Productos digitales

Proyecto de aprendizaje de Cursor + workflow para desarrollo de productos digitales (API, backend, BBDD, scripts de descarga de información).

## Contenido del repositorio

| Carpeta / archivo | Descripción |
|-------------------|-------------|
| `backend/` | API con Express + SQLite (endpoints bajo `/api/`) |
| `scripts/` | Scripts para descargar datos y guardar en la BD |
| `docs/` | Requisitos, workflow, decisiones |
| `.cursor/rules/` | Reglas del proyecto (stack, convenciones) |
| `GUIA-WORKFLOW-PRODUCTOS-DIGITALES.md` | Guía general de workflow con Cursor |
| `index.html`, `styles.css` | Página del plan de 5 días (aprendizaje inicial) |

## Arranque rápido

1. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

2. **Descargar datos de ejemplo a la BD**
   ```bash
   node scripts/descargar-items.js
   ```

3. **Iniciar la API**
   ```bash
   cd backend
   npm start
   ```

4. Abrir en el navegador: http://localhost:3000/api/items

Más detalle en [docs/workflow.md](docs/workflow.md).

## Stack

- **Backend:** Node.js, Express
- **Base de datos:** SQLite (better-sqlite3)
- **Scripts:** Node.js (fetch, ETL)

Las reglas en `.cursor/rules/` definen convenciones y estructura para que la IA en Cursor mantenga coherencia al iterar.
