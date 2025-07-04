const layoutPath = '../../components/layout';

import { getUser } from "../../utils/users.js";
import { showMessage } from '../../utils/global/global.js';
import { LogHandler } from "../../utils/logs.js";

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
  
  addLog(user.username, `Usuario ${user.username} ha ingresado a su galería`, "info");

  const fileInput = document.getElementById("file-input");
  const galleryDisplay = document.getElementById("gallery-display");
  const messageDisplay = document.getElementById("message");
  const localStorageKey = "gallery";

  let storedImageData = {};

  loadImagesFromLocalStorage();

  fileInput.addEventListener("change", handleFileSelection);


  function handleFileSelection(event) {
    const files = event.target.files;
    messageDisplay.textContent = "";

    for (const file of files) {
      if (!file.type.startsWith("image")) {
        showMessage(`El archivo "${file.name}" no es una imagen y no se agregará.`, "error");
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`; // ID único

        appendImageToGallery(imageId, imageDataURL, file.name);

        storedImageData[user.username].push({
          id: imageId,
          data: imageDataURL,
          name: file.name
        });

        addLog(user.username, `El usuario ${user.username} ha guardado una imagen en su galería`, "info");
        saveImagesToLocalStorage();
      };

      reader.onerror = () => {
        showMessage(`Error al leer el archivo "${file.name}".`, "error");
      };

      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }


  function appendImageToGallery(id, dataURL, name) {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-item");
    imageWrapper.dataset.imageId = id;

    const img = document.createElement("img");
    img.src = dataURL;
    img.alt = name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => removeImage(id));

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(deleteButton);
    galleryDisplay.appendChild(imageWrapper);
  }

  function removeImage(idToRemove) {
    const imageItem = galleryDisplay.querySelector(`[data-image-id="${idToRemove}"]`);
    if (imageItem) {
      galleryDisplay.removeChild(imageItem);
    }

    storedImageData[user.username] = storedImageData[user.username].filter(image => image.id !== idToRemove);
    addLog(user.username, `El usuario ${user.username} ha eliminado una imagen en su galería`, "info");
    saveImagesToLocalStorage();

    showMessage("Imagen eliminada.", "info");
  }

  function saveImagesToLocalStorage() {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(storedImageData));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
      showMessage("Advertencia: No se pudieron guardar todas las imágenes. El almacenamiento local está lleno.", "error");
    }
  }

  function loadImagesFromLocalStorage() {
    const savedImagesJSON = localStorage.getItem(localStorageKey);
    if (storedImageData[user.username] === undefined) {
      storedImageData[user.username] = [];
    }
    if (savedImagesJSON) {
      try {
        const userImages = JSON.parse(savedImagesJSON);
        const loadedImages = userImages[user.username] || [];
        galleryDisplay.innerHTML = "";
        loadedImages.forEach(image => {
          if (image.data && image.data.startsWith("data:image")) {
            appendImageToGallery(image.id, image.data, image.name || "Imagen");
            storedImageData[user.username].push(image);
          }
        });
      } catch (e) {
        console.error("Error al parsear imágenes de localStorage:", e);
        showMessage("Error al cargar imágenes guardadas. Datos corruptos.", "error");
        localStorage.removeItem(localStorageKey);
      }
    }
  }
});