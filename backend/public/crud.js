/**
 * Lógica CRUD — crear, editar, eliminar ítems.
 */

const formCrud = document.getElementById('form-crud');
const inputId = document.getElementById('input-id');
const inputTitulo = document.getElementById('crud-titulo');
const inputCuerpo = document.getElementById('crud-cuerpo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const mensajeCrud = document.getElementById('mensaje-crud');
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const estadoTabla = document.getElementById('estado-tabla');
const tituloForm = document.getElementById('titulo-form-crud');

// Modal
const modalEliminar = document.getElementById('modal-eliminar');
const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
const btnCancelarEliminar = document.getElementById('btn-cancelar-eliminar');
let idPendienteEliminar = null;

function mostrarMensaje(texto, esError = false) {
  mensajeCrud.textContent = texto;
  mensajeCrud.className = 'mensaje-form' + (esError ? ' error' : '');
}

async function cargarTabla() {
  try {
    const res = await fetch('/api/items');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();

    estadoTabla.textContent = `${items.length} ítem(s) en total.`;

    if (items.length === 0) {
      cuerpoTabla.innerHTML = '<tr><td colspan="5" class="celda-vacia">No hay ítems.</td></tr>';
      return;
    }

    cuerpoTabla.innerHTML = items
      .map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${escaparHtml(item.titulo)}</td>
        <td>${escaparHtml(item.origen || '—')}</td>
        <td>${item.creado_en || ''}</td>
        <td class="celda-acciones">
          <button class="btn-editar" data-accion="editar" data-id="${item.id}">Editar</button>
          <button class="btn-eliminar" data-accion="eliminar" data-id="${item.id}">Eliminar</button>
        </td>
      </tr>
    `
      )
      .join('');
  } catch (err) {
    estadoTabla.textContent = `Error al cargar: ${err.message}`;
    cuerpoTabla.innerHTML = '';
  }
}

// Event delegation en tbody
cuerpoTabla.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-accion]');
  if (!btn) return;

  const id = btn.dataset.id;
  if (btn.dataset.accion === 'editar') editarItem(id);
  if (btn.dataset.accion === 'eliminar') abrirModalEliminar(id);
});

// Crear o editar
formCrud.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = inputTitulo.value.trim();
  const cuerpo = inputCuerpo.value.trim();
  if (!titulo) {
    mostrarMensaje('El título es obligatorio.', true);
    return;
  }

  const editando = !!inputId.value;
  const url = editando ? `/api/items/${inputId.value}` : '/api/items';
  const method = editando ? 'PUT' : 'POST';

  mostrarMensaje(editando ? 'Guardando…' : 'Creando…');

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, cuerpo, origen: 'app' }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      mostrarMensaje(data.error || `Error ${res.status}`, true);
      return;
    }
    mostrarMensaje(editando ? 'Ítem actualizado.' : 'Ítem creado.');
    resetearFormulario();
    cargarTabla();
  } catch (err) {
    mostrarMensaje(`Error de red: ${err.message}`, true);
  }
});

async function editarItem(id) {
  try {
    const res = await fetch(`/api/items/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const item = await res.json();

    inputId.value = item.id;
    inputTitulo.value = item.titulo;
    inputCuerpo.value = item.cuerpo || '';
    tituloForm.textContent = 'Editar ítem';
    btnGuardar.textContent = 'Guardar cambios';
    btnCancelar.hidden = false;
    inputTitulo.focus();
  } catch (err) {
    mostrarMensaje(`Error al cargar ítem: ${err.message}`, true);
  }
}

function resetearFormulario() {
  formCrud.reset();
  inputId.value = '';
  tituloForm.textContent = 'Crear ítem';
  btnGuardar.textContent = 'Crear ítem';
  btnCancelar.hidden = true;
}

btnCancelar.addEventListener('click', () => {
  resetearFormulario();
  mostrarMensaje('');
});

// Modal eliminar
function abrirModalEliminar(id) {
  idPendienteEliminar = id;
  modalEliminar.hidden = false;
}

btnCancelarEliminar.addEventListener('click', () => {
  modalEliminar.hidden = true;
  idPendienteEliminar = null;
});

btnConfirmarEliminar.addEventListener('click', async () => {
  if (!idPendienteEliminar) return;
  const id = idPendienteEliminar;
  modalEliminar.hidden = true;
  idPendienteEliminar = null;

  try {
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      mostrarMensaje(data.error || `Error ${res.status}`, true);
      return;
    }
    mostrarMensaje('Ítem eliminado.');
    if (inputId.value === String(id)) resetearFormulario();
    cargarTabla();
  } catch (err) {
    mostrarMensaje(`Error de red: ${err.message}`, true);
  }
});

cargarTabla();
