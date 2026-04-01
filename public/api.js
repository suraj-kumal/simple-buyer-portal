// API Configuration
const API_BASE = "http://localhost:8000/api/v1";

// Get auth token
function getAuthToken() {
  return localStorage.getItem("token");
}

// Auth API calls
async function apiSignup(name, email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return { status: response.status, data: await response.json() };
  } catch (error) {
    return { status: 0, data: { error: error.message } };
  }
}

async function apiLogin(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return { status: response.status, data: await response.json() };
  } catch (error) {
    return { status: 0, data: { error: error.message } };
  }
}

// Property API calls
async function apiGetProperties() {
  try {
    const response = await fetch(`${API_BASE}/properties`);
    return { status: response.status, data: await response.json() };
  } catch (error) {
    return { status: 0, data: { error: error.message } };
  }
}

// Favorites API calls
async function apiGetFavorites() {
  try {
    const token = getAuthToken();
    console.log("Getting favorites with token:", token ? "present" : "missing");
    const response = await fetch(`${API_BASE}/favourites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(
      "GET /favourites response - Status:",
      response.status,
      "Data:",
      data,
    );
    return { status: response.status, data };
  } catch (error) {
    console.error("GET /favourites error:", error);
    return { status: 0, data: { error: error.message } };
  }
}

async function apiAddFavorite(propertyId) {
  try {
    const token = getAuthToken();
    console.log(
      "Adding favorite for propertyId:",
      propertyId,
      "with token:",
      token ? "present" : "missing",
    );
    const response = await fetch(`${API_BASE}/favourites/${propertyId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(
      "POST /favourites/:id response - Status:",
      response.status,
      "Data:",
      data,
    );
    return { status: response.status, data };
  } catch (error) {
    console.error("POST /favourites/:id error:", error);
    return { status: 0, data: { error: error.message } };
  }
}

async function apiRemoveFavorite(propertyId) {
  try {
    const token = getAuthToken();
    console.log("Removing favorite for propertyId:", propertyId);
    const response = await fetch(`${API_BASE}/favourites/${propertyId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(
      "DELETE /favourites/:id response - Status:",
      response.status,
      "Data:",
      data,
    );
    return { status: response.status, data };
  } catch (error) {
    console.error("DELETE /favourites/:id error:", error);
    return { status: 0, data: { error: error.message } };
  }
}
