import authStyles from './auth.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

const authTemplate = document.createElement('template');
authTemplate.innerHTML = `
  <main class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black"></h3>
          <hr class="login-hr">
          <p class="subtitle has-text-black"></p>
          <div id="children"></div>
        </div>
      </div>
    </div>
  </main>
`;

class Auth extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [bulmaStyles, authStyles];
    this.shadowRoot.appendChild(authTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const childrenElement = this.shadowRoot.getElementById('children');
    const titleElement = this.shadowRoot.querySelector('h3');
    const subtitleElement = this.shadowRoot.querySelector('p');

    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');

    if (title) {
      titleElement.textContent = title;
    }

    if (subtitle) {
      subtitleElement.textContent = subtitle;
    }

    const children = this.children[0];
    if (children) {
      childrenElement.appendChild(children);
    }
  }
}

customElements.define('auth-component', Auth);