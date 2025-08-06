//console.log("E-Commerce Website Loaded");

// Select hamburger and navigation elements
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

let navOpen = false;

// Ensure nav is hidden on mobile by default (override inline in case of resize)
function hideNavMobile() {
  if (window.innerWidth <= 470) {
    nav.style.display = 'none';
    navOpen = false;
  } else {
    nav.style.display = 'flex';
    navOpen = false;
  }
}

// Smooth toggle function for nav
function toggleNav() {
  if (!navOpen) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '72px';
    nav.style.right = '32px';
    nav.style.background = '#fff';
    nav.style.boxShadow = '0 8px 24px rgba(30,30,30,0.10)';
    nav.style.borderRadius = '8px';
    nav.style.padding = '16px 28px';
    nav.style.transition = 'opacity 0.25s ease';
    nav.style.opacity = '1';
    nav.style.zIndex = '9999';
    navOpen = true;
  } else {
    // Fade out with opacity transition
    nav.style.opacity = '0';
    setTimeout(() => {
      nav.style.display = 'none';
      navOpen = false;
    }, 250);
  }
}

// On window resize, manage nav state
window.addEventListener('resize', hideNavMobile);
window.addEventListener('DOMContentLoaded', hideNavMobile);

// Hamburger click toggles nav
hamburger.addEventListener('click', toggleNav);
