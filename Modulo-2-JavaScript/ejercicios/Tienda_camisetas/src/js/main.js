"use strict";

// SECCIÓN DE QUERY-SELECTOR ==========================================
const listElement = document.querySelector(".js_list");
const inputElement = document.querySelector(".js_input");
const cartTableBody = document.querySelector(".js_cartTableBody");
const cartTotalElement = document.querySelector(".js_cartTotal");

// SECCIÓN DE DATOS ==========================================
let allProducts = []; // api
let cartItems = []; // productos del carrito

// SECCIÓN DE FUNCIONES ==========================================

// Función render, pintar elementos en la página
function renderItems(items) {
  const html = items
    .map(
      (item) => `
    <li class="card js_card">
      <img src="${item.imageUrl}" alt="${item.name}" class="card-img js_cardImg">
      <h3 class="card-title js_cardTitle">${item.name}</h3>
      <p class="card-price js_cardPrice">${item.price}€</p>
    </li>
  `,
    )
    .join("");

  listElement.innerHTML = `<ul class="cards-list js_cardsList">${html}</ul>`;
}

// Traer Api
function getData() {
  fetch("./data/t-shirts.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.cart.items;
      renderItems(allProducts);
    });
}

function renderCart() {
  let total = 0;

  // Generamos el HTML de las filas de la tabla
  const html = cartItems
    .map((item) => {
      total += item.price;
      return `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}€</td>
        <td>1</td> <td>${item.price}€</td>
      </tr>
    `;
    })
    .join("");

  // Lo inyectamos en el cuerpo de la tabla
  cartTableBody.innerHTML = html;

  // Actualizamos el total
  cartTotalElement.innerHTML = `${total}€`;
}

// SECCIÓN DE FUNCIONES DE EVENTOS (Handlers) ==========================================

function handleFilter() {
  const searchTerm = inputElement.value.toLowerCase();

  const filteredProducts = allProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm),
  );

  renderItems(filteredProducts);
}
function handleAddToCart(event) {
  const productId = event.currentTarget.dataset.id; // Asegúrate de poner data-id en el botón
  const product = allProducts.find((item) => item.id === productId);

  // Añadimos el producto a la cesta
  cartItems.push(product);

  // Re-renderizamos la cesta
  renderCart();
}

// SECCIÓN DE EVENTOS ==========================================
inputElement.addEventListener("input", handleFilter);

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA ==========================================
getData();
console.log("Página y JS cargados!");
