// Auth state management
let currentUser = null;

// Initialize auth state on page load
function initAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    currentUser = JSON.parse(user);
    return true;
  }
  return false;
}

// Set auth token and user
function setAuthToken(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  currentUser = user;
}

// Get current user
function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Logout
function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  currentUser = null;
}

// Decode JWT to extract user info (without verification, only for display)
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}
