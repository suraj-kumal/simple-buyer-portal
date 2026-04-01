// Main Application Logic

let allProperties = [];
let allFavorites = [];

// Initialize app on page load
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  // Check auth status
  const isAuth = initAuth();
  const isDashboard = window.location.pathname.includes("dashboard.html");
  const isLogin =
    window.location.pathname.includes("login.html") ||
    window.location.pathname.includes("signup.html") ||
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/";

  // Redirect based on auth status
  if (isDashboard) {
    if (!isAuth) {
      window.location.href = "/login.html";
    } else {
      loadDashboard();
    }
  } else if (isLogin && isAuth) {
    window.location.href = "/dashboard.html";
  }
}

// Handle signup form submission
async function handleSignup(event) {
  event.preventDefault();

  // Clear previous errors
  ["name", "email", "password"].forEach((id) => clearFieldError(id));

  const name = document.getElementById("name")?.value?.trim();
  const email = document.getElementById("email")?.value?.trim();
  const password = document.getElementById("password")?.value;

  // Validate inputs
  if (!name) {
    showFieldError("name", "Name is required");
    return;
  }
  if (!email) {
    showFieldError("email", "Email is required");
    return;
  }
  if (!password || password.length < 6) {
    showFieldError("password", "Password must be at least 6 characters");
    return;
  }

  // Call API
  setButtonLoading("#signup-form button[type='submit']", true);
  const result = await apiSignup(name, email, password);
  setButtonLoading("#signup-form button[type='submit']", false);

  if (result.status === 201) {
    showToast("Account created! Please log in.", "success");
    document.getElementById("signup-form")?.reset();
  } else {
    const errorMsg = result.data?.error || "Signup failed. Try again.";
    if (errorMsg.includes("Email")) {
      showFieldError("email", errorMsg);
    } else {
      showToast(errorMsg, "error");
    }
  }
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();

  // Clear previous errors
  ["lemail", "lpassword"].forEach((id) => clearFieldError(id));

  const email = document.getElementById("lemail")?.value?.trim();
  const password = document.getElementById("lpassword")?.value;

  // Validate inputs
  if (!email) {
    showFieldError("lemail", "Email is required");
    return;
  }
  if (!password) {
    showFieldError("lpassword", "Password is required");
    return;
  }

  // Call API
  setButtonLoading("#login-form button[type='submit']", true);
  const result = await apiLogin(email, password);
  setButtonLoading("#login-form button[type='submit']", false);

  if (result.status === 200 && result.data.token) {
    // Store token and user info
    setAuthToken(result.data.token, result.data.user);
    showToast(`Welcome, ${result.data.user.name}!`, "success", 2000);

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 500);
  } else {
    const errorMsg = result.data?.error || "Login failed. Please try again.";
    showToast(errorMsg, "error");
  }
}

// Handle logout
function handleLogout() {
  clearAuth();
  window.location.href = "/";
}

// Load dashboard
async function loadDashboard() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "/";
    return;
  }

  // Display user profile
  renderProfile(user);

  // Load properties
  const propertiesResult = await apiGetProperties();
  if (propertiesResult.status === 200) {
    allProperties = propertiesResult.data;
  } else {
    showToast("Failed to load properties", "error");
    allProperties = [];
  }

  // Load favorites
  const favoritesResult = await apiGetFavorites();
  console.log("Favorites API Response:", favoritesResult);
  if (favoritesResult.status === 200) {
    allFavorites = Array.isArray(favoritesResult.data)
      ? favoritesResult.data
      : [];
  } else {
    allFavorites = [];
  }

  console.log("allFavorites data:", allFavorites);
  console.log("allProperties data:", allProperties);

  // Render UI
  renderProperties(allProperties, allFavorites);
  renderFavorites(allFavorites, allProperties);
}

// Handle toggle favorite
async function handleToggleFavorite(propertyId) {
  const isFavorited = allFavorites.some((f) => f.propertyId === propertyId);

  if (isFavorited) {
    await handleRemoveFavorite(propertyId);
  } else {
    await handleAddFavorite(propertyId);
  }
}

// Handle add favorite
async function handleAddFavorite(propertyId) {
  console.log("handleAddFavorite called for property:", propertyId);
  const result = await apiAddFavorite(propertyId);
  console.log("apiAddFavorite result:", result);

  if (result.status === 201) {
    // Refresh favorites
    const favoritesResult = await apiGetFavorites();
    console.log("Refreshed favorites after add:", favoritesResult);
    if (favoritesResult.status === 200) {
      allFavorites = Array.isArray(favoritesResult.data)
        ? favoritesResult.data
        : [];
    }
    console.log("Updated allFavorites:", allFavorites);
    renderProperties(allProperties, allFavorites);
    renderFavorites(allFavorites, allProperties);
    showToast("Added to favorites!", "success", 2000);
  } else {
    const errorMsg = result.data?.error || "Failed to add favorite";
    showToast(errorMsg, "error");
  }
}

// Handle remove favorite
async function handleRemoveFavorite(propertyId) {
  const result = await apiRemoveFavorite(propertyId);

  if (result.status === 200) {
    // Refresh favorites
    const favoritesResult = await apiGetFavorites();
    if (favoritesResult.status === 200) {
      allFavorites = Array.isArray(favoritesResult.data)
        ? favoritesResult.data
        : [];
    }
    renderProperties(allProperties, allFavorites);
    renderFavorites(allFavorites, allProperties);
    showToast("Removed from favorites", "success", 2000);
  } else {
    const errorMsg = result.data?.error || "Failed to remove favorite";
    showToast(errorMsg, "error");
  }
}
