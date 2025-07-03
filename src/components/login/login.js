import loginStyles from './login.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../utils/pathResolve.js';
import { loadUsers, saveUserSession } from '../../utils/users.js';
import { showMessage } from '../../utils/global/global.js';

const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <div class="box">
        <figure class="avatar">
            <img src="${getBasePath()}/src/assets/images/logo.png">
        </figure>
        <form>
            <div class="field">
                <div class="control">
                    <input id="username" class="input is-large" type="text" placeholder="Nombre de usuario" autofocus="" name="username">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input id="password" class="input is-large" type="password" placeholder="Contraseña" name="password">
                </div>
            </div>
        <button id="btnLogin" class="button is-block is-info is-large is-fullwidth" type='button'>Entrar <i class="fa fa-sign-in"
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
        // Elements
        const btnLogin = this.shadowRoot.getElementById("btnLogin");
        const usernameElement = this.shadowRoot.getElementById("username");
        const passwordElement = this.shadowRoot.getElementById("password");

        const users = loadUsers() || {};

        const cleanData = () => {
            usernameElement.value = '';
            passwordElement.value = '';
            usernameElement.focus();
        }

        const validateUser = (username, password) => {
            if (!username || username === '') {
                showMessage("Debes ingresar un usuario.", "error");
                usernameElement.focus();
                return false;
            }
    
            if (!password || password === '') {
                showMessage("Debes ingresar una contraseña.", "error");
                passwordElement.focus();
                return false;
            }
            return true;
        }

        btnLogin.addEventListener('click', () => {
            const username = usernameElement.value;
            const password = passwordElement.value;

            if (!validateUser(username, password)) return;

            const user = users[username];

            if (user === undefined) {
                showMessage("El usuario no ha sido registrado", "error");
                cleanData();
                return;
            }
            
            if (user.password !== password) {
                showMessage('Contraseña incorrecta', "error");
                passwordElement.value = '';
                passwordElement.focus();
                return;
            }

            saveUserSession(user);
            window.location.href = `${getBasePath()}/src/pages/notes/notes.html`;
        });
    }
}

customElements.define('login-component', Login);