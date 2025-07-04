import headerStyles from './header.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../../utils/pathResolve.js';
import { logout, getUser } from '../../../utils/users.js';
import { LogHandler } from '../../../utils/logs.js';

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <header>
    <nav class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="${getBasePath()}/src/pages/gallery/gallery.html">Galería</a>
          <a class="navbar-item" href="${getBasePath()}/src/pages/notes/notes.html">Notas</a>
        </div>
        <div class="navbar-end">
            <p id="user-name"></p>
            <a class="navbar-item" href="${getBasePath()}/src/pages/profile/profile.html">Perfil</a>
            <div class="navbar-item">
              <button id="logout-button" class="button is-danger">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    // Añadir el shadow DOM al elemento, esto es para que el header se comporte como un componente independiente
    this.attachShadow({ mode: 'open' });
    // Añadir los estilos de Bulma y el headerStyles
    this.shadowRoot.adoptedStyleSheets = [bulmaStyles, headerStyles];
    // Clonar el contenido del template y añadirlo al shadow DOM
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const logoutButton = this.shadowRoot.getElementById('logout-button');
    const userName = this.shadowRoot.getElementById('user-name');

    const user = getUser();
    const { addLog, error } = LogHandler();

    if (error) {
        showMessage(error, 'error');
        return;
    }

    if (user) {
      userName.textContent = user.name;
    }

    logoutButton.addEventListener('click', () => {
      logout();
      addLog(user.username, `El usuario ${user.username} ha cerrado sesión`, 'info');
      window.location.href = `${getBasePath()}/index.html`;
    });
  }
}

// Definir el elemento personalizado con la etiqueta 'main-header'
customElements.define('main-header', Header);