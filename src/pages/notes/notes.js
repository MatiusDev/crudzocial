const layoutPath = '../../components/layout';

import { showMessage } from '../../utils/global/global.js';
import { LogHandler } from '../../utils/logs.js';
import { getUser } from '../../utils/users.js';

document.addEventListener('DOMContentLoaded', () => {
  import(`${layoutPath}/header/header.js`);
  import(`${layoutPath}/footer/footer.js`);

  const user = getUser();

  if (!user) {
    window.location.href = '../../../index.html';
    return;
  }

  const { addLog, error } = LogHandler();

  if (error) {
    showMessage(error, "error");
    return;
  }
  
  addLog(user.username, `Usuario ${user.username} ha ingresado a la pestaña de notas`, "info");

  // Array para almacenar las notas (título y contenido)
  const notesKey = 'notes';
  let userNotes = loadNotes();

  function loadNotes() {
    const storedNotes = localStorage.getItem(notesKey);
    let notes = {};
    if (storedNotes) {
      notes = JSON.parse(storedNotes);
    } else {
      notes[user.username] = [];
    }
    return notes;
  }

  // Elementos del DOM
  const noteTitle = document.getElementById('note-title');
  const noteInput = document.getElementById('note-input');
  const addNoteBtn = document.getElementById('add-note-btn');
  const notesList = document.getElementById('notes-list');

  // Renderizar todas las notas
  function renderNotes() {
    notesList.innerHTML = '';
    userNotes[user.username].forEach((note, idx) => {
      const card = document.createElement('div');
      card.className = 'sticky-note';
      card.draggable = true;

      // Botón eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        showDeleteModal(idx);
      };

      // Título
      const titleDiv = document.createElement('div');
      titleDiv.className = 'note-title';
      titleDiv.textContent = note.title;
      titleDiv.contentEditable = true;
      titleDiv.spellcheck = false;
      titleDiv.addEventListener('blur', () => {
        userNotes[user.username][idx].title = titleDiv.textContent.trim() || 'Sin título';
        saveNotes();
      });
      titleDiv.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          titleDiv.blur();
        }
      });

      // Contenido
      const contentArea = document.createElement('textarea');
      contentArea.className = 'note-content';
      contentArea.value = note.content;
      contentArea.setAttribute('readonly', true);

      // Edición rápida al hacer doble click en el contenido
      contentArea.addEventListener('dblclick', () => {
        contentArea.removeAttribute('readonly');
        contentArea.focus();
      });
      contentArea.addEventListener('blur', () => {
        contentArea.setAttribute('readonly', true);
        userNotes[user.username][idx].content = contentArea.value;
        saveNotes();
      });
      contentArea.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
          ev.preventDefault();
          contentArea.blur();
        }
      });

      // Auto-resize
      contentArea.addEventListener('input', autoResize);
      setTimeout(() => autoResize({target: contentArea}), 0);

      card.appendChild(deleteBtn);
      card.appendChild(titleDiv);
      card.appendChild(contentArea);

      // Drag & Drop
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', idx);
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });

      notesList.appendChild(card);
    });
    enableDnD();
  }

  // Drag & Drop para reordenar
  function enableDnD() {
    const draggables = notesList.querySelectorAll('.sticky-note');
    notesList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(notesList, e.clientY);
      const dragging = document.querySelector('.dragging');
      if (afterElement == null) {
        notesList.appendChild(dragging);
      } else {
        notesList.insertBefore(dragging, afterElement);
      }
    });
    notesList.addEventListener('drop', () => {
      // Actualiza el array de notas según el nuevo orden visual
      const newNotes = [];
      notesList.querySelectorAll('.sticky-note').forEach(card => {
        const title = card.querySelector('.note-title').textContent;
        const content = card.querySelector('.note-content').value;
        newNotes.push({ title, content });
      });
      userNotes[user.username] = newNotes;
      saveNotes();
      renderNotes();
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.sticky-note:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // Guardar notas en localStorage
  function saveNotes() {
    localStorage.setItem(notesKey, JSON.stringify(userNotes));
    addLog(user.username, `El usuario ${user.username} ha creado una nota.`, "info");
  }

  // Agregar nueva nota
  addNoteBtn.onclick = () => {
    const title = noteTitle.value.trim() || 'Sin título';
    const content = noteInput.value.trim();
    if (content) {
      userNotes[user.username].push({ title, content });
      saveNotes();
      renderNotes();
      noteTitle.value = '';
      noteInput.value = '';
    }
  };

  // Auto-resize para textarea
  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  // Modal de confirmación de eliminación
  let noteToDeleteIdx = null;
  const deleteModal = document.getElementById('delete-modal');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  function showDeleteModal(idx) {
    noteToDeleteIdx = idx;
    deleteModal.classList.add('is-active');
  }
  function hideDeleteModal() {
    noteToDeleteIdx = null;
    deleteModal.classList.remove('is-active');
  }

  if (confirmDeleteBtn && cancelDeleteBtn && closeModalBtn) {
    confirmDeleteBtn.onclick = () => {
      if (noteToDeleteIdx !== null) {
        userNotes[user.username].splice(noteToDeleteIdx, 1);
        addLog(user.username, `El usuario ${user.username} ha eliminado una nota.`, "info");
        saveNotes();
        renderNotes();
      }
      hideDeleteModal();
    };
    cancelDeleteBtn.onclick = hideDeleteModal;
    closeModalBtn.onclick = hideDeleteModal;
    deleteModal.querySelector('.modal-background').onclick = hideDeleteModal;
  }

  // Inicializar
  renderNotes();
});

