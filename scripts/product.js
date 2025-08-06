// scripts/products.js

const grid = document.querySelector('.product-grid');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    grid.innerHTML = ''; // Clear placeholders
    
    products.forEach(product => {
    grid.innerHTML += `
    <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-card">
        <img loading="lazy" src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="event.preventDefault()">Add to Cart</button>
        </div>
    </a>
  `;
});

  });
