// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCart');
const cartMessage = document.getElementById('cartMessage');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
let basePrice = 0;
// will be set when fetching product

// Select elements
const productDetail = document.getElementById("productDetail");
const loadingMsg = document.getElementById("loadingMsg");
const errorMsg = document.getElementById("errorMsg");

// Fetch product details
async function fetchProductDetail() {
  try {
    loadingMsg.style.display = "block";
    errorMsg.style.display = "none";

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const product = await response.json();
    loadingMsg.style.display = "none";

    productDetail.innerHTML = `
      <div class="product-container">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" id="mainImage" loading="lazy"
      decoding="async"
      width="300" height="300">
        </div>
        <div class="product-info">
          <h2>${product.title}</h2>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p class="description">${product.description}</p>
          <button id="addToCartBtn">Add to Cart</button>
        </div>
      </div>`;
  }
  catch(error) {
    console.error("Error:the pappa", error);
    loadingMsg.style.display = "none";
    errorMsg.style.display = "block";
  }
  // Add to Cart functionality
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    const quantity = parseInt(quantityInput.value, 10);

    // Basic validation
    if (!productId || !size || !color || isNaN(quantity) || quantity <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    addToCart({ id: productId, size, color, quantity });
  });
  
}
// Add to Cart using localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count in navbar
  document.getElementById("cartCount").innerText = cart.length;
}

increaseBtn.addEventListener('click', () => {
  let value = parseInt(quantityInput.value);
  if (value < 10) quantityInput.value = value + 1;
});

decreaseBtn.addEventListener('click', () => {
  let value = parseInt(quantityInput.value);
  if (value > 1) quantityInput.value = value - 1;
});

function updatePrice() {
  const quantity = parseInt(quantityInput.value);
  const total = basePrice * quantity;
  document.getElementById('product-price').textContent = `$${total.toFixed(2)}`;
}

addToCartBtn.addEventListener('click', () => {
  const productId = new URLSearchParams(window.location.search).get('id');
  const size = document.getElementById('size').value;
  const color = document.getElementById('color').value;
  const quantity = parseInt(quantityInput.value, 10);

  // Basic validation
  if (!productId || !size || !color || isNaN(quantity) || quantity <= 0) {
    alert('Please fill in all fields correctly.');
    return;
  }

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (error) {
    console.error('Error parsing cart data:', error);
  }

  cart.push({ id: productId, size, color, quantity });
  localStorage.setItem('cart', JSON.stringify(cart));

  cartMessage.style.display = 'block'; // show success message
  setTimeout(() => cartMessage.style.display = 'none', 2000);

  // update cart count in nav
  document.getElementById('cartCount').textContent = cart.length;
});

fetchProductDetail();
