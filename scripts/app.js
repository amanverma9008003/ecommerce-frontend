console.log("E-Commerce Website Loaded");

// Mobile Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-menu');
  const navbar = document.querySelector('.navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Optional: Close menu after clicking a link (on mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth < 768){
        navbar.classList.remove('active');
      }
    });
  });
});


const productGrid = document.getElementById("product-grid");

// Show loading message
function showLoading() {
  productGrid.innerHTML = '<p class="loading-message">Loading products...</p>';
}

// Show error message
function showError(message) {
  productGrid.innerHTML = `<p class="error-message">${message}</p>`;
}

// Render products dynamically
function renderProducts(products) {
  productGrid.innerHTML = ""; // clear

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
  <a href="product.html?id=${product.id}" class="product-link">
    <img src="${product.image}" alt="${product.title}" loading="lazy" />
  </a>
  <div class="product-info">
    <a href="product.html?id=${product.id}" class="product-link">
      <h3 class="product-title">${product.title}</h3>
    </a>
    <p class="product-price">$${product.price.toFixed(2)}</p>
    <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
  </div>
`;

    productGrid.appendChild(card);
  });
}

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
    })
    .catch(error => {
      console.error("Fetching error: ", error);
      showError("Failed to load products. Please try again later.");
    });
}

// Initial call
fetchProducts();

// Event listener for Add to Cart buttons
productGrid.addEventListener("click", e => {
  if (e.target.classList.contains("add-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    console.log(`Add to cart clicked for product id: ${productId}`);
    // Add your cart logic here
  }
});


function updateCartCount() {
  const cartCountElem = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  if(cartCountElem) {
    cartCountElem.textContent = totalQuantity;
  }
}

document.addEventListener('DOMContentLoaded', updateCartCount);
