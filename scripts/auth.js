import { auth } from './app.js';

// Password visibility toggles
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', function () {
    const input = this.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  });
});

console.log("worked apputh 1");
try {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  alert("Failed to initialize Firebase. Check console for details.");
}



document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', function () {
    const input = this.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      this.innerHTML = '🙈';
    } else {
      input.type = 'password';
      this.innerHTML = '👁️';
    }
  });
});

console.log("worked apputh2");
// --- LOGIN FORM HANDLING ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Validation
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let valid = true;
    // Email validation
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
      setError('login-email-error', 'Please enter a valid email');
      valid = false;
    } else {
      setError('login-email-error', '');
    }
    // Password presence
    if (password.value.length < 8) {
      setError('login-password-error', 'Password must be at least 8 characters');
      valid = false;
    } else {
      setError('login-password-error', '');
    }

    if (valid) {
      // Here, send login details to your backend (or mock)
      alert('Login successful! (Simulation only)');
      loginForm.reset();
      location.href = "index.html";
    }
  });
}
 console.log("worked apputh 3");
// --- SIGNUP FORM HANDLING ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');
    const confirm = document.getElementById('signup-password-confirm');
    // Name field
    if (name.value.trim().length < 2) {
      setError('signup-name-error', 'Enter your full name');
      valid = false;
    } else {
      setError('signup-name-error', '');
    }
    // Email validation
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
      setError('signup-email-error', 'Please enter a valid email');
      valid = false;
    } else {
      setError('signup-email-error', '');
    }
    // Password validation
    if (!validatePassword(password.value)) {
      setError('signup-password-error', 'Password must be at least 8 chars, with upper, lower, and number');
      valid = false;
    } else {
      setError('signup-password-error', '');
    }
    // Confirm password
    if (password.value !== confirm.value) {
      setError('signup-password-confirm-error', 'Passwords do not match');
      valid = false;
    } else {
      setError('signup-password-confirm-error', '');
    }
    if (valid) {
      // Here, send signup details to backend (or mock)
      alert('Signup successful! (Simulation only)');
      signupForm.reset();
      document.getElementById('password-strength').textContent = '';
      // location.href = "login.html";
    }
  });
console.log("workden app 4")
  // Password strength on signup
  document.getElementById('signup-password').addEventListener('input', function () {
    const strength = getPasswordStrength(this.value);
    const indicator = document.getElementById('password-strength');
    indicator.textContent = strength.label;
    indicator.style.color = strength.color;
  });
}

// --- UTILITY FUNCTIONS ---
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function validatePassword(pw) {
  // At least 8 chars, a lowercase, an uppercase, a digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(pw);
}

function getPasswordStrength(pw) {
  // Very basic demo scoring
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z\d]/.test(pw)) score++;
  if (score <= 2) return { label: 'Weak', color: 'crimson' };
  if (score === 3) return { label: 'Medium', color: '#f1c40f' };
  if (score >= 4) return { label: 'Strong', color: 'green' };
  return { label: '', color: '#888' };
}

console.log("workden apputh 5");
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pw = document.getElementById('signup-password').value;
    const confirmPw = document.getElementById('signup-password-confirm').value;

    // Validate (as previously done)
    if (!name || !email.match(/^\S+@\S+\.\S+$/) || pw.length < 8 || pw !== confirmPw) {
      // Show appropriate error messages
      return;
    }

    auth.createUserWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // Optionally set displayName
        userCredential.user.updateProfile({ displayName: name });
        alert("Signup successful!");
        location.href = "login.html";
      })
      .catch((error) => {
        setError('signup-password-error', error.message);
      });
  });
}

console.log("workden apputh 6");

// Already declared above, so just reuse loginForm
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value;

    // Show loading state
    const submitBtn = document.getElementById('login-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    auth.signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // Success - redirect happens via auth state change handler
      })
      .catch((error) => {
        let errorMessage = 'Login failed';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Account disabled';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email or password';
            break;
          default:
            errorMessage = error.message;
        }
        setError('login-password-error', errorMessage);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });
}

auth.onAuthStateChanged((user) => {
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');
  
  if (user) {
    // User logged in
    if (loginLink) loginLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'inline';
    
    // If on login page, redirect to home
    if (window.location.pathname.includes('login.html')) {
      location.href = "index.html";
    }
  } else {
    // Not logged in
    if (loginLink) loginLink.style.display = 'inline';
    if (logoutLink) logoutLink.style.display = 'none';
    
    // Protect routes that require auth
    const protectedRoutes = ['/cart.html', '/account.html'];
    if (protectedRoutes.some(route => window.location.pathname.includes(route))) {
      location.href = "login.html";
    }
  }
});

document.getElementById('logout-link').addEventListener('click', function(e) {
  e.preventDefault();
  auth.signOut().then(() => {
    alert("Logged out!");
    location.href = "login.html";
  });
});

setError('signup-password-error', error.message); // Already in existing utility

console.log("workden apputh7");