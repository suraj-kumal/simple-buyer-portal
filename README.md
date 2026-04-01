# Real Estate Buyer Portal - Auth & Favorites System

A full-stack web application for a real estate buyer portal with user authentication and favorites management. Built with Express.js backend and vanilla JavaScript frontend.

## Features

✅ **User Authentication**

- Email & password registration with validation
- Secure login with JWT tokens
- Password hashing with bcryptjs

✅ **Property Management**

- Browse available properties with details (price, location, description)
- RESTful API endpoints for property data

✅ **Favorites System**

- Add/remove properties to personal favorites list
- User-specific favorites (only see your own)
- Visual feedback (heart icon) for favorited properties
- Duplicate prevention enforced at database level

✅ **User Dashboard**

- View profile (name, email, role)
- Browse all properties
- Manage personal favorites
- Responsive design with modern UI

✅ **Backend Security**

- Input validation (email format, password length)
- JWT token-based authentication
- Bearer token middleware
- Database constraints (unique email, user-property favorites)
- XSS protection via HTML escaping

## Tech Stack

**Backend:**

- Node.js + Express.js
- SQLite3 for data persistence
- JWT for authentication
- bcryptjs for password hashing
- CORS middleware for cross-origin requests

**Frontend:**

- Vanilla JavaScript (modular structure)
- Semantic HTML5
- Modern CSS3 (responsive grid layout)
- Toast notifications for user feedback

**Database:**

- SQLite3 with 3 tables: users, properties, favourites

## Project Structure

```
├── server.js                    # Express server entry point
├── database.js                  # SQLite database setup & seeding
├── package.json                 # Dependencies
├── .env                         # Environment variables
│
├── controllers/
│   ├── authController.js        # Signup/Login logic
│   ├── propertyController.js    # Property CRUD endpoints
│   └── favouriteController.js   # Favorites CRUD endpoints
│
├── middleware/
│   └── authMiddleware.js        # JWT verification middleware
│
├── models/
│   ├── userModel.js             # User DB queries
│   ├── favouriteModel.js        # Favorites DB queries
│   └── propertyModel.js         # Properties DB queries (via controller)
│
├── routes/
│   ├── authRoutes.js            # /api/v1/auth endpoints
│   ├── propertyRoutes.js        # /api/v1/properties endpoints
│   └── favouriteRoutes.js       # /api/v1/favourites endpoints
│
└── public/                      # Frontend files
    ├── index.html               # Login/Signup page
    ├── dashboard.html           # Main app page
    ├── styles.css               # Responsive styling
    ├── api.js                   # API fetch wrapper
    ├── auth.js                  # Token/auth state mgmt
    ├── ui.js                    # DOM updates & rendering
    └── app.js                   # Main app logic
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- A modern web browser

### Installation

1. **Clone/Extract the project:**

```bash
cd c:\Users\ACER\Desktop\techkraft\ assignment
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

### Flow 2: Error Handling

**Duplicate Signup:**

- Try signing up with existing email
- See error: "Email already registered"

**Invalid Password:**

- Try signup with <6 char password
- See error: "Password must be at least 6 characters"

**Invalid Credentials:**

- Try login with wrong password
- See error: "Invalid credentials"

**Duplicate Favorite:**

- Try adding same property twice
- See error: "Property already in favorites"

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
UNIQUE(userId, propertyId) -- Prevents duplicates
```

## Security Features

1. **Password Security**
   - Passwords hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text
   - Compared securely on login

2. **JWT Authentication**
   - Tokens include user id, name, role
   - Verified on protected endpoints
   - Bearer token prefix support
   - Algorithm check (HS256 only)

3. **Input Validation**
   - Email format validation
   - Password minimum length (6 chars)
   - Name required validation
   - Property existence verification

4. **Database Constraints**
   - Unique email enforcement
   - Unique user-property favorite combination
   - Foreign key relationships

5. **XSS Protection**
   - HTML escaping in frontend
   - User input sanitized before display

## Sample Test Data

**Seeded Properties (inserted on first run):**

1. Modern Downtown Apartment - $450,000 - Downtown
2. Suburban Family Home - $350,000 - Suburbs
3. Beachfront Condo - $750,000 - Beach
4. Investment Studio - $180,000 - Midtown
5. Historic Townhouse - $520,000 - Old Town

## Frontend Architecture

The frontend is organized into 4 modular files:

- **api.js** - All fetch calls (signup, login, properties, favorites)
- **auth.js** - Token management, auth state, user persistence
- **ui.js** - DOM updates, rendering, toast notifications
- **app.js** - Main logic, event handlers, page routing

## Troubleshooting

**Port 8000 already in use:**

```bash
# Change port in .env file or
lsof -i :8000  # Find process
kill -9 <PID>  # Kill process
```

**"No authorization token provided":**

- Ensure you're logged in
- Check localStorage.token in browser DevTools
- Token might be expired

**Properties not showing:**

- Check database.sqlite was created: `ls database.sqlite`
- Verify API endpoint returns data: `curl http://localhost:8000/api/v1/properties`

**CORS errors:**

- Verify backend server is running
- Check API_BASE URL in api.js matches your setup

## Future Enhancements

- [ ] Pagination for properties list
- [ ] Property search & filtering
- [ ] Property images/gallery
- [ ] User profile editing
- [ ] Password reset flow
- [ ] Email verification
- [ ] Rate limiting on auth endpoints
- [ ] Refresh token mechanism
- [ ] Unit & integration tests
- [ ] Docker containerization

## License

ISC

## Author

TechKraft Assignment - Junior Full-Stack Engineer

---

**Questions or Issues?** Review the code comments or check browser console (F12) for error messages.
