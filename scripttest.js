
var API_KEY = 'AIzaSyB8jACrHjLcDxbzELNkfxQ1r7ZxTk9oDZM';
var FOLDER_ID = '1-bjFtGpYfyANU7zK6UtDL4yxIyGGH4GX';

// Obtener elementos de la carpeta "marca" y mostrarlos en orden alfabético
function getMarcaFolderItems() {
  var marcaSelect = document.getElementById('marca');

  // Limpiar selector de marca
  marcaSelect.innerHTML = '';

  // Obtener elementos de la carpeta "marca" mediante una llamada a la API
  var marcaUrl = 'https://www.googleapis.com/drive/v3/files?q=%27' + FOLDER_ID + '%27+in+parents&key=' + API_KEY;

  fetch(marcaUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var items = data.files;

      // Ordenar elementos alfabéticamente
      items.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      // Agregar elementos al selector de marca en orden alfabético
      for (var i = 0; i < items.length; i++) {
        var option = document.createElement('option');
        option.value = items[i].id;
        option.text = items[i].name;
        marcaSelect.appendChild(option);
      }

      // Actualizar los elementos del selector de tipo
      updateTipoFolderItems();
    })
    .catch(function (error) {
      console.error('Error al obtener elementos de la carpeta "marca":', error);
    });
}

// Obtener elementos de la carpeta "tipo" y mostrarlos en orden alfabético
function updateTipoFolderItems() {
  var marcaSelect = document.getElementById('marca');
  var tipoSelect = document.getElementById('tipo');
  var selectedMarca = marcaSelect.value;

  // Limpiar selector de tipo
  tipoSelect.innerHTML = '';

  // Obtener elementos de la carpeta "tipo" mediante una llamada a la API
  var tipoUrl = 'https://www.googleapis.com/drive/v3/files?q=%27' + selectedMarca + '%27+in+parents&key=' + API_KEY;

  fetch(tipoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var items = data.files;

      // Ordenar elementos alfabéticamente
      items.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      // Agregar elementos al selector de tipo en orden alfabético
      for (var i = 0; i < items.length; i++) {
        var option = document.createElement('option');
        option.value = items[i].id;
        option.text = items[i].name.replace(/\.[^/.]+$/, ''); // Eliminar la extensión del nombre del archivo
        tipoSelect.appendChild(option);
      }

      // Actualizar los elementos del selector de modelo
      updateModeloFolderItems();
    })
    .catch(function (error) {
      console.error('Error al obtener elementos de la carpeta "tipo":', error);
    });
}

// Obtener elementos de la carpeta "modelo" y mostrarlos en orden alfabético
function updateModeloFolderItems() {
  var tipoSelect = document.getElementById('tipo');
  var modeloSelect = document.getElementById('modelo');
  var selectedTipo = tipoSelect.value;

  // Limpiar selector de modelo
  modeloSelect.innerHTML = '';

  // Obtener elementos de la carpeta "modelo" mediante una llamada a la API
  var modeloUrl = 'https://www.googleapis.com/drive/v3/files?q=%27' + selectedTipo + '%27+in+parents&key=' + API_KEY;

  fetch(modeloUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var items = data.files;

      // Ordenar elementos alfabéticamente
      items.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      // Agregar elementos al selector de modelo en orden alfabético sin la extensión del nombre del archivo
      for (var i = 0; i < items.length; i++) {
        var option = document.createElement('option');
        option.value = items[i].id;
        option.text = items[i].name.replace(/\.[^/.]+$/, ''); // Eliminar la extensión del nombre del archivo
        modeloSelect.appendChild(option);
      }

      // Mostrar la imagen seleccionada
      showSelectedImage();
    })
    .catch(function (error) {
      console.error('Error al obtener elementos de la carpeta "modelo":', error);
    });
}

// Mostrar la imagen seleccionada
function showSelectedImage() {
  var modeloSelect = document.getElementById('modelo');
  var selectedModeloId = modeloSelect.value;

  // Obtener el enlace de la imagen usando la API de Google Drive
  var imageUrl = 'https://drive.google.com/uc?id=' + selectedModeloId;

  var img = document.getElementById('selectedImage');
  img.src = imageUrl;
}

// Obtener referencia al selector de marca
var marcaSelect = document.getElementById('marca');

// Agregar event listener al selector de marca para actualizar el selector de tipo
marcaSelect.addEventListener('change', function () {
  updateTipoFolderItems();
});

// Obtener referencia al selector de tipo
var tipoSelect = document.getElementById('tipo');

// Agregar event listener al selector de tipo para actualizar el selector de modelo
tipoSelect.addEventListener('change', function () {
  updateModeloFolderItems();
});

// Obtener referencia al selector de modelo
var modeloSelect = document.getElementById('modelo');

// Agregar event listener al selector de modelo para mostrar la imagen seleccionada
modeloSelect.addEventListener('change', function () {
  showSelectedImage();
});

// Llamar a la función de obtener elementos de la carpeta "marca" al cargar la página
window.onload = function () {
  getMarcaFolderItems();
  showSelectedImage();
};