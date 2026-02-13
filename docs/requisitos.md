# Requisitos — Mini producto (API + BD + descarga)

## Objetivo
Primer producto del workflow: una API que lee de una base de datos SQLite y un script que descarga datos de una API externa y los guarda en esa misma BD.

## Funcionalidades
- [x] Backend con Express que expone endpoints bajo `/api/`
- [x] Base de datos SQLite con tabla `items` (id, titulo, cuerpo, origen, creado_en)
- [x] GET /api/items — listar todos los ítems
- [x] GET /api/items/:id — obtener un ítem por id
- [x] Script que descarga posts de JSONPlaceholder y los inserta en `items`

## Stack
- Node.js, Express, better-sqlite3
- Scripts en Node (fetch a API pública)

## Próximas iteraciones (opcional)
- Añadir frontend que consuma GET /api/items
- Filtros o paginación en la API
- Más scripts de descarga (otra API, CSV, etc.)
