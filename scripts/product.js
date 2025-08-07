// Utility to get query parameters from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Elements
const productDetailContainer = document.getElementById('product-detail');
const cartCountElem = document.getElementById('cart-count'); // For updating cart count in header

// Fetch product ID from URL
const productId = getQueryParam('id');

if (!productId) {
  productDetailContainer.innerHTML = '<p class="error-message">Product ID is missing.</p>';
} else {
  fetchProductDetails(productId);
  updateCartCount(); // initialize cart count on page load
}

// Fetch product details from API and render
function fetchProductDetails(id) {
  productDetailContainer.innerHTML = '<p class="loading-message">Loading product details...</p>';

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    })
    .then(product => {
      renderProductDetail(product);
    })
    .catch(err => {
      productDetailContainer.innerHTML = `<p class="error-message">Could not load product details. Try again later.</p>`;
      console.error(err);
    });
}

// Render product detail dynamically
function renderProductDetail(product) {
  productDetailContainer.innerHTML = `
    <div class="product-detail-wrapper">
      <div class="product-images">
        <img src="${product.image}" alt="${product.title}" id="main-product-image" />
        <!-- If there were multiple images, add thumbnails here -->
      </div>
      <div class="product-info-detail">
        <h1>${product.title}</h1>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>

        <!-- Variations Section - optional, FakeStore API doesn’t provide variations -->
        <!-- Add here if you want to extend with sizes/colors -->

        <button id="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;

  // Attach Add to Cart event listener
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);
  });

  imageZoom("main-product-image", "zoom-result", "zoom-lens");
}

// Add to Cart logic using localStorage
function addToCart(product) {
  // Get existing cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if product already in cart
  const index = cart.findIndex(item => item.id === product.id);
  if (index > -1) {
    // Increase quantity if already exists
    cart[index].quantity += 1;
  } else {
    // Add new product with quantity 1
    cart.push({ ...product, quantity: 1 });
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`Added "${product.title}" to cart.`);

  updateCartCount();
}

// Display current cart count in header badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElem) {
    cartCountElem.textContent = totalQuantity;
  }
}

function imageZoom(imgID, resultID, lensID) {
  const img = document.getElementById(imgID);
  const result = document.getElementById(resultID);
  const lens = document.getElementById(lensID);

  if (!img || !result || !lens) return;

  result.style.backgroundImage = `url('${img.src}')`;
  result.style.backgroundSize = (img.width * 3) + "px " + (img.height * 3) + "px";

  const cx = result.offsetWidth / lens.offsetWidth;
  const cy = result.offsetHeight / lens.offsetHeight;

  function moveLens(e) {
    e.preventDefault();
    let pos = getCursorPos(e);
    let x = pos.x - (lens.offsetWidth / 2);
    let y = pos.y - (lens.offsetHeight / 2);

    // Prevent lens from going outside the image
    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
  }

  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    let x = e.pageX - rect.left - window.pageXOffset;
    let y = e.pageY - rect.top - window.pageYOffset;
    return { x, y };
  }

  img.addEventListener("mousemove", () => {
    lens.style.visibility = "visible";
    result.style.display = "block";
  });

  img.addEventListener("mouseout", () => {
    lens.style.visibility = "hidden";
    result.style.display = "none";
  });

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  // For touch devices: toggle zoom on tap
  img.addEventListener("touchstart", () => {
    if (result.style.display === "block") {
      lens.style.visibility = "hidden";
      result.style.display = "none";
    } else {
      lens.style.visibility = "visible";
      result.style.display = "block";
    }
  });
}



let selectedSize = "M";
let selectedColor = "blue";

document.addEventListener('change', (e) => {
  if (e.target.id === 'size-select') {
    selectedSize = e.target.value;
    updatePriceDisplay();
  }
  if (e.target.id === 'color-select') {
    selectedColor = e.target.value;
    updatePriceDisplay();
  }
});

function updatePriceDisplay() {
  // For example, you might add a small price adjustment for certain sizes/colors
  let basePrice = currentProduct.price; // store current product globally when fetched
  let priceModifier = 0;

  if (selectedSize === "L") priceModifier += 5;
  if (selectedColor === "red") priceModifier += 2;

  const totalPrice = basePrice + priceModifier;
  
  const priceElem = document.querySelector('.product-price');
  if (priceElem) {
    priceElem.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

const quantityInput = document.getElementById('quantity-input');
const decreaseBtn = document.getElementById('decrease-qty');
const increaseBtn = document.getElementById('increase-qty');

decreaseBtn.addEventListener('click', () => {
  let currentQty = parseInt(quantityInput.value);
  if (currentQty > 1) {
    quantityInput.value = currentQty - 1;
    updatePriceDisplay();
  }
});

increaseBtn.addEventListener('click', () => {
  let currentQty = parseInt(quantityInput.value);
  if (currentQty < 99) {
    quantityInput.value = currentQty + 1;
    updatePriceDisplay();
  }
});

quantityInput.addEventListener('input', () => {
  let val = parseInt(quantityInput.value);
  if (isNaN(val) || val < 1) {
    quantityInput.value = 1;
  } else if (val > 99) {
    quantityInput.value = 99;
  }
  updatePriceDisplay();
});

function updatePriceDisplay() {
  let basePrice = currentProduct.price;
  let priceModifier = 0;

  if (selectedSize === "L") priceModifier += 5;
  if (selectedColor === "red") priceModifier += 2;

  let quantity = parseInt(quantityInput.value) || 1;

  let totalPrice = (basePrice + priceModifier) * quantity;

  const priceElem = document.querySelector('.product-price');
  if (priceElem) {
    priceElem.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', () => {
  const qty = parseInt(quantityInput.value) || 1;

  const cartItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    price: currentProduct.price,
    size: selectedSize,
    color: selectedColor,
    quantity: qty,
    image: currentProduct.image
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if same product with same variations exists
  const existingIndex = cart.findIndex(item => 
    item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count badge
  updateCartCount();

  // Show feedback (simple alert or improve with toast/modal)
  alert(`Added ${qty} x "${currentProduct.title}" (${selectedSize}, ${selectedColor}) to your cart.`);
});

addToCartBtn.addEventListener('click', () => {
  const qty = parseInt(quantityInput.value) || 1;

  const cartItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    price: calculateCurrentPrice(),  // function that calculates price with variations & quantity
    basePrice: currentProduct.price, // save original price for reference
    size: selectedSize,
    color: selectedColor,
    quantity: qty,
    image: currentProduct.image
  };

  addOrUpdateCartItem(cartItem);
});


//
function addOrUpdateCartItem(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Find if product with same ID and variations already exists
  const existingIndex = cart.findIndex(cartItem =>
    cartItem.id === item.id &&
    cartItem.size === item.size &&
    cartItem.color === item.color
  );

  if (existingIndex > -1) {
    // Update quantity by adding new quantity
    cart[existingIndex].quantity += item.quantity;
    // Optionally update price if needed or recalculate totals elsewhere
  } else {
    cart.push(item); // Add new item
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartCount();
  showAddToCartFeedback(item);
}

function updateCartCount() {
  if (qty < 1) {
  alert("Quantity must be at least 1");
  return;
  }

  const cartCountElem = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElem) {
    cartCountElem.textContent = totalQuantity;
  }
}

// Ensure this runs on page load:
document.addEventListener('DOMContentLoaded', updateCartCount);

//

function showAddToCartFeedback(item) {
  const feedback = document.createElement('div');
  feedback.className = 'add-cart-feedback';
  feedback.textContent = `"${item.title}" added to cart!`;

  document.body.appendChild(feedback);

  // Animate: fade in then fade out after 3 seconds
  setTimeout(() => {
    feedback.classList.add('show');
  }, 100);
  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 500); // Allow fade out animation before removing
  }, 3100);
}

