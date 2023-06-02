
var API_KEY = 'AIzaSyDeBdqKE4e20-KwEZAdSC8aLSm9T98udxU';
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