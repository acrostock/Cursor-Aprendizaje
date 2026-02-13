# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational Node.js project for learning AI-assisted development of digital products. Backend REST API with Express + SQLite, ETL scripts for external data ingestion, and a simple frontend app that consumes the API.

## Using the Claude Code terminal

Run these commands **in the Claude Code integrated terminal** (or any terminal with the project folder as current directory).

**From project root (`Cursor-Aprendizaje`):**

```bash
# 1. Install backend dependencies (only needed once)
cd backend
npm install
cd ..
```

```bash
# 2. Seed the database with sample data (run whenever you want fresh data)
node scripts/descargar-items.js
```

```bash
# 3. Start the server (API + frontend app)
cd backend
npm start
```

Then open in your browser: **http://localhost:3000** for the app, or **http://localhost:3000/api/items** for raw JSON.

To stop the server: `Ctrl+C` in the terminal.

## Commands summary

| Goal | Command (from project root) |
|------|------------------------------|
| Install dependencies | `cd backend && npm install` |
| Seed database | `node scripts/descargar-items.js` |
| Start server (API + app) | `cd backend && npm start` |

No test framework or linter is configured.

## Architecture

- **`backend/`** — Express API server + static frontend
  - `server.js` — App entry point, serves `public/` and mounts API routes under `/api/`
  - `public/` — Frontend app: `index.html`, `styles.css`, `app.js` (fetches `/api/items` and renders list)
  - `db.js` — SQLite via sql.js (initDb async, save() to persist to data.db), no native compilation
  - `routes/items.js` — REST endpoints for items (`GET /api/items`, `GET /api/items/:id`)
  - `data.db` — SQLite database file (gitignored, auto-created)
- **`scripts/`** — ETL scripts call initDb() from `../backend/db`, insert data, then save() to persist
- **`docs/`** — Requirements (`requisitos.md`), workflow (`workflow.md`), integration notes

Database schema has a single `items` table: `id`, `titulo`, `cuerpo`, `origen`, `creado_en`.

## Conventions

- Comments, documentation, variable names, and API responses are in **Spanish**
- REST endpoints live under `/api/` (e.g., `GET /api/health`)
- ETL scripts in `scripts/` use better-sqlite3 transactions for bulk inserts
- Cursor AI rules in `.cursor/rules/producto-digital.mdc` enforce stack and structure consistency
