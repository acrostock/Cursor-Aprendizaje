# Guía: Workflow de productos digitales con Cursor

**Objetivo:** Armar flujos de trabajo e iteración para desarrollar productos digitales (apps, backend, BBDD, integraciones, descarga de información) usando todo el ecosistema de Cursor.

---

## 1. Tu ecosistema Cursor (herramientas que usarás)

| Herramienta | Atajo | Cuándo usarla |
|-------------|--------|----------------|
| **Chat** | Ctrl + L | Preguntas, cambios en 1–2 archivos, explicaciones, @archivo para contexto |
| **Composer** | Ctrl + I | Cambios en varios archivos, features nuevas, crear estructura (carpetas, archivos) |
| **@ en Chat** | Escribir @ | Mencionar archivos, carpetas o reglas: @index.html, @backend/, @.cursor/rules |
| **Reglas (.cursor/rules)** | Archivos en .cursor/ | Convenciones del proyecto, stack, cómo quieres que te responda la IA |
| **Terminal integrada** | Ctrl + Ñ | Ejecutar servidores, migraciones, scripts, npm, pip |

---

## 2. Áreas que quieres cubrir

- **Integración:** conectar servicios (APIs, webhooks, auth, pasarelas).
- **Desarrollo de app:** frontend (web, móvil o ambos) y lógica de usuario.
- **Backend:** API, lógica de negocio, autenticación, jobs.
- **Base de datos:** diseño, migraciones, consultas, integración con backend.
- **Descarga / uso de información:** scraping, APIs externas, ETL, reportes.
- **Workflow e iteración:** cómo organizar tareas, branches, y ciclos de feedback.

Todo esto se puede hacer dentro de Cursor usando Chat + Composer + reglas + terminal.

---

## 3. Workflow sugerido (iteración por fases)

### Fase 0 — Definir el producto (antes de código)
- En Chat: “Ayúdame a listar requisitos y user stories para [producto].”
- Crear un `docs/` o `requisitos.md` y pedir a la IA que lo mantenga (con @).
- **Regla útil:** en `.cursor/rules` indicar el tipo de producto (web app, API, dashboard, etc.).

### Fase 1 — Estructura del proyecto
- En Composer: “Crea la estructura de carpetas para un proyecto [frontend + backend + BBDD] con [tecnologías].”
- Ejemplo: `frontend/`, `backend/`, `scripts/`, `docs/`, `.cursor/rules`.
- Dejar escrito en un README o en reglas: stack (React, Node, Python, etc.) y convenciones.

### Fase 2 — Backend + BBDD
- **Modelado:** “Diseña el modelo de datos para [dominio] y propon migraciones o esquema SQL.”
- **Implementación:** Composer para crear endpoints, modelos, conexión a BBDD.
- **Descarga de información:** scripts en `scripts/` (Python/Node) para APIs o scraping; la IA puede generarlos y tú los ejecutas desde la terminal de Cursor.

### Fase 3 — App (frontend / fullstack)
- Composer: “Añade la pantalla de [X] que consuma el endpoint [Y].”
- Usar @ para enlazar con contrato del backend (ej. @backend/routes/users.js).
- Iterar: “Cambia el formulario para que envíe también el campo Z.”

### Fase 4 — Integraciones
- “Integra [servicio: Stripe, Auth0, Google Sheets, etc.] en el backend” → la IA propone código y variables de entorno.
- Documentar en `docs/integraciones.md` qué servicios usas y dónde está la lógica.

### Fase 5 — Iteración continua
- Pequeñas tareas en Chat (1–2 archivos).
- Features o refactors grandes en Composer (varios archivos).
- Siempre que definas algo importante (API, modelo de datos), ponerlo en reglas o en `docs/` y usar @ para que la IA sea consistente.

---

## 4. Cómo pedir ayuda en Cursor (ejemplos)

- **Backend:** “En @backend/ crea un endpoint GET /api/productos que lea de la tabla productos y devuelva JSON.”
- **BBDD:** “Añade una migración para la tabla pedidos con campos: id, usuario_id, total, fecha.”
- **Integración:** “En el backend, integra la API de [X] para obtener [Y] y guárdalo en la BBDD.”
- **Descarga de información:** “Crea un script en scripts/ que descargue datos de [URL/API] y los guarde en CSV/JSON o en la BBDD.”
- **App:** “En el frontend, añade una página que liste los productos usando el endpoint /api/productos.”
- **Workflow:** “Actualiza la documentación en docs/workflow.md con los pasos para desplegar y ejecutar tests.”

---

## 5. Reglas de proyecto (recomendación)

Crear en tu proyecto algo como `.cursor/rules/producto-digital.mdc` (o un solo archivo en `.cursor/rules/`) con:

- Stack (ej.: Frontend: React, Backend: Node/Express o Python/FastAPI, BBDD: PostgreSQL).
- Estructura de carpetas (frontend/, backend/, scripts/, docs/).
- Convenciones (idioma de comentarios, nombres de endpoints, uso de env para secrets).
- Que la IA sugiera migraciones, tests y documentación cuando toque.

Así, en cada chat o Composer la IA tendrá contexto y mantendrá coherencia.

---

## 6. Próximos pasos concretos

1. **Elegir un primer mini producto** (ej.: “API + una tabla + un script que descargue datos y los guarde”).
2. **Decidir stack** (lenguaje backend, BBDD, tipo de frontend si aplica).
3. **En Cursor:** abrir esta carpeta (o una nueva para ese producto) y pedir en Composer: “Crea la estructura del proyecto según GUIA-WORKFLOW-PRODUCTOS-DIGITALES.md para [tu stack].”
4. **Iterar** con Chat/Composer siguiendo las fases de esta guía.

Cuando tengas elegido el primer producto y el stack, podemos bajar esto a pasos exactos (qué archivos crear, qué pedir en el primer Composer, etc.) en tu carpeta de aprendizaje o en una carpeta nueva del proyecto real.
