// Toggle password visibility
function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

// Signup form validation
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 8 chars, include uppercase, lowercase, and number.");
    return;
  }

  // Store user in localStorage (for demo, not real authentication!)
  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Signup successful! Please login.");
  window.location.href = "login.html";
});

// Login validation
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "index.html"; // redirect to home
  } else {
    alert("Invalid credentials!");
  }
});

// Password strength check
document.getElementById("signupPassword")?.addEventListener("input", function() {
  const strengthMsg = document.getElementById("passwordStrength");
  const pwd = this.value;
  if (validatePassword(pwd)) {
    strengthMsg.textContent = "✅ Strong password";
    strengthMsg.style.color = "green";
  } else {
    strengthMsg.textContent = "❌ Weak password";
    strengthMsg.style.color = "red";
  }
});

function validatePassword(password) {
  return /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password) &&
         password.length >= 8;
}
