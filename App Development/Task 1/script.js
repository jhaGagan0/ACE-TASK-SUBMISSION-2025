// ======================
// PARTICLES (beautiful floating colors)
// ======================
function createParticles() {
  const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'];

  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = Math.random() * 8 + 4 + 'px';

    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 15px ${color}`;

    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 15000);
  }, 300);
}
createParticles();

// ======================
// FORM SWITCHING
// ======================
function switchToSignup() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  loginForm.classList.add('exit-left');
  setTimeout(() => {
    loginForm.classList.remove('active', 'exit-left');
    signupForm.classList.add('active');
    document.getElementById('auth-title').textContent = 'Join the Future';
    document.getElementById('auth-subtitle').textContent = 'Create your digital identity';
  }, 300);

  clearAllErrors();
  clearSuccessMessage();
}

function switchToLogin() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  signupForm.classList.add('exit-left');
  setTimeout(() => {
    signupForm.classList.remove('active', 'exit-left');
    loginForm.classList.add('active');
    document.getElementById('auth-title').textContent = 'Welcome Back';
    document.getElementById('auth-subtitle').textContent = 'Enter the digital realm';
  }, 300);

  clearAllErrors();
  clearSuccessMessage();
}

// ======================
// ERROR & SUCCESS HELPERS
// ======================
function showError(id, message) {
  const errorEl = document.getElementById(id);
  errorEl.textContent = message;
  errorEl.classList.add('show');
}

function clearAllErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });
}

function showSuccess(message) {
  const successEl = document.getElementById('success-message');
  successEl.textContent = message;
  successEl.classList.add('show');
}

function clearSuccessMessage() {
  const successEl = document.getElementById('success-message');
  successEl.textContent = '';
  successEl.classList.remove('show');
}

// ======================
// PASSWORD STRENGTH METER
// ======================
const passwordInput = document.getElementById('signup-password');
const strengthWrapper = document.getElementById('password-strength');
const strengthBar = document.getElementById('strength-bar');

passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;
  if (!value) {
    strengthWrapper.classList.remove('show');
    strengthBar.className = 'password-strength-bar';
    return;
  }

  strengthWrapper.classList.add('show');
  let strength = 0;
  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value) || /[^A-Za-z0-9]/.test(value)) strength++;

  strengthBar.className = 'password-strength-bar';
  if (strength === 1) strengthBar.classList.add('strength-weak');
  else if (strength === 2) strengthBar.classList.add('strength-medium');
  else if (strength >= 3) strengthBar.classList.add('strength-strong');
});

// ======================
// LOGIN VALIDATION
// ======================
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  clearAllErrors();
  clearSuccessMessage();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email.includes('@')) {
    showError('login-email-error', 'Please enter a valid email.');
    return;
  }
  if (password.length < 6) {
    showError('login-password-error', 'Password must be at least 6 characters.');
    return;
  }

  showSuccess('🚀 Login successful! Redirecting...');
  setTimeout(() => {
    window.location.href = 'dashboard.html'; // Demo redirect
  }, 2000);
});

// ======================
// SIGNUP VALIDATION
// ======================
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  clearAllErrors();
  clearSuccessMessage();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

  if (name.length < 2) {
    showError('signup-name-error', 'Name must be at least 2 characters.');
    return;
  }
  if (!email.includes('@')) {
    showError('signup-email-error', 'Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    showError('signup-password-error', 'Password must be at least 6 characters.');
    return;
  }
  if (password !== confirmPassword) {
    showError('signup-confirm-error', 'Passwords do not match.');
    return;
  }

  showSuccess('🌟 Signup successful! Welcome aboard.');
  setTimeout(() => switchToLogin(), 2000);
});
