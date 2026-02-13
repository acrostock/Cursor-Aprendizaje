# Workflow de desarrollo — Productos digitales

## Cómo trabajar en este proyecto

### 1. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 2. Descargar datos a la BD (primera vez o cuando quieras refrescar)
Desde la **raíz del proyecto**:
```bash
node scripts/descargar-items.js
```

### 3. Arrancar la API y la app
```bash
cd backend
npm start
```
O en desarrollo, con **reinicio automático** al guardar cambios:
```bash
cd backend
npm run dev
```
- **App (frontend):** http://localhost:3000  
- **API:** http://localhost:3000/api/health y http://localhost:3000/api/items  

### 4. Usar la terminal de Claude Code
Si trabajas en Claude Code, usa su terminal integrada con los mismos comandos. Guía detallada: [terminal-claude-code.md](terminal-claude-code.md).

### 5. Iterar con Cursor
- **Chat (Ctrl + L):** cambios en 1–2 archivos, preguntas, usar @backend o @scripts
- **Composer (Ctrl + I):** nuevas rutas, nuevas tablas, nuevos scripts, varios archivos a la vez
- Las reglas en `.cursor/rules/` dan contexto de stack y estructura

## Despliegue (futuro)
- Documentar aquí los pasos para subir a un servidor (ej. Node en VPS, Railway, Render).
- Usar variables de entorno para `PORT` y rutas de BD si cambian.
