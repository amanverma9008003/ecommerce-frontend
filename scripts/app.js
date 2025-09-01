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

// Select hamburger and nav
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle navigation on mobile
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Select elements
const productGrid = document.getElementById("productGrid");
const loadingMsg = document.getElementById("loadingMsg");
const errorMsg = document.getElementById("errorMsg");

// Fetch Products from FakeStore API
async function fetchProducts() {
  try {
    loadingMsg.style.display = "block";  // Show loading
    errorMsg.style.display = "none";     // Hide error

    const response = await fetch("https://fakestoreapi.com/products?");
    
    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const products = await response.json();
    loadingMsg.style.display = "none"; // Hide loading

    // Generate product cards
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
  <a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.title}" loading="lazy">
  </a>
  <div class="product-info">
    <h3>${product.title.substring(0, 40)}...</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button data-id="${product.id}">Add to Cart</button>
  </div>`;
      productGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    loadingMsg.style.display = "none";
    errorMsg.style.display = "block";
  }
}

fetchProducts();
