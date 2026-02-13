/**
 * Utilidades compartidas entre páginas.
 */

function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}
