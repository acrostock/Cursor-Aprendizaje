# Usar la terminal de Claude Code

Claude Code tiene una **terminal integrada** donde puedes ejecutar los mismos comandos que en Cursor o en una consola de Windows.

## Abrir la terminal en Claude Code

- Busca la opción de **Terminal** o **Shell** en la interfaz (a veces en un panel inferior o en el menú).
- La terminal se abre con el directorio del proyecto ya seleccionado (la carpeta que abriste en Claude Code).

## Orden recomendado de comandos

Asegúrate de estar en la **raíz del proyecto** (donde están las carpetas `backend`, `scripts`, `docs`).

### 1. Instalar dependencias (solo la primera vez)

```bash
cd backend
npm install
cd ..
```

### 2. Cargar datos de ejemplo en la base de datos

```bash
node scripts/descargar-items.js
```

Deberías ver algo como: `Guardados 100 ítem(s) en la base de datos.`

### 3. Arrancar el servidor (API + app)

```bash
cd backend
npm start
```

Verás: `Servidor en http://localhost:3000`

### 4. Probar en el navegador

- **App (lista de ítems):** http://localhost:3000  
- **API en JSON:** http://localhost:3000/api/items  

### 5. Detener el servidor

En la terminal donde está corriendo `npm start`, pulsa **Ctrl+C**.

## Si algo falla

- **"npm no se reconoce"** → Instala Node.js desde https://nodejs.org y vuelve a abrir la terminal.
- **"Cannot find module"** → Ejecuta `cd backend` y luego `npm install`.
- **"EADDRINUSE"** → El puerto 3000 está ocupado; cierra otra app que lo use o cambia con `set PORT=3001` (Windows) antes de `npm start`.

## Resumen

| Qué quieres hacer      | Comando (desde la raíz del proyecto)     |
|------------------------|------------------------------------------|
| Instalar dependencias  | `cd backend` → `npm install`             |
| Llenar la BD de datos  | `node scripts/descargar-items.js`        |
| Iniciar API + app      | `cd backend` → `npm start`               |
| Parar el servidor      | En la terminal: **Ctrl+C**               |
