import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };
import footerStyles from './footer.css' with { type: 'css' };

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Crudzocial</strong> hecho por <a href="#">Cntrl+Alt+Supr</a>. 
      </p>
      <p>
        Todos los derechos reservados. &copy; ${new Date().getFullYear()}
      </p>
    </div>
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [bulmaStyles, footerStyles];
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }
}

customElements.define('main-footer', Footer);