"use strict";

// SECCIÓN DE QUERY-SELECTOR

const inputName = document.querySelector(".js_input");
const btn = document.querySelector(".js_btn");
const greeting = document.querySelector(".js_greeting");
const textToClick = document.querySelector(".js_text");
const generatedContainer = document.querySelector(".js_generatedText");
const ipsumContainer = document.querySelector(".js_ipsumContainer");
const btnClear = document.querySelector(".js_btnClear");

// SECCIÓN DE EVENTOS

//Escuchamos el evento 'click' sobre el objeto 'btn'
btn.addEventListener("click", () => {
  // Guardar lo que hay en el input en ese momento. Usamos .value porque es un campo de formulario
  const nameValue = inputName.value;

  // Modifica el contenido HTML del elemento 'greeting'
  greeting.innerHTML = `Hola ${nameValue}!`;
  // toggle añade la clase si no está, y la quita si ya está
  btn.classList.toggle("btn-active");
});

//Escuchamos el evento 'click' sobre el objeto 'text'
textToClick.addEventListener("click", () => {
  const newP = document.createElement("p");
  newP.classList.add("text"); // Misma clase para que mantenga el estilo
  newP.innerHTML = ` Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam,
          impedit quos magnam assumenda quasi expedita quam, vitae error alias
          aliquid aperiam ea. Alias, est veniam cumque excepturi veritatis non
          totam?. Creado a las ${new Date().toLocaleTimeString()}.`;
  // Usamos interpolación con new Date() y .toLocaleTimeString() pone la hora y lo convierte en numeros.

  generatedContainer.appendChild(newP);
});

// Evento borrar pàrrafos
btnClear.addEventListener("click", () => {
  // Limpiamos solo lo generado
  generatedContainer.innerHTML = "";
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página

console.log("Página y JS cargados!");
