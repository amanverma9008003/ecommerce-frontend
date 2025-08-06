// scripts/product-detail.js

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchProductData(productId) {
  // Use your API or local file
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
}

function showProduct(product) {
  document.getElementById('product-container').innerHTML = `
    <div class="single-product">
      <div class="product-images">
        <img src="${product.image}" alt="${product.title}" class="main-image" />
      </div>
      <div class="product-info">
        <h1>${product.title}</h1>
        <p class="product-price">$${product.price}</p>
        <p class="product-desc">${product.description}</p>
        <button class="add-to-cart-detail">Add to Cart</button>
      </div>
    </div>
  `;

  // Add to Cart functionality
  document.querySelector('.add-to-cart-detail').addEventListener('click', () => {
    addToCart(product); // Provided by cart.js
    updateCartIcon();   // Provided by cart.js
  });
}

(async function initDetailPage() {
  try {
    const productId = getProductIdFromURL();
    const product = await fetchProductData(productId);
    showProduct(product);
  } catch (err) {
    document.getElementById('product-container').textContent = 'Product not found!';
  }
})();
