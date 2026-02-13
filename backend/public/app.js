/**
 * App frontend — listar ítems y crear nuevos desde el navegador.
 */

const estado = document.getElementById('estado');
const lista = document.getElementById('lista-items');
const form = document.getElementById('form-item');
const mensajeForm = document.getElementById('mensaje-form');
const contadorTotal = document.getElementById('contador-total');

async function actualizarContador() {
  try {
    const res = await fetch('/api/items/count');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { total } = await res.json();
    contadorTotal.textContent = total;
  } catch {
    contadorTotal.textContent = '—';
  }
}

async function cargarItems() {
  try {
    const res = await fetch('/api/items');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();

    estado.textContent = `${items.length} ítem(s) cargados.`;
    estado.classList.remove('error');

    lista.innerHTML = items
      .map(
        (item) => `
      <li>
        <h3>${escaparHtml(item.titulo)}</h3>
        <p>${escaparHtml((item.cuerpo || '').slice(0, 120))}${(item.cuerpo || '').length > 120 ? '…' : ''}</p>
        <span class="origen">Origen: ${escaparHtml(item.origen || '—')} · ${item.creado_en || ''}</span>
      </li>
    `
      )
      .join('');
  } catch (err) {
    estado.textContent = `Error al cargar: ${err.message}. ¿Está el servidor en marcha?`;
    estado.classList.add('error');
    lista.innerHTML = '';
  }
}

function renderItem(item) {
  const cuerpo = item.cuerpo || '';
  return `
    <li>
      <h3>${escaparHtml(item.titulo)}</h3>
      <p>${escaparHtml(cuerpo.slice(0, 120))}${cuerpo.length > 120 ? '…' : ''}</p>
      <span class="origen">Origen: ${escaparHtml(item.origen || '—')} · ${item.creado_en || ''}</span>
    </li>
  `;
}

function mostrarMensaje(texto, esError = false) {
  mensajeForm.textContent = texto;
  mensajeForm.className = 'mensaje-form' + (esError ? ' error' : '');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = form.elements.titulo.value.trim();
  const cuerpo = (form.elements.cuerpo.value || '').trim();
  if (!titulo) {
    mostrarMensaje('El título es obligatorio.', true);
    return;
  }
  mostrarMensaje('Creando…');
  try {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, cuerpo, origen: 'app' }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      mostrarMensaje(data.error || `Error ${res.status}`, true);
      return;
    }
    mostrarMensaje('Ítem creado correctamente.');
    actualizarContador();
    lista.insertAdjacentHTML('afterbegin', renderItem(data));
    const total = lista.querySelectorAll('li').length;
    estado.textContent = `${total} ítem(s) cargados.`;
    form.reset();
  } catch (err) {
    mostrarMensaje(`Error de red: ${err.message}`, true);
  }
});

cargarItems();
actualizarContador();
