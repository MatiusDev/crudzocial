const layoutPath = '../../components/layout';

document.addEventListener('DOMContentLoaded', () => {
  import(`${layoutPath}/header/header.js`);
  import(`${layoutPath}/footer/footer.js`);
});

const fileInput = document.getElementById("file-input");
const galleryDisplay = document.getElementById("gallery-display");
const messageDisplay = document.getElementById("message");
const localStorageKey = "localGalleryImages";

let storedImageData = [];

document.addEventListener("DOMContentLoaded", loadImagesFromLocalStorage);

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

      storedImageData.push({
        id: imageId,
        data: imageDataURL,
        name: file.name
      });

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

  storedImageData = storedImageData.filter(image => image.id !== idToRemove);
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
  if (savedImagesJSON) {
    try {
      const loadedImages = JSON.parse(savedImagesJSON);
      galleryDisplay.innerHTML = "";
      loadedImages.forEach(image => {
        if (image.data && image.data.startsWith("data:image")) {
            appendImageToGallery(image.id, image.data, image.name || "Imagen");
            storedImageData.push(image);
        }
      });
    } catch (e) {
      console.error("Error al parsear imágenes de localStorage:", e);
      showMessage("Error al cargar imágenes guardadas. Datos corruptos.", "error");
      localStorage.removeItem(localStorageKey);
    }
  }
}

function showMessage(message, type) {
  messageDisplay.textContent = message;
  if (type === "error") {
    messageDisplay.style.color = "darkred";
  } else if (type === "info") {
    messageDisplay.style.color = "darkcyan";
  } else if (type === "success") {
    messageDisplay.style.color = "green";
  }
}

