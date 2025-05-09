// User database with usernames and passwords
// In a production environment, this would be server-side authentication
const users = {
  "admin": "admin@123",
  "James": "James@123",
  "Pat": "Pat@123",
  "Arun": "Arun@123",
  "Dallas": "Dallas@123",
  "Shauna": "Shauna@123",
  "Abhi": "Abhi@123"
};

// User initials mapping
const userInitials = {
  "admin": "ADMIN",
  "James": "JM",
  "Pat": "PL",
  "Arun": "AL",
  "Dallas": "DG",
  "Shauna": "SC",
  "Abhi": "AS"
};

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginButton = document.querySelector('#login-form button');
  
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const expiry = localStorage.getItem('loginExpiry');
  const currentTime = new Date().getTime();
  
  // If logged in and not expired, redirect to the main page
  if (isLoggedIn === 'true' && expiry && currentTime < parseInt(expiry)) {
    window.location.href = 'index.html';
    return;
  }
  
  // Focus username field by default for better UX
  usernameInput.focus();
  
  // Input validation
  const validateInputs = () => {
    let isValid = true;
    
    // Reset previous error states
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');
    errorMessage.style.display = 'none';
    
    // Check username
    if (!usernameInput.value.trim()) {
      usernameInput.classList.add('error');
      isValid = false;
    }
    
    // Check password
    if (!passwordInput.value.trim()) {
      passwordInput.classList.add('error');
      isValid = false;
    }
    
    if (!isValid) {
      errorMessage.textContent = 'Please enter both username and password.';
      errorMessage.style.display = 'block';
    }
    
    return isValid;
  };
  
  // Add input event listeners for real-time validation
  usernameInput.addEventListener('input', () => {
    if (usernameInput.value.trim()) {
      usernameInput.classList.remove('error');
      if (passwordInput.value.trim()) {
        errorMessage.style.display = 'none';
      }
    }
  });
  
  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.trim()) {
      passwordInput.classList.remove('error');
      if (usernameInput.value.trim()) {
        errorMessage.style.display = 'none';
      }
    }
  });
  
  // Allow login on Enter key from password field
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      loginForm.dispatchEvent(new Event('submit'));
    }
  });
  
  // Handle login form submission
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Validate inputs before proceeding
    if (!validateInputs()) {
      return;
    }
    
    // Show loading state
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Simulate network delay (remove in production)
    setTimeout(() => {
      // Authenticate user
      if (users[username] && users[username] === password) {
        // Set login status in localStorage
        try {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          
          // Store user's initials
          if (userInitials[username]) {
            localStorage.setItem('userInitials', userInitials[username]);
          }
          
          // Set expiry (24 hours from now)
          const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
          localStorage.setItem('loginExpiry', expiryTime.toString());
          
          // Redirect to the main page
          window.location.href = 'index.html';
        } catch (e) {
          // Handle localStorage errors (e.g., private browsing mode)
          errorMessage.textContent = 'Unable to store login data. Please ensure cookies are enabled.';
          errorMessage.style.display = 'block';
          console.error('localStorage error:', e);
          resetLoginButton();
        }
      } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        errorMessage.style.display = 'block';
        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();
        resetLoginButton();
      }
    }, 500);
  });
  
  function resetLoginButton() {
    loginButton.disabled = false;
    loginButton.textContent = 'Login';
  }
}); 