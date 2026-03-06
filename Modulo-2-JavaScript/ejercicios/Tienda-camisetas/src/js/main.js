"use strict";

// SECCIÓN DE QUERY-SELECTOR ==========================================
const productsElement = document.querySelector(".js-products");
const cartElement = document.querySelector(".js_cartTable");
const cartTotalElement = document.querySelector(".js-cartTotal");
const scrollBtn = document.querySelector(".js-scrollTop");

// SECCIÓN DE DATOS ==========================================
let allProducts = []; // api
let cartItems = []; // productos del carrito

// SECCIÓN DE FUNCIONES ==========================================

// recorreremos allProducts para crear el HTML de cada tarjeta.
function paintProducts() {
  let html = "";
  for (const item of allProducts) {
    html += `
      <li class="card js_card">
        <img src="${item.imageUrl}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}€</p>
        <button class="add-btn js-addBtn" data-id="${item.id}">Añadir</button>
      </li>
    `;
  }
  productsElement.innerHTML = html;

  // Añadimos el evento a los nuevos botones
  const addButtons = document.querySelectorAll(".js-addBtn");
  for (const btn of addButtons) {
    btn.addEventListener("click", handleAddToCart);
  }
}

function paintCart() {
  let html = "";
  let totalGeneral = 0;

  for (const item of cartItems) {
    const subtotal = item.price * item.quantity;
    totalGeneral += subtotal;

    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}€</td>
        <td>
          <button class="dec-btn js-decBtn" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="inc-btn js-incBtn" data-id="${item.id}">+</button>
        </td>
        <td class="text-align-right js_textAlignRight">${subtotal}€</td>
      </tr>
    `;
  }

  // Pintamos las filas en el tbody
  cartElement.innerHTML = html;
  // Actualizamos el total global
  cartTotalElement.innerHTML = `Total: ${totalGeneral}€`;

  // Debemos volver a escuchar sus eventos
  const decButtons = document.querySelectorAll(".js-decBtn");
  const incButtons = document.querySelectorAll(".js-incBtn");

  for (const btn of decButtons) {
    btn.addEventListener("click", handleRemoveItem);
  }
  for (const btn of incButtons) {
    btn.addEventListener("click", handleAddItem);
  }
}

// SECCIÓN DE FUNCIONES DE EVENTOS (Handlers) ==========================================

function handleAddToCart(event) {
  const clickedId = event.currentTarget.dataset.id;
  const productFound = allProducts.find((item) => item.id === clickedId);

  // Buscamos si ya existe en el carrito para aumentar cantidad o añadir nuevo
  const cartItem = cartItems.find((item) => item.id === clickedId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    // Si no existe, lo añadimos con cantidad 1
    cartItems.push({ ...productFound, quantity: 1 });
  }

  paintCart();
  saveCart();
}

// función para +

function handleAddItem(event) {
  const id = event.currentTarget.dataset.id;
  const item = cartItems.find((i) => i.id === id);
  item.quantity++;
  paintCart();
  saveCart();
}

// función para -
function handleRemoveItem(event) {
  const id = event.currentTarget.dataset.id;
  const item = cartItems.find((i) => i.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    // Si la cantidad es 1, quitamos el producto del array
    cartItems = cartItems.filter((i) => i.id !== id);
  }
  paintCart();
  saveCart();
}

// SECCIÓN DE LOCAL STORAGE ==========================================

// Guardar carrito en el navegador
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// cargar carrito al iniciar
function getFromLocalStorage() {
  const localCart = localStorage.getItem("cart");
  if (localCart !== null) {
    cartItems = JSON.parse(localCart);

    paintCart();
  }
}

// SECCIÓN DE EVENTOS ==========================================

// Mostrar/Ocultar botón según el scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Función para subir arriba suavemente
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA ==========================================

getData();

function getData() {
  fetch("./data/t-shirts.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.cart.items;
      paintProducts();
      getFromLocalStorage();
    });
}
