# Plan 5 días: Aprender Cursor (PM no técnico)

Objetivo: usar Cursor con soltura y estar listo para instalar e integrar Claude Code.

---

## Día 1 — Chat + tu primer archivo
**Tiempo:** ~15 min

1. Abre Cursor y abre esta carpeta como proyecto: `File → Open Folder → Documents\Cursor-Aprendizaje`
2. Abre el Chat de IA: **Ctrl + L** (o Cmd + L en Mac)
3. Escribe exactamente esto en el chat:
   ```
   Crea un archivo index.html con un título "Mi primer día en Cursor" y un párrafo de bienvenida.
   ```
4. Cuando la IA te muestre el código, **acepta** los cambios (✓)
5. En el explorador de archivos de Cursor (izquierda), haz doble clic en `index.html` y ábrelo en el navegador (clic derecho → "Open with Live Server" si lo tienes, o arrastra el archivo a Chrome/Edge)

**Logro del día:** Ver que “pediste algo en lenguaje natural” y obtuviste un archivo real que se ve en el navegador.

---

## Día 2 — Usar @ para dar contexto
**Tiempo:** ~15 min

1. Con la misma carpeta abierta, abre el Chat (**Ctrl + L**)
2. Escribe (puedes usar @ para mencionar el archivo):
   ```
   En @index.html añade una sección con tres ítems de lista: "Chat con IA", "Composer", "Archivos con @"
   ```
3. Acepta los cambios y recarga la página en el navegador

**Logro del día:** Entender que **@archivo** le dice a la IA “trabaja sobre este archivo”.

---

## Día 3 — Composer (cambios en varios archivos)
**Tiempo:** ~20 min

1. Abre **Composer**: **Ctrl + I** (o Cmd + I en Mac)
2. Pide algo que implique más de un archivo, por ejemplo:
   ```
   Crea un archivo styles.css con estilos para el título y el párrafo de index.html, y enlaza ese CSS en index.html.
   ```
3. Revisa los cambios en ambos archivos y acepta

**Logro del día:** Ver que con Composer la IA puede crear y modificar **varios archivos** a la vez.

---

## Día 4 — Pedir un cambio, rechazar parte, pedir corrección
**Tiempo:** ~15 min

1. En el Chat, pide algo que luego quieras “deshacer” en parte, por ejemplo:
   ```
   En index.html añade un pie de página con el texto "Plan 5 días - Cursor"
   ```
2. Si te muestra más de un bloque de cambios, **rechaza** uno (✗) y **acepta** otro — así ves que tú controlas qué se aplica
3. Luego pide:
   ```
   Cambia el texto del pie de página a "Cursor - Plan 5 días"
   ```

**Logro del día:** Sentir que **tú mandas**: aceptar, rechazar y pedir correcciones.

---

## Día 5 — Mini proyecto libre + preparación Claude Code
**Tiempo:** ~25 min

1. **Mini proyecto:** En Chat o Composer, pide algo que te interese, por ejemplo:
   - "Añade una sección 'Próximos pasos' con: Instalar Claude Code, Integrar con Cursor, Practicar con un proyecto real"
   - O: "Crea una página contacto.html con un formulario simple (nombre, email, mensaje)"
2. Revisa el resultado y ajusta con el chat si algo no te gusta
3. **Preparación Claude Code:** Anota en un bloc de notas:
   - Qué te gustaría hacer con Claude Code (ej: “explicaciones más largas”, “revisar requisitos”)
   - Dónde tienes este proyecto (ruta de la carpeta) para usarla también cuando instales Claude Code

**Logro del día:** Un pequeño “proyecto” terminado por ti + lista clara para el siguiente paso (Claude Code).

---

## Resumen de atajos

| Acción           | Atajo (Windows) |
|------------------|------------------|
| Abrir Chat       | **Ctrl + L**     |
| Abrir Composer   | **Ctrl + I**     |
| Mencionar archivo| Escribir **@** y el nombre del archivo |

---

## Después del día 5

- Instalar Claude Code desde la web oficial.
- Abrir la misma carpeta `Cursor-Aprendizaje` (o tu proyecto real) en Claude Code.
- Usar Cursor para editar con IA y Claude Code para conversaciones o análisis más largos; ambos pueden trabajar sobre los mismos archivos.

Si quieres, en el chat de Cursor puedes decir: "Avancemos al Día X" y seguimos desde ahí.
