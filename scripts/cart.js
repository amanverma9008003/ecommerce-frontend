// scripts/cart.js

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({...product, qty: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector('.cart-badge').textContent = totalCount;
}

// On every page load
if (document.querySelector('.cart-badge')) updateCartIcon();
