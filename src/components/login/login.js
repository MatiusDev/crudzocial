import loginStyles from './login.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../utils/pathResolve.js';

const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
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
                <input class="input is-large" type="password" placeholder="Contraseña" name="password">
            </div>
            </div>
            <div class="field">
            <label class="checkbox">
                <input type="checkbox">
                Recuerdame
            </label>
            </div>
        <button class="button is-block is-info is-large is-fullwidth">Entrar <i class="fa fa-sign-in"
            aria-hidden="true"></i></button>
        </form>
    </div>
    <p class="has-text-grey options">
        <a href="${getBasePath()}/src/pages/register/register.html">Registrarse</a> &nbsp;·&nbsp;
        <a href="#">Olvidé mi contraseña</a> &nbsp;·&nbsp;
        <a href="#">¿Necesitas ayuda?</a>
    </p>

`;

class Login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [bulmaStyles, loginStyles];
        this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true))
    }

    connectedCallback() {

    }
}

customElements.define('login-component', Login);