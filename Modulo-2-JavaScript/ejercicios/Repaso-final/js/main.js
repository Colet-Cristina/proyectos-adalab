"use strict";

// SECCIÓN DE QUERY-SELECTOR ===============================================
const listElement = document.querySelector(".js_palettesList");
const inputSearch = document.querySelector(".js_inputSearch");

let allPalettes = [];
let favorites = [];

// SECCIÓN DE FUNCIONES ====================================================
// Esta función pinta los elementos
function renderPalettes(data) {
  let html = "";

  for (const palette of data) {
    // Comprobamos si esta paleta es favorita para añadir la clase
    const isFavorite = favorites.includes(palette.id.toString());
    const selectedClass = isFavorite ? "selected" : "";

    html += `<li class="card js_card ${selectedClass}" id="${palette.id}">`;
    html += `  <h3>${palette.name}</h3>`;
    html += `  <ul class="colors-list js_colorsList">`;

    // Aquí es donde creamos los cuadraditos de colores
    for (const color of palette.colors) {
      html += `<li class="color-box js_colorBox" style="background-color: #${color}"></li>`;
    }
    html += `  </ul>`;
    html += `</li>`;
  }
  // Inyectamos todo el string generado de una sola vez
  listElement.innerHTML = html;
}
// petición API -----------------------
function getPalettes() {
  const localData = localStorage.getItem("myPalettes");

  if (localData !== null) {
    // Si hay datos en caché, los usamos directamente
    allPalettes = JSON.parse(localData);
    renderPalettes(allPalettes);
  } else {
    // Si no hay nada, hacemos el fetch
    fetch(
      "https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json",
    )
      .then((response) => response.json())
      .then((data) => {
        allPalettes = data.palettes;
        // Guardamos los datos en el caché para la próxima vez
        localStorage.setItem("myPalettes", JSON.stringify(allPalettes));
        renderPalettes(allPalettes);
      });
  }
}

//----------------favoritos----------------------
// Función que gestiona el clic en favoritos
function handlePaletteClick(event) {
  // .closest nos asegura obtener el elemento LI incluso si clickamos en un color
  const clickedCard = event.target.closest(".js_card");

  if (clickedCard) {
    // Obtenemos el ID
    const paletteId = clickedCard.id;

    // Toggle: Si ya está en favoritas, la quitamos; si no, la añadimos
    const index = favorites.indexOf(paletteId);
    if (index === -1) {
      favorites.push(paletteId);
      clickedCard.classList.add("selected");
    } else {
      favorites.splice(index, 1);
      clickedCard.classList.remove("selected");
    }

    // Guardamos las favoritas en LocalStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// Recuperar favoritos al cargar
function loadFavorites() {
  const savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }
}

// SECCIÓN DE EVENTOS ===============================================

listElement.addEventListener("click", handlePaletteClick);

// Evento para filtrar por nombre
inputSearch.addEventListener("input", () => {
  const filterValue = inputSearch.value.toLowerCase();

  // Filtramos el array 'allPalettes' que ya tenemos lleno
  const filteredPalettes = allPalettes.filter((palette) =>
    palette.name.toLowerCase().includes(filterValue),
  );

  // Volvemos a pintar, pero esta vez solo con los resultados filtrados
  renderPalettes(filteredPalettes);
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA ===============================================

// Cargamos los favoritos guardados y pedimos las paletas
loadFavorites();
getPalettes();
