// UI Management and DOM Updates

// Show toast notification
function showToast(message, type = "error", duration = 4000) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(closeToast, duration);
}

function closeToast() {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.classList.remove("show");
  }
}

// Show error on input field
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);

  if (field) {
    field.classList.add("error");
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("show");
  }
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);

  if (field) {
    field.classList.remove("error");
  }
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  }
}

// Load and render properties
function renderProperties(properties, favorites = []) {
  const grid = document.getElementById("properties-grid");
  if (!grid) return;

  if (!properties || properties.length === 0) {
    grid.innerHTML =
      '<div class="empty-state"><p>No properties available.</p></div>';
    return;
  }

  const favoriteIds = favorites.map((f) => f.propertyId);

  grid.innerHTML = properties
    .map(
      (property) => `
    <div class="card">
      <div class="card-header">
        <h3>${escapeHtml(property.name)}</h3>
        <button 
          class="favorite-btn ${favoriteIds.includes(property.id) ? "favorited" : ""}" 
          onclick="handleToggleFavorite(${property.id})"
          id="fav-btn-${property.id}"
          title="${favoriteIds.includes(property.id) ? "Remove from favorites" : "Add to favorites"}"
        >
          ${favoriteIds.includes(property.id) ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="card-price">$${formatPrice(property.price)}</div>
      <div class="card-location">
        📍 ${escapeHtml(property.location)}
      </div>
      <div class="card-description">
        ${escapeHtml(property.description || "")}
      </div>
    </div>
  `,
    )
    .join("");
}

// Load and render favorites
function renderFavorites(favorites, properties = []) {
  const grid = document.getElementById("favorites-grid");

  console.log("renderFavorites called with:", { favorites, properties, grid });

  if (!grid) {
    console.error("favorites-grid element not found!");
    return;
  }

  if (!favorites || favorites.length === 0) {
    grid.innerHTML =
      '<div class="empty-state"><p>No favorites yet. Add one from the properties above!</p></div>';
    return;
  }

  // ✅ Normalize + remove duplicates
  const uniqueFavorites = [
    ...new Map(
      favorites.map((f) => [
        Number(f.propertyId),
        {
          ...f,
          propertyId: Number(f.propertyId),
        },
      ]),
    ).values(),
  ];

  // ✅ Match favorites to properties safely
  const favoriteProperties = uniqueFavorites
    .map((fav) => {
      const prop = properties.find((p) => Number(p.id) === fav.propertyId);

      if (!prop) {
        console.warn("No matching property for favorite:", fav);
      }

      return prop;
    })
    .filter(Boolean);

  console.log("Favorite properties to render:", favoriteProperties);

  if (favoriteProperties.length === 0) {
    grid.innerHTML =
      '<div class="empty-state"><p>No matching favorite properties found.</p></div>';
    return;
  }

  // ✅ Render UI
  grid.innerHTML = favoriteProperties
    .map(
      (property) => `
    <div class="card">
      <div class="card-header">
        <h3>${escapeHtml(property.name)}</h3>
        <button 
          class="favorite-btn favorited" 
          onclick="handleToggleFavorite(${property.id})"
          id="fav-btn-${property.id}"
          title="Remove from favorites"
        >
          ❤️
        </button>
      </div>

      <div class="card-price">$${formatPrice(property.price)}</div>

      <div class="card-location">
        📍 ${escapeHtml(property.location)}
      </div>

      <div class="card-description">
        ${escapeHtml(property.description || "")}
      </div>

      <div class="card-actions">
        <button 
          class="btn-danger btn-icon" 
          onclick="handleRemoveFavorite(${property.id})"
        >
          Remove
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

// Update profile card
function renderProfile(user) {
  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");
  const roleEl = document.getElementById("profile-role");
  const userNameEl = document.getElementById("user-name");

  if (nameEl) nameEl.textContent = escapeHtml(user.name || "User");
  if (emailEl) emailEl.textContent = escapeHtml(user.email || "—");
  if (roleEl) roleEl.textContent = (user.role || "buyer").toUpperCase();
  if (userNameEl) userNameEl.textContent = escapeHtml(user.name || "User");
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("$", "");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Set button loading state
function setButtonLoading(buttonSelector, isLoading) {
  const button = document.querySelector(buttonSelector);
  if (!button) return;

  if (isLoading) {
    button.disabled = true;
    button.classList.add("loading");
    button.dataset.originalText = button.textContent;
    button.innerHTML = '<span class="spinner"></span> Loading...';
  } else {
    button.disabled = false;
    button.classList.remove("loading");
    button.textContent = button.dataset.originalText || "Load";
  }
}

// Hide/show sections
function setPageMode(mode) {
  // mode: "login" or "dashboard"
  const isLoginPage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/";
  const isDashboardPage = window.location.pathname.includes("dashboard.html");

  if (isLoginPage && mode === "dashboard") {
    window.location.href = "/dashboard.html";
  } else if (isDashboardPage && mode === "login") {
    window.location.href = "/";
  }
}
