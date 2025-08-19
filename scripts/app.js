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

function showLoading() {
  // Ensure 'loadingMessage' element exists in the HTML and is correctly selected.
  const loadingElement = document.getElementById('loadingMessage');
  if (loadingElement) {
    loadingElement.innerHTML = 'Loading products...';
  } else {
    console.error("Error: Could not find the element with id 'loadingMessage'.");
  }
}

// Show error message
function showError(message) {
  productGrid.innerHTML = `<p class="error-message">${message}</p>`;
}

// Render products dynamically
function renderProducts(products) {
  productGrid.innerHTML = ""; // clear

if (productGrid===null){
  console.error("Error: Could not find the element with id 'product-grid'.");
  return; // Stop rendering if productGrid is not found
}
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


// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for Add to Cart buttons
  // Ensure productGrid is defined and not null before adding the listener
  const productGrid = document.getElementById('your-product-grid-id'); // Replace 'your-product-grid-id' with the actual ID of your product grid element
  if (productGrid) {
    productGrid.addEventListener("click", e => {
      if (e.target.classList.contains("add-cart-btn")) {
        const productId = e.target.getAttribute("data-id");
        console.log(`Add to cart clicked for product id: ${productId}`);
        // Add your cart logic here
      }
    });
  } else {
    console.error("Element with ID 'your-product-grid-id' not found.");
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
/*// Initial call
fetchProducts();

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for Add to Cart buttons
  // Ensure productGrid is defined and not null before adding the listener
  const productGrid = document.getElementById('your-product-grid-id'); // Replace 'your-product-grid-id' with the actual ID of your product grid element
  if (productGrid) {
    productGrid.addEventListener("click", e => {
      if (e.target.classList.contains("add-cart-btn")) {
        const productId = e.target.getAttribute("data-id");
        console.log(`Add to cart clicked for product id: ${productId}`);
        // Add your cart logic here
      }
    });
  } else {
    console.error("Element with ID 'your-product-grid-id' not found.");
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
 */