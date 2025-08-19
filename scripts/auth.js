// Password visibility toggles
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
      // location.href = "index.html";
    }
  });
}

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

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBAv01ffY7YdqTK0pTLNEFTaMHhtk2RK1c",
  authDomain: "e-buy-3cf16.firebaseapp.com",
  // ...other config keys
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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

// Already declared above, so just reuse loginForm
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        alert("Login successful!");
        location.href = "index.html"; // or your dashboard
      })
      .catch((error) => {
        setError('login-password-error', error.message);
      });
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'inline';
    // Optionally show user name, etc.
  } else {
    // Not logged in
    document.getElementById('login-link').style.display = 'inline';
    document.getElementById('logout-link').style.display = 'none';
  }
});

auth.onAuthStateChanged((user) => {
  if (!user) {
    location.href = "login.html";
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
