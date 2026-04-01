const db = require("../database");

// Create a new user
const createUser = (name, email, password, cb) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  const params = [name, email, password, "buyer"];

  db.run(query, params, cb);
};

// Find user by email
const findUserByEmail = (email, cb) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.get(query, [email], cb);
};

// Export functions
module.exports = {
  createUser,
  findUserByEmail,
};
