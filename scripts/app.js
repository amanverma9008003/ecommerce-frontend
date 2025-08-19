import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js'; // Assuming you have your Firebase app initialized in firebase-config.js

//---Firebase authenticatrion setup---
export const firebaseConfig = {
  apiKey: "AIzaSyBAv01ffY7YdqTK0pTLNEFTaMHhtk2RK1c",
  authDomain: "e-buy-3cf16.firebaseapp.com",
  projectId: "e-buy-3cf16",
  storageBucket: "e-buy-3cf16.firebasestorage.app",
  messagingSenderId: "175016726223",
  appId: "1:175016726223:web:e3b44b357212a87fcdb1ba",
  measurementId: "G-ETG7LRZ4DS"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("E-Commerce Website Loaded");

// Mobile Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-menu');
  const navbar = document.querySelector('.navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  console.log("worked app1");
  // Optional: Close menu after clicking a link (on mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth < 768){
        navbar.classList.remove('active');
      }
    });
  });
});

console.log("worked app2");

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for Add to Cart buttons
  // Ensure productGrid is defined and not null before adding the listener
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    productGrid.addEventListener("click", e => {
      if (e.target.classList.contains("add-cart-btn")) {
        const productId = e.target.getAttribute("data-id");
        addToCart(productId);
      }
    });
  } else {
    console.error("Element with ID 'your-product-grid-id' not found.");
  }
});

function showLoading() {
  console.log("Loading products..."); // Replace with actual loading indicator logic
}

// Define the hideLoading function (often used with showLoading)
function hideLoading() {
  console.log("Loading finished."); // Replace with actual hide loading indicator logic
}

// Function to render products
function renderProducts(products) {
  // ... (your existing renderProducts function)
  const productGrid = document.getElementById('product-grid'); // Assuming you have an element with id 'product-grid'
  productGrid.innerHTML = ''; // Clear previous products

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <h2>${product.title}</h2>
      <p>${product.price}</p>
      <img src="${product.image}" alt="${product.title}">
    `; // Added closing backtick and corrected variable name

    productGrid.appendChild(card);
  });
}

console.log("worked app3");
// Fetch products from API
function fetchProducts() {
  showLoading();

  fetch("https://fakestoreapi.com/products")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      renderProducts(data);
      hideLoading(); // Hide loading after products are rendered
    })
    .catch(error => {
      console.error("Fetching error: ", error);
      showError("Failed to load products. Please try again later.");
      hideLoading(); // Hide loading in case of an error
    });
}

// Initial call
fetchProducts();


function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

console.log("worked app4");

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast('Item quantity increased in cart');
  } else {
    cart.push({ id: productId, quantity: 1 });
    showToast('Item added to cart');
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCountElem = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  if(cartCountElem) {
    cartCountElem.textContent = totalQuantity;
  }
}
