// On Load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

// Utility Functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
  let cart = getCart();
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
}

// Render Cart
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cart = getCart();

  cartItemsContainer.innerHTML = ""; // clear before re-render

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("checkoutBtn").disabled = true;
    document.getElementById("cartTotal").textContent = "0.00";
    updateCartCount();
    updateCartTotal();
    return;
  }

  let total = 0;

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
        <p class="product-quantity">Quantity: ${item.quantity}</p>
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
      <button onclick="removeItem(${index})">❌ Remove</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  document.getElementById("cartTotal").textContent = total.toFixed(2);
  document.getElementById("checkoutBtn").disabled = false;
  updateCartCount();
  updateCartTotal();
}

// Quantity Update
function updateQuantity(index, change) {
  let cart = getCart();
  if (cart[index].quantity + change >= 1) {
    cart[index].quantity += change;
    saveCart(cart);
    renderCart();
  }
}

// Remove Item
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1); // remove item
  saveCart(cart);
  renderCart();
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
  renderCart();
  updateCartCount();
});
