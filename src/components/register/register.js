import registerStyles from './register.css' with { type: 'css' };
import bulmaStyles from 'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css' with { type: 'css' };

import { getBasePath } from '../../utils/pathResolve.js';
import { loadUsers, saveUser, saveUserSession } from '../../utils/users.js';
import { showMessage } from '../../utils/global/global.js';

const registerTemplate = document.createElement('template');
registerTemplate.innerHTML = `
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
                    <input id="fullname" class="input is-large" type="text" placeholder="Nombre completo" autofocus="" name="fullname">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input id="email" class="input is-large" type="email" placeholder="Correo electrónico" autofocus="" name="email">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input id="password" class="input is-large" type="password" placeholder="Contraseña" name="password">
                </div>
            </div>
            <button id="btnRegister" type="button" class="button is-block is-info is-large is-fullwidth">
                Registrarse <i class="fa fa-sign-in" aria-hidden="true"></i>
            </button>
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
        const btnRegister = this.shadowRoot.getElementById("btnRegister");
        const usernameElement = this.shadowRoot.getElementById("username");
        const emailElement = this.shadowRoot.getElementById("email");
        const fullnameElement = this.shadowRoot.getElementById("fullname");
        const passwordElement = this.shadowRoot.getElementById("password");

        let users = loadUsers() || {};

        const validateUser = (username, email, fullname, password) => {
            if (!username || username === '') {
                showMessage("Debes ingresar un usuario.", "error");
                usernameElement.focus();
                return false;
            }
    
            if (username.length < 3) {
                showMessage("El usuario no puede ser menor de 3 caracteres", "error");
                usernameElement.focus();
                return false;
            }
    
            if (!email || email === '') {
                showMessage("Debes ingresar un correo electrónico.", "error");
                emailElement.focus();
                return false;
            }
    
            if (!email.includes('@') || !email.includes('.')) {
                showMessage("Debes ingresar un correo electrónico válido.", "error");
                emailElement.value = '';
                emailElement.focus();
                return false;
            }
    
            if (!fullname || fullname === '') {
                showMessage("Debes ingresar tu nombre completo.", "error");
                fullnameElement.value = '';
                fullnameElement.focus();
                return false;
            }
    
            if (!password || password === '') {
                showMessage("Debes ingresar una contraseña", "error");
                passwordElement.focus();
                return false;
            }
    
            if (password.length < 4) {
                showMessage("La contraseña no puede ser menor de 4 caracteres", "error");
                passwordElement.value = '';
                passwordElement.focus();
                return false;
            }
            return true;
        }

        const cleanData = () => {
            usernameElement.value = '';
            emailElement.value = '';
            fullnameElement.value = '';
            passwordElement.value = '';
            usernameElement.focus();
        }

        btnRegister.addEventListener('click', () => {
            const username = usernameElement.value;
            const email = emailElement.value;
            const fullname = fullnameElement.value;
            const password = passwordElement.value;

            if (!validateUser(username, email, fullname, password)) return;

            const user = { username, email, fullname, password };
            if (users[username] !== undefined) {
                showMessage('Este usuario ya está registrado.', 'error');
                cleanData();
                return;
            }
            users[username] = user;
            saveUser(users);
            saveUserSession(user);
            window.location.href = '../../pages/gallery/gallery.html';
        });
    }
}

customElements.define('register-component', Register);