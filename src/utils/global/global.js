import messageBoxStyle from './global.css' with { type: 'css' };

// Crear el contenedor principal para todos los mensajes
const createMessageBoxContainer = () => {
    let container = document.getElementById('global-message-box-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'global-message-box-container';
        container.classList.add('message-box-container');

        const styleElement = document.createElement('style');
        styleElement.textContent = messageBoxStyle;

        document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            messageBoxStyle
        ];
        document.body.insertBefore(container, document.body.firstChild)
    }
    return container;
};

// Función para mostrar un mensaje
export function showMessage(message, type = 'info', duration = 3000) {
    const container = createMessageBoxContainer();

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.classList.add('message-box-close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        messageBox.classList.add('hide');
        messageBox.addEventListener('transitionend', () => {
            messageBox.remove();
            if (container.children.length === 0) {
                 // Puedes remover el contenedor si lo deseas, o dejarlo vacío
            }
        }, { once: true });
    });

    messageBox.appendChild(closeButton);
    container.appendChild(messageBox);

    // Forzar un reflow para asegurar que la transición de entrada se active
    void messageBox.offsetWidth;

    // Mostrar el mensaje
    messageBox.classList.add('show');

    // Ocultar el mensaje después de una duración
    if (duration > 0) {
        setTimeout(() => {
            messageBox.classList.remove('show');
            messageBox.classList.add('hide');
            messageBox.addEventListener('transitionend', () => {
                messageBox.remove();
                 if (container.children.length === 0) {
                }
            }, { once: true });
        }, duration);
    }
}