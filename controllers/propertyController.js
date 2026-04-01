const db = require("../database");

const getAllProperties = (req, res) => {
  db.all(
    "SELECT id, name, price, location, description FROM properties",
    (err, properties) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(properties);
    },
  );
};

const getPropertyById = (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM properties WHERE id = ?", [id], (err, property) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  });
};

module.exports = {
  getAllProperties,
  getPropertyById,
};
