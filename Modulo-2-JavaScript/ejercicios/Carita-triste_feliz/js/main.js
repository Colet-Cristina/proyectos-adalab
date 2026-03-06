"use strict";
// Busca en HTML los elementos que necesitamos manipular
const face = document.querySelector("#face");
const moodSelect = document.querySelector("#mood");
const updateBtn = document.querySelector("#update");
const body = document.body;

updateBtn.addEventListener("click", () => {
  // Operador ternario Cambiar la cara según la selección
  face.textContent = moodSelect.value === "happy" ? ":)" : ":(";

  // Generar número aleatorio (0-100)
  const randomNum = Math.floor(Math.random() * 101);

  // Cambiar el fondo si es par o impar
  if (randomNum % 2 === 0) {
    body.style.backgroundColor = "#ffcc00";
  } else {
    body.style.backgroundColor = "#ff9900";
  }
});

console.log("Página y JS cargados!");
