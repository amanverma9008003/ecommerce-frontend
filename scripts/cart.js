// Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElem = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountElem = document.getElementById('cart-count');  // Header badge

// Load cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
  const cart = loadCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElem) {
    cartCountElem.textContent = totalQuantity;
  }
}

// Render cart items
function renderCartItems() {
  const cart = loadCart();
  cartItemsContainer.innerHTML = ''; // Clear existing items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    updateCartCount();
    updateCartTotal();
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.dataset.id = item.id;
    itemDiv.dataset.size = item.size || '';
    itemDiv.dataset.color = item.color || '';

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        ${item.size || item.color ? `
          <p class="cart-item-variations">
            ${item.size ? 'Size: ' + item.size : ''} ${item.color ? ' | Color: ' + item.color : ''}
          </p>
        ` : ''}
        <p class="product-price">$${(item.price * item.quantity).toFixed(2)}</p>

        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="qty-btn decrease">−</button>
            <input type="number" class="qty-input" min="1" max="99" value="${item.quantity}" />
            <button class="qty-btn increase">+</button>
          </div>
          <button class="remove-btn">Remove</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  updateCartCount();
  updateCartTotal();
}

// Update total price display
function updateCartTotal() {
  const cart = loadCart();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElem.textContent = totalPrice.toFixed(2);
}

// Handle quantity changes
cartItemsContainer.addEventListener('click', e => {
  const target = e.target;
  if (target.classList.contains('qty-btn')) {
    const isIncrease = target.classList.contains('increase');
    const itemDiv = target.closest('.cart-item');
    const qtyInput = itemDiv.querySelector('.qty-input');
    let currentQty = parseInt(qtyInput.value);

    if (isIncrease) {
      if (currentQty < 99) qtyInput.value = currentQty + 1;
    } else {
      if (currentQty > 1) qtyInput.value = currentQty - 1;
    }

    updateQuantity(itemDiv.dataset.id, itemDiv.dataset.size, itemDiv.dataset.color, parseInt(qtyInput.value));
  }
});

// Direct input change for quantity
cartItemsContainer.addEventListener('input', e => {
  if (e.target.classList.contains('qty-input')) {
    const qtyInput = e.target;
    let val = parseInt(qtyInput.value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 99) val = 99;
    qtyInput.value = val;

    const itemDiv = qtyInput.closest('.cart-item');
    updateQuantity(itemDiv.dataset.id, itemDiv.dataset.size, itemDiv.dataset.color, val);
  }
});

// Update quantity in localStorage and refresh UI
function updateQuantity(id, size, color, newQty) {
  let cart = loadCart();
  
  const index = cart.findIndex(item => item.id === id && item.size === size && item.color === color);
  
  if (index !== -1) {
    cart[index].quantity = newQty;
    
    saveCart(cart);
    renderCartItems(); // Re-render to update pricing & counts
  }
}

// Handle removing items
cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const itemDiv = e.target.closest('.cart-item');
    const id = itemDiv.dataset.id;
    const size = itemDiv.dataset.size;
    const color = itemDiv.dataset.color;

    removeCartItem(id, size, color);
  }
});

// Remove item from cart
function removeCartItem(id, size, color) {
  let cart = loadCart();

  cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));

  saveCart(cart);
  renderCartItems();
}

// Proceed to checkout click handler
checkoutBtn.addEventListener('click', () => {
  // For now, simply alert or redirect
  alert('Proceeding to checkout...');
  // You can redirect to a checkout page if implemented, e.g.:
  // window.location.href = 'checkout.html';
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  updateCartCount();
});
