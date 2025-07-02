import registerStyles from './register.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../utils/pathResolve.js';

const registerTemplate = document.createElement('template');
registerTemplate.innerHTML = `
    <div class="box">
        <figure class="avatar">
            <img src="${getBasePath()}/src/assets/images/logo.png">
        </figure>
        <form>
            <div class="field">
            <div class="control">
                <input class="input is-large" type="text" placeholder="Nombre de usuario" autofocus="" name="username">
            </div>
            </div>

            <div class="field">
            <div class="control">
                <input class="input is-large" type="email" placeholder="Correo electrónico" autofocus="" name="email">
            </div>
            </div>

            <div class="field">
            <div class="control">
                <input class="input is-large" type="password" placeholder="Contraseña" name="password">
            </div>
            </div>
            <button class="button is-block is-info is-large is-fullwidth">Registrarse <i class="fa fa-sign-in"
                aria-hidden="true"></i></button>
        </form>
    </div>
    <p class="has-text-grey options">
        <a href="${getBasePath()}/index.html">Iniciar sesión</a> &nbsp;·&nbsp;
        <a href="#">¿Necesitas ayuda?</a>
    </p>
`;

class Register extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [bulmaStyles, registerStyles];
        this.shadowRoot.appendChild(registerTemplate.content.cloneNode(true))
    }

    connectedCallback() {

    }
}

customElements.define('register-component', Register);