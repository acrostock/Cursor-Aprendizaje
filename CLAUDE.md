# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational Node.js project for learning AI-assisted development of digital products. Backend REST API with Express + SQLite and ETL scripts for external data ingestion.

## Commands

```bash
# Install dependencies
cd backend && npm install

# Start API server (runs on port 3000, configurable via PORT env var)
cd backend && npm start

# Seed database with sample data from JSONPlaceholder API (run from project root)
node scripts/descargar-items.js
```

No test framework or linter is configured.

## Architecture

- **`backend/`** — Express API server
  - `server.js` — App entry point, mounts routes under `/api/`
  - `db.js` — SQLite connection (better-sqlite3), creates `items` table on startup, exports the `db` instance
  - `routes/items.js` — REST endpoints for items (`GET /api/items`, `GET /api/items/:id`)
  - `data.db` — SQLite database file (gitignored, auto-created)
- **`scripts/`** — ETL scripts that import `../backend/db` directly to write to the same database
- **`docs/`** — Requirements (`requisitos.md`), workflow (`workflow.md`), integration notes

Database schema has a single `items` table: `id`, `titulo`, `cuerpo`, `origen`, `creado_en`.

## Conventions

- Comments, documentation, variable names, and API responses are in **Spanish**
- REST endpoints live under `/api/` (e.g., `GET /api/health`)
- ETL scripts in `scripts/` use better-sqlite3 transactions for bulk inserts
- Cursor AI rules in `.cursor/rules/producto-digital.mdc` enforce stack and structure consistency
