# Cursor-Aprendizaje — Productos digitales

Proyecto de aprendizaje de **Cursor** y **Claude Code** con un workflow completo para productos digitales: API REST, base de datos SQLite, scripts de descarga de datos y app web con formulario para crear ítems desde el navegador.

---

## Contenido del repositorio

| Carpeta / archivo | Descripción |
|-------------------|-------------|
| `backend/` | Servidor Express: API bajo `/api/`, app frontend en `public/`, BD SQLite (sql.js) |
| `backend/public/` | App web: lista de ítems + formulario para crear nuevos (HTML, CSS, JS) |
| `scripts/` | Scripts de ETL: descarga de datos (ej. JSONPlaceholder) y guardado en la BD |
| `docs/` | Requisitos, workflow, terminal Claude Code |
| `.cursor/rules/` | Reglas del proyecto (stack, convenciones) para la IA en Cursor |
| `GUIA-WORKFLOW-PRODUCTOS-DIGITALES.md` | Guía de workflow e iteración con Cursor |
| `CLAUDE.md` | Contexto para Claude Code (comandos, arquitectura, convenciones) |
| `index.html`, `styles.css` (raíz) | Página del plan de 5 días (aprendizaje inicial de Cursor) |
| `plan-5-dias-cursor.md` | Plan de 5 días para aprender Cursor |

---

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servidor |
| GET | `/api/items` | Lista de ítems (orden: más recientes primero) |
| GET | `/api/items/:id` | Un ítem por id |
| POST | `/api/items` | Crear ítem. Body: `{ "titulo": "obligatorio", "cuerpo": "opcional", "origen": "opcional" }` |

Base de datos: SQLite (sql.js), tabla `items` con `id`, `titulo`, `cuerpo`, `origen`, `creado_en`.

---

## Arranque rápido

1. **Instalar dependencias**
   ```bash
   cd backend
   npm install
   ```

2. **Cargar datos de ejemplo en la BD** (desde la raíz del proyecto)
   ```bash
   node scripts/descargar-items.js
   ```

3. **Iniciar el servidor**
   ```bash
   cd backend
   npm start
   ```
   O en desarrollo, con **reinicio automático** al guardar cambios:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - **App (lista + formulario):** http://localhost:3000  
   - **API (JSON):** http://localhost:3000/api/items  

Más detalle en [docs/workflow.md](docs/workflow.md). Uso de la terminal en Claude Code: [docs/terminal-claude-code.md](docs/terminal-claude-code.md).

---

## Stack

- **Backend:** Node.js, Express  
- **Base de datos:** SQLite vía [sql.js](https://github.com/sql-js/sql.js) (sin compilación nativa; compatible con Windows)  
- **Frontend:** HTML, CSS, JavaScript (vanilla); servido por Express desde `backend/public/`  
- **Desarrollo:** nodemon (`npm run dev`) para reinicio automático al cambiar código  

Las reglas en `.cursor/rules/` definen convenciones y estructura para que la IA en Cursor mantenga coherencia al iterar.
