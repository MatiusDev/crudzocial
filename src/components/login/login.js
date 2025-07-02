import loginStyles from './login.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../utils/pathResolve.js';
import { loadUsers, saveUser } from '../../utils/users.js';

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
            <div class="field">
            <label class="checkbox">
                <input type="checkbox">
                Recuerdame
            </label>
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

    validateUser(username, password) {
        console.log(username, password);
        if (!username || username === '' 
            || !password || password === '') {
                return false;
        }

        if (username.length < 3) {
            console.log('El usuario no puede ser menor de 3 caracteres');
            return false;
        }

        if (password.length < 4) {
            console.log('La contraseña no puede ser menor de 4 caracteres');
            return false;
        }
        return true;
    }

    connectedCallback() {
        // Elements
        const btnLogin = this.shadowRoot.getElementById("btnLogin");

        let users = loadUsers() || {};

        btnLogin.addEventListener('click', () => {
            const usernameElement = this.shadowRoot.getElementById("username");
            const passwordElement = this.shadowRoot.getElementById("password");

            const username = usernameElement.value;
            const password = passwordElement.value;

            if (!this.validateUser(username, password)) {
                usernameElement.value = '';
                passwordElement.value = '';
                usernameElement.focus();
                return;
            }

            console.log(users[username]);

            if (users[username] === undefined) {
                console.log('Este usuario no está registrado.');
                return;
            }
            
            if (users[username].password !== password) {
                console.log('Contraseña incorrecta');
                return;
            }
            window.location.href = `${getBasePath()}/src/pages/notes/notes.html`;
        });
    }
}

customElements.define('login-component', Login);