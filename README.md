# Real Estate Buyer Portal - Auth & Favorites System

A full-stack web application for a real estate buyer portal with user authentication and favorites management. Built with Express.js backend and vanilla JavaScript frontend.




### Prerequisites

- Node.js 14+ and npm

### Installation

1. **Clone/Extract the project:**

```bash
git clone simple-buyer-portal
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create .env file** (already included):

```
PORT=8000
JWT_SECRET=your-secret-key-change-me-in-production
NODE_ENV=development
```

### Running the App

**Start the server:**

```bash
npm start
```

Server will run on `http://localhost:8000`

**Access the app:**

- Open `http://localhost:8000` in your browser
- You'll see the login/signup page

## Example User Flow

### Flow 1: Sign Up → Login → Browse → Favorite

1. **Sign Up**
   - Click "Create Account" section
   - Enter: Name, Email, Password (min 6 chars)
   - Click "Sign Up"
   - See success toast: "Account created!"

2. **Log In**
   - Enter your email and password
   - Click "Log In"
   - Redirected to dashboard

3. **Browse Properties**
   - Dashboard shows 5 sample properties
   - Each card displays:
     - Property name
     - Price in USD format
     - Location with pin emoji
     - Description
     - Heart icon (white/red based on favorited status)

4. **Add to Favorites**
   - Click the heart icon (🤍) on any property
   - See toast: "Added to favorites!"
   - Heart turns red (❤️)
   - Property appears in "My Favorites" section

5. **View My Favorites**
   - Scroll down to see "My Favorites" grid
   - Shows only your favorited properties
   - Each has a "Remove" button

6. **Remove from Favorites**
   - Click heart icon again or "Remove" button
   - See toast: "Removed from favorites"
   - Property disappears from favorites list

7. **Log Out**
   - Click "Log Out" button in header or sidebar
   - Redirected to login page
   - Token cleared from localStorage



## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register new user
  - Body: `{ name, email, password }`
  - Returns: `{ message: "User created successfully" }`

- `POST /api/v1/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user: { id, name, email, role } }`

### Properties

- `GET /api/v1/properties` - Get all properties
  - Returns: Array of properties with id, name, price, location, description

- `GET /api/v1/properties/:id` - Get single property
  - Returns: Property object

### Favorites (Protected - requires Bearer token)

- `GET /api/v1/favourites` - Get user's favorites
  - Header: `Authorization: Bearer <token>`
  - Returns: Array of favorites with id, userId, propertyId

- `POST /api/v1/favourites/:id` - Add property to favorites
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ message: "Added to favorites" }`

- `DELETE /api/v1/favourites/:id` - Remove property from favorites
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ message: "Removed from favorites" }`

## Database Schema

### users

```sql
id INTEGER PRIMARY KEY
name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
password TEXT NOT NULL (bcrypt hashed)
role TEXT DEFAULT 'buyer'
```

### properties

```sql
id INTEGER PRIMARY KEY
name TEXT NOT NULL
price REAL NOT NULL
location TEXT NOT NULL
description TEXT
```

### favourites

```sql
id INTEGER PRIMARY KEY
userId INTEGER NOT NULL (FK to users)
propertyId INTEGER NOT NULL (FK to properties)
UNIQUE(userId, propertyId) 
```

