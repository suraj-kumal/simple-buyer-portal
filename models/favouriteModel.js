const db = require("../database");

const getByUser = (userId, cb) => {
  db.all(`SELECT * FROM favourites WHERE userId = ?`, [userId], cb);
};

const add = (userId, propertyId, cb) => {
  db.run(
    `INSERT INTO favourites (userId, propertyId) VALUES (?, ?)`,
    [userId, propertyId],
    cb,
  );
};

const remove = (userId, propertyId, cb) => {
  db.run(
    `DELETE FROM favourites WHERE userId = ? AND propertyId = ?`,
    [userId, propertyId],
    cb,
  );
};

module.exports = { getByUser, add, remove };
