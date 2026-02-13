/**
 * Sidebar de navegación — se autoinyecta al inicio del body.
 */
(function () {
  const paginas = [
    { titulo: 'Home', href: '/' },
    { titulo: 'Gestión de registros', href: '/crud.html' },
    { titulo: 'Documentación', href: '/docs.html' },
  ];

  const rutaActual = window.location.pathname;

  const links = paginas
    .map((p) => {
      const activa = rutaActual === p.href || (p.href === '/' && rutaActual === '/index.html');
      return `<a href="${p.href}" class="sidebar-link${activa ? ' activa' : ''}">${p.titulo}</a>`;
    })
    .join('');

  const nav = document.createElement('nav');
  nav.className = 'sidebar';
  nav.innerHTML = `<div class="sidebar-titulo">Navegación</div>${links}`;

  const contenido = document.createElement('div');
  contenido.className = 'contenido-principal';

  while (document.body.firstChild) {
    contenido.appendChild(document.body.firstChild);
  }

  document.body.appendChild(nav);
  document.body.appendChild(contenido);
})();
