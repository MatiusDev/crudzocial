# 📝 Información General del Proyecto

- **Nombre del Proyecto:** Crudzocial-CtrlAltSupr 
- **Nombre del Equipo e Integrantes:**
  - Juan Carlos Balcero Torres
  - Mariana Restrepo Acevedo
  - Daniel Tapias.
  - Matius Monsalve
- **Descripción del Sistema y Objetivo:**
  Crudzocial es una plataforma web que integra funcionalidades **CRUD** (Crear, Leer, Actualizar, Eliminar) con características **sociales**. Permite a los usuarios gestionar notas, compartir contenido, y mantener perfiles personalizados, resolviendo la necesidad de una gestión sencilla y colaborativa de información en entornos educativos o de trabajo.

---

# 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Framework de estilos:** [Bulma CSS](https://bulma.io/)
- **Web Components:** Utilizados para crear componentes reutilizables y modulares, facilitando el mantenimiento y la escalabilidad del sistema. Más información en [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
- **Almacenamiento en frontend:** Uso de `localStorage` y `sessionStorage` para persistencia de datos y manejo de sesiones. También se simula una base de datos con arrays en JS.
- **Control de versiones:** Git y GitHub.
- **Backend:** (Opcional) Si se implementa, se puede usar [JSON Server](https://github.com/typicode/json-server) para simular una API REST.

---

# 🚀 Ejecución y Pruebas

## Requisitos Previos
- [Node.js](https://nodejs.org/) (opcional, para servidores locales)
- Navegador moderno (Chrome, Firefox, Edge, etc.)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de VS Code (recomendado para desarrollo)

## Instalación
```bash
git https://github.com/MatiusDev/crudzocial.git
cd crudzocial
```

## Ejecución
1. Abre el proyecto en VS Code.
2. Haz clic derecho en `index.html` y selecciona "Open with Live Server".
3. Accede a la aplicación desde tu navegador en `http://localhost:5500` (o el puerto que indique Live Server).

---

# 📄 Descripción de Funcionalidades

- **Login/Logout:** Flujo de autenticación de usuarios. Permite iniciar y cerrar sesión, diferenciando entre usuarios normales y administradores.
- **Galería:** Visualización de imágenes o publicaciones. Permite leer información y, según permisos, agregar o eliminar elementos.
- **Notas:** Gestión completa de notas (CRUD). Los usuarios pueden crear, leer, actualizar y eliminar sus notas.
- **Panel de Administración:** Acceso restringido a administradores para gestionar usuarios y contenido.
- **Perfil de Usuario:** Consulta y actualización de datos personales del usuario.

---

# ⚙️ Detalles Técnicos Clave

## Almacenamiento
- **localStorage:** Almacena datos persistentes como usuarios, notas y configuraciones.
- **sessionStorage:** Maneja información temporal de la sesión activa (usuario logueado, rol, etc.).
- **Ejemplo:**
  - Clave: `usuarios` → Valor: JSON con lista de usuarios.
  - Clave: `sessionUser` → Valor: usuario actualmente autenticado.

## Funciones y Modularidad
- El código está organizado en módulos ES6 (`import`/`export`), separando componentes, páginas y utilidades.
- Uso de Web Components para el header, footer y otros elementos reutilizables.
- Esta estructura facilita el mantenimiento y la escalabilidad del sistema.

## Manejo de Permisos
- Lógica para identificar el rol del usuario (admin o usuario normal) y restringir funcionalidades sensibles.
- Ejemplo: solo el admin puede acceder al panel de administración.

## Logs y Depuración
- Uso de `console.log()` para seguimiento de eventos y errores.
- Recomendación de utilizar las herramientas de desarrollador del navegador para inspección de DOM, estilos y consola.

---

# 🎓 Aprendizajes del Equipo

- Retos enfrentados y soluciones implementadas durante el desarrollo.
- Nuevos conceptos y herramientas aprendidas: Web Components, manejo de Gitflow, modularidad en JS, uso de Bulma.
- Habilidades de colaboración y trabajo en equipo fortalecidas.

---

# 📌 Estado Actual del Proyecto

- Estado: [Completo / En progreso / Pendiente de funcionalidades]
- Versión: [alfa / beta / estable]
- Errores conocidos: [Describir brevemente o dejar en blanco si no hay]

---

# 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Descripción clara del cambio"`.
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request explicando tus cambios.
6. Espera la revisión y feedback del equipo.

---

# 🗂️ Estructura del Proyecto

La siguiente imagen y diagrama muestran la organización de carpetas y archivos:

```mermaid
graph TD
    crudzocial --> Crudzocial.pdf
    crudzocial --> .git
    crudzocial --> readme.md
    crudzocial --> index.html
    crudzocial --> .gitignore
    crudzocial --> src
    src --> app.js
    src --> components
    src --> pages

    components --> layout
    layout --> footer
    layout --> header

    footer --> footer.css
    footer --> footer.js

    header --> header.css
    header --> header.js

    pages --> admin
    pages --> gallery
    pages --> login
    pages --> notes
    pages --> profile

    admin --> admin.css
    admin --> admin.html
    admin --> admin.js

    gallery --> gallery.css
    gallery --> gallery.html
    gallery --> gallery.js

    login --> login.css
    login --> login.html
    login --> login.js

    notes --> notes.css
    notes --> notes.html
    notes --> notes.js

    profile --> profile.css
    profile --> profile.html
    profile --> profile.js
```