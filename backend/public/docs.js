/**
 * Documentación de Producto — renderiza secciones informativas y datos dinámicos.
 */
(function () {
  const contenedor = document.getElementById('contenido-docs');

  // --- 1. Resumen del proyecto ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Resumen del proyecto</h2>
      <p>Proyecto educativo de Node.js para aprender desarrollo de productos digitales asistido por IA.
         Incluye un backend REST API con Express + SQLite, scripts ETL para ingesta de datos externos,
         y un frontend vanilla que consume la API.</p>
      <p><strong>Propósito:</strong> Practicar el flujo completo de creación de un producto digital
         (backend, frontend, base de datos, ETL, documentación) usando herramientas de IA como
         Cursor y Claude Code.</p>
    </section>
  `;

  // --- 2. Estado del sistema (dinámico) ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Estado del sistema</h2>
      <div class="docs-grid">
        <div class="docs-card docs-estado" id="estado-servidor">
          <span class="estado-dot cargando"></span>
          <div>
            <strong>Servidor</strong>
            <p>Verificando...</p>
          </div>
        </div>
        <div class="docs-card docs-estado" id="estado-items">
          <span class="estado-dot cargando"></span>
          <div>
            <strong>Base de datos</strong>
            <p>Verificando...</p>
          </div>
        </div>
      </div>
    </section>
  `;

  cargarEstado();

  // --- 3. Tecnologías ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Tecnologías</h2>
      <div class="docs-grid">
        <div class="docs-card">
          <strong>Node.js</strong>
          <p>Entorno de ejecución JavaScript del lado del servidor.</p>
        </div>
        <div class="docs-card">
          <strong>Express 4.21</strong>
          <p>Framework web minimalista para crear la API REST y servir archivos estáticos.</p>
        </div>
        <div class="docs-card">
          <strong>sql.js 1.11</strong>
          <p>SQLite compilado a WebAssembly. Sin dependencias nativas, persistencia manual a archivo.</p>
        </div>
        <div class="docs-card">
          <strong>nodemon 3.1</strong>
          <p>Reinicio automático del servidor en desarrollo al detectar cambios en archivos.</p>
        </div>
        <div class="docs-card">
          <strong>HTML / CSS / JS vanilla</strong>
          <p>Frontend sin frameworks. Fetch API para comunicarse con el backend.</p>
        </div>
      </div>
    </section>
  `;

  // --- 4. Arquitectura ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Arquitectura</h2>
      <div class="docs-diagrama">
<pre>
  Navegador (Frontend)
        |
        | HTTP (puerto 3000)
        v
  +-----------------+
  |    Express.js   |
  |  express.static |----> public/ (HTML, CSS, JS)
  |                 |
  |   /api/health   |----> Health check
  |   /api/items/*  |----> items router
  +-----------------+
        |
        v
  +-----------------+
  |     sql.js      |
  |   (SQLite en    |
  |    memoria)     |
  +-----------------+
        |
        | save()
        v
  +-----------------+
  |    data.db      |
  |  (archivo en    |
  |    disco)       |
  +-----------------+

  Scripts ETL (scripts/)
        |
        | initDb() + save()
        v
      data.db
</pre>
      </div>
    </section>
  `;

  // --- 5. Estructura de archivos ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Estructura de archivos</h2>
      <div class="docs-arbol">
<pre>
Cursor-Aprendizaje/
+-- backend/
|   +-- server.js          # Punto de entrada, monta rutas y sirve public/
|   +-- db.js              # Conexion SQLite via sql.js (initDb, save)
|   +-- routes/
|   |   +-- items.js       # Endpoints REST para items
|   +-- public/
|   |   +-- index.html     # Pagina principal (Home)
|   |   +-- crud.html      # Gestion de registros (CRUD)
|   |   +-- docs.html      # Documentacion de producto
|   |   +-- app.js         # Logica de Home
|   |   +-- crud.js        # Logica de CRUD
|   |   +-- docs.js        # Logica de documentacion
|   |   +-- common.js      # Utilidades compartidas
|   |   +-- sidebar.js     # Navegacion lateral (IIFE)
|   |   +-- styles.css     # Estilos globales
|   +-- data.db            # BD SQLite (gitignored)
+-- scripts/
|   +-- descargar-items.js # ETL: descarga datos de JSONPlaceholder
+-- docs/
|   +-- requisitos.md      # Requisitos del producto
|   +-- workflow.md        # Flujo de trabajo
+-- CLAUDE.md              # Instrucciones para Claude Code
+-- .gitignore
</pre>
      </div>
    </section>
  `;

  // --- 6. API REST ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>API REST</h2>
      <p>Todos los endpoints se encuentran bajo el prefijo <code>/api</code>. Puerto por defecto: <strong>3000</strong>.</p>
      <div class="docs-tabla-wrapper">
        <table class="docs-tabla">
          <thead>
            <tr>
              <th>Metodo</th>
              <th>Ruta</th>
              <th>Descripcion</th>
              <th>Codigos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="metodo get">GET</span></td>
              <td><code>/api/health</code></td>
              <td>Health check del servidor</td>
              <td>200</td>
            </tr>
            <tr>
              <td><span class="metodo get">GET</span></td>
              <td><code>/api/items</code></td>
              <td>Listar todos los items (ORDER BY creado_en DESC)</td>
              <td>200, 500</td>
            </tr>
            <tr>
              <td><span class="metodo get">GET</span></td>
              <td><code>/api/items/count</code></td>
              <td>Total de items en la BD</td>
              <td>200, 500</td>
            </tr>
            <tr>
              <td><span class="metodo get">GET</span></td>
              <td><code>/api/items/:id</code></td>
              <td>Obtener un item por ID</td>
              <td>200, 404, 500</td>
            </tr>
            <tr>
              <td><span class="metodo post">POST</span></td>
              <td><code>/api/items</code></td>
              <td>Crear nuevo item (titulo obligatorio)</td>
              <td>201, 400, 500</td>
            </tr>
            <tr>
              <td><span class="metodo put">PUT</span></td>
              <td><code>/api/items/:id</code></td>
              <td>Actualizar titulo y cuerpo de un item</td>
              <td>200, 400, 404, 500</td>
            </tr>
            <tr>
              <td><span class="metodo delete">DELETE</span></td>
              <td><code>/api/items/:id</code></td>
              <td>Eliminar un item</td>
              <td>200, 404, 500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  // --- 7. Base de datos ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Base de datos</h2>
      <p>SQLite gestionado por <strong>sql.js</strong> (WebAssembly). La BD vive en memoria y se persiste
         manualmente a <code>backend/data.db</code> llamando a <code>save()</code>.</p>
      <h3>Tabla: items</h3>
      <div class="docs-tabla-wrapper">
        <table class="docs-tabla">
          <thead>
            <tr>
              <th>Columna</th>
              <th>Tipo</th>
              <th>Constraints</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td>INTEGER</td>
              <td>PRIMARY KEY AUTOINCREMENT</td>
              <td>Identificador unico</td>
            </tr>
            <tr>
              <td><code>titulo</code></td>
              <td>TEXT</td>
              <td>NOT NULL</td>
              <td>Titulo del item</td>
            </tr>
            <tr>
              <td><code>cuerpo</code></td>
              <td>TEXT</td>
              <td>DEFAULT ''</td>
              <td>Contenido o descripcion</td>
            </tr>
            <tr>
              <td><code>origen</code></td>
              <td>TEXT</td>
              <td>DEFAULT 'app'</td>
              <td>Fuente: 'app' o 'jsonplaceholder'</td>
            </tr>
            <tr>
              <td><code>creado_en</code></td>
              <td>DATETIME</td>
              <td>DEFAULT CURRENT_TIMESTAMP</td>
              <td>Fecha de creacion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  // --- 8. Frontend ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Frontend</h2>
      <h3>Paginas</h3>
      <div class="docs-tabla-wrapper">
        <table class="docs-tabla">
          <thead>
            <tr>
              <th>Archivo</th>
              <th>Ruta</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>index.html</code></td>
              <td>/</td>
              <td>Home: contador de items, formulario rapido, listado</td>
            </tr>
            <tr>
              <td><code>crud.html</code></td>
              <td>/crud.html</td>
              <td>Gestion completa: crear, editar, eliminar items en tabla</td>
            </tr>
            <tr>
              <td><code>docs.html</code></td>
              <td>/docs.html</td>
              <td>Documentacion del producto (esta pagina)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Scripts compartidos</h3>
      <ul>
        <li><strong>common.js</strong> — Utilidades (escaparHtml). Cargado en todas las paginas.</li>
        <li><strong>sidebar.js</strong> — IIFE que inyecta la barra de navegacion lateral al inicio del body.
            Define un array de paginas y genera los links dinamicamente, marcando la pagina activa.</li>
      </ul>
      <h3>Patron sidebar (IIFE)</h3>
      <p>El sidebar se implementa como una funcion autoejecutable (IIFE) que mueve todo el contenido del body
         dentro de un <code>&lt;div class="contenido-principal"&gt;</code> y antepone el <code>&lt;nav class="sidebar"&gt;</code>.
         Esto permite agregar navegacion sin modificar el HTML de cada pagina.</p>
    </section>
  `;

  // --- 9. Scripts ETL ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Scripts ETL</h2>
      <h3>descargar-items.js</h3>
      <p>Script de ingesta que descarga posts de <strong>JSONPlaceholder</strong> (API publica de pruebas)
         y los inserta en la tabla <code>items</code> con origen <code>'jsonplaceholder'</code>.</p>
      <ul>
        <li>Ubicacion: <code>scripts/descargar-items.js</code></li>
        <li>Ejecucion: <code>node scripts/descargar-items.js</code></li>
        <li>Fuente: <code>https://jsonplaceholder.typicode.com/posts</code></li>
        <li>Llama a <code>initDb()</code> del modulo <code>../backend/db</code></li>
        <li>Inserta datos y llama a <code>save()</code> para persistir a disco</li>
      </ul>
    </section>
  `;

  // --- 10. Convenciones ---
  contenedor.innerHTML += `
    <section class="docs-seccion">
      <h2>Convenciones</h2>
      <ul>
        <li><strong>Idioma espanol:</strong> Comentarios, documentacion, nombres de variables y respuestas de la API estan en espanol.</li>
        <li><strong>Endpoints bajo /api/:</strong> Todas las rutas REST usan el prefijo <code>/api/</code> (ej: <code>/api/health</code>, <code>/api/items</code>).</li>
        <li><strong>Persistencia manual:</strong> sql.js mantiene la BD en memoria; se debe llamar a <code>save()</code> despues de cada escritura para persistir a <code>data.db</code>.</li>
        <li><strong>IIFE para scripts de pagina:</strong> Los scripts como <code>sidebar.js</code> usan funciones autoejecutables para evitar contaminar el scope global.</li>
        <li><strong>Sin frameworks frontend:</strong> HTML, CSS y JavaScript vanilla. Las peticiones al API usan <code>fetch()</code>.</li>
        <li><strong>ETL independientes:</strong> Los scripts en <code>scripts/</code> se ejecutan desde la linea de comandos, fuera del servidor.</li>
      </ul>
    </section>
  `;

  // --- Funciones auxiliares ---

  async function cargarEstado() {
    const elServidor = document.getElementById('estado-servidor');
    const elItems = document.getElementById('estado-items');

    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Status ' + res.status);
      const data = await res.json();
      elServidor.innerHTML = `
        <span class="estado-dot activo"></span>
        <div>
          <strong>Servidor</strong>
          <p>Activo — ${escaparHtml(data.mensaje)}</p>
        </div>
      `;
    } catch {
      elServidor.innerHTML = `
        <span class="estado-dot error"></span>
        <div>
          <strong>Servidor</strong>
          <p>No disponible</p>
        </div>
      `;
    }

    try {
      const res = await fetch('/api/items/count');
      if (!res.ok) throw new Error('Status ' + res.status);
      const data = await res.json();
      elItems.innerHTML = `
        <span class="estado-dot activo"></span>
        <div>
          <strong>Base de datos</strong>
          <p>${data.total} items registrados</p>
        </div>
      `;
    } catch {
      elItems.innerHTML = `
        <span class="estado-dot error"></span>
        <div>
          <strong>Base de datos</strong>
          <p>Sin conexion</p>
        </div>
      `;
    }
  }
})();
