
var API_KEY = 'AIzaSyB8jACrHjLcDxbzELNkfxQ1r7ZxTk9oDZM';
var FOLDER_ID = '1mJCHjQjkuSRNIv-PdobFxHIzWclcEJUN';

// Obtener elementos de la carpeta
function getFolderItems() {
  var url = 'https://www.googleapis.com/drive/v3/files?q=%27' + FOLDER_ID + '%27+in+parents&key=' + API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var items = data.files;

      // Obtener referencias a los selectores de marca y modelo
      var marcaSelect = document.getElementById('marca');
      var modeloSelect = document.getElementById('modelo');

      // Limpiar selectores
      marcaSelect.innerHTML = '';
      modeloSelect.innerHTML = '';

      // Agregar elementos al selector de marca
      for (var i = 0; i < items.length; i++) {
        var option = document.createElement('option');
        option.value = items[i].id;
        option.text = items[i].name;
        marcaSelect.appendChild(option);
      }

      // Actualizar los elementos del selector de modelo
      updateModelos();

      // Mostrar la imagen seleccionada
      showSelectedImage();
    })
    .catch(function (error) {
      console.error('Error al obtener elementos de la carpeta:', error);
    });
}

// Limpiar selectores de modelo e imagen
function clearModeloAndImage() {
  var modeloSelect = document.getElementById('modelo');
  modeloSelect.innerHTML = '';

  var img = document.querySelector('.imagen img');
  img.src = '';
}

// Actualizar los elementos del selector de modelo
function updateModelos() {
  clearModeloAndImage();

  var marcaSelect = document.getElementById('marca');
  var modeloSelect = document.getElementById('modelo');
  var selectedMarcaId = marcaSelect.value;

  var url = 'https://www.googleapis.com/drive/v3/files?q=%27' + selectedMarcaId + '%27+in+parents&key=' + API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var items = data.files;

      // Agregar elementos al selector de modelo
      for (var i = 0; i < items.length; i++) {
        var option = document.createElement('option');
        option.value = items[i].id;
        option.text = items[i].name;
        modeloSelect.appendChild(option);
      }

      // Mostrar la imagen seleccionada
      showSelectedImage();
    })
    .catch(function (error) {
      console.error('Error al obtener elementos de la carpeta:', error);
    });
}

// Mostrar la imagen seleccionada
function showSelectedImage() {
  var modeloSelect = document.getElementById('modelo');
  var selectedModeloId = modeloSelect.value;

  // Obtener el enlace de la imagen usando la API de Google Drive
  var url = 'https://www.googleapis.com/drive/v3/files/' + selectedModeloId + '?key=' + API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var img = document.getElementById('selectedImage');
      img.src = 'https://drive.google.com/uc?id=' + selectedModeloId;
    })
    .catch(function (error) {
      console.error('Error al obtener la imagen:', error);
    });
}

// Limpiar selectores al seleccionar marca
function clearMarcaSelection() {
  clearModeloAndImage();
}

// Obtener referencia al selector de marca
var marcaSelect = document.getElementById('marca');

// Agregar event listener al selector de marca para limpiar el selector de modelo y mostrar la imagen
marcaSelect.addEventListener('change', function () {
  clearModeloAndImage();
  updateModelos();
});

// Obtener referencia al selector de modelo
var modeloSelect = document.getElementById('modelo');

// Agregar event listener al selector de modelo para mostrar la imagen seleccionada
modeloSelect.addEventListener('change', function () {
  showSelectedImage();
});

// Llamar a la función de obtener elementos de la carpeta al cargar la página
window.onload = function () {
  getFolderItems();
  showSelectedImage();
};


//zoom imagen
// Obtener la imagen y el contenedor
var imagen = document.getElementById("selectedImage");
var contenedor = document.querySelector(".imagen");

// Variables para el zoom y el arrastre
var scale = 1;
var dragging = false;
var dragStart = { x: 0, y: 0 };
var dragOffset = { x: 0, y: 0 };

// Función para realizar el zoom
function zoomImage(event) {
  event.preventDefault();

  // Ajustar el factor de zoom según la dirección del scroll
  var zoomDelta = event.deltaY * -0.01;
  var prevScale = scale;
  scale = Math.min(Math.max(1, scale + zoomDelta), 3);

  // Obtener la posición del puntero del mouse
  var mouseX = event.clientX - contenedor.offsetLeft;
  var mouseY = event.clientY - contenedor.offsetTop;

  // Calcular la posición de la imagen en relación al puntero del mouse
  var imageX = mouseX - imagen.offsetLeft;
  var imageY = mouseY - imagen.offsetTop;

  // Calcular el desplazamiento de la imagen según el escalado y la posición del puntero del mouse
  var offsetX = -((imageX * (scale - prevScale)) / scale);
  var offsetY = -((imageY * (scale - prevScale)) / scale);

  // Aplicar el zoom a la imagen y ajustar el desplazamiento
  imagen.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  imagen.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}

// Evento de rueda del mouse para zoom
contenedor.addEventListener("wheel", zoomImage);

// Evento de inicio de arrastre
imagen.addEventListener("mousedown", function(event) {
  event.preventDefault();

  // Habilitar el arrastre
  dragging = true;
  dragStart = { x: event.clientX, y: event.clientY };
  dragOffset = { x: 0, y: 0 };
});

// Evento de finalización de arrastre
window.addEventListener("mouseup", function() {
  if (dragging) {
    // Finalizar el arrastre y ajustar la posición de la imagen
    dragging = false;
    imagen.style.transform = `scale(${scale}) translate(${dragOffset.x}px, ${dragOffset.y}px)`;
  }
});

// Evento de movimiento del mouse
window.addEventListener("mousemove", function(event) {
  if (dragging) {
    // Calcular el desplazamiento del mouse durante el arrastre
    var offsetX = event.clientX - dragStart.x;
    var offsetY = event.clientY - dragStart.y;

    // Calcular el desplazamiento límite según el tamaño de la imagen y el contenedor
    var maxOffsetX = (imagen.offsetWidth * scale) - contenedor.offsetWidth;
    var maxOffsetY = (imagen.offsetHeight * scale) - contenedor.offsetHeight;

    // Limitar el desplazamiento dentro de los límites
    offsetX = Math.max(Math.min(offsetX, maxOffsetX), -maxOffsetX);
    offsetY = Math.max(Math.min(offsetY, maxOffsetY), -maxOffsetY);

    // Actualizar la posición de la imagen según el desplazamiento del mouse
    dragOffset.x = offsetX;
    dragOffset.y = offsetY;
    imagen.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
  }
});
