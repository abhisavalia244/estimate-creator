// Redirect script to ensure users go through the login page
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const expiry = localStorage.getItem('loginExpiry');
  const currentTime = new Date().getTime();
  
  // If not logged in or login expired, redirect to login page
  if (isLoggedIn !== 'true' || !expiry || currentTime > parseInt(expiry)) {
    window.location.href = 'login.html';
  }
}); 