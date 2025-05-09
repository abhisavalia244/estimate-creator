// User database with usernames and passwords
const users = {
  "admin": "admin@123",
  "James": "James@123",
  "Pat": "Pat@123",
  "Arun": "Arun@123",
  "Dallas": "Dallas@123",
  "Shauna": "Shauna@123"
};

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const expiry = localStorage.getItem('loginExpiry');
  const currentTime = new Date().getTime();
  
  // If logged in and not expired, redirect to the main page
  if (isLoggedIn === 'true' && expiry && currentTime < parseInt(expiry)) {
    window.location.href = 'index.html';
  }
  
  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Authenticate user
    if (users[username] && users[username] === password) {
      // Set login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // Set expiry (24 hours from now)
      const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('loginExpiry', expiryTime.toString());
      
      // Redirect to the main page
      window.location.href = 'index.html';
    } else {
      // Show error message
      errorMessage.style.display = 'block';
      // Clear password field
      document.getElementById('password').value = '';
    }
  });
}); 