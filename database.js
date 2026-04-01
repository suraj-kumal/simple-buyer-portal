const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// create tables for storing
// serialize function make run query sequentially
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'buyer'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      location TEXT NOT NULL,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      propertyId INTEGER NOT NULL,
      UNIQUE(userId, propertyId),
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(propertyId) REFERENCES properties(id)
    )
  `);

  // Seed 5 properties if table is empty
  db.get("SELECT COUNT(*) as count FROM properties", (err, row) => {
    if (row && row.count === 0) {
      const properties = [
        [
          "Modern Downtown Apartment",
          450000,
          "Downtown",
          "2-bed luxury apartment with city views",
        ],
        [
          "Suburban Family Home",
          350000,
          "Suburbs",
          "4-bed house with garden and garage",
        ],
        [
          "Beachfront Condo",
          750000,
          "Beach",
          "3-bed oceanview condo with pool access",
        ],
        [
          "Investment Studio",
          180000,
          "Midtown",
          "Compact studio apartment, great for investors",
        ],
        [
          "Historic Townhouse",
          520000,
          "Old Town",
          "Renovated Victorian townhouse",
        ],
      ];

      const insertStmt = db.prepare(
        "INSERT INTO properties (name, price, location, description) VALUES (?, ?, ?, ?)",
      );
      properties.forEach((prop) => insertStmt.run(prop));
      insertStmt.finalize();
    }
  });
});

module.exports = db;
