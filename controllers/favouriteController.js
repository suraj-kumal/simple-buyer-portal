const Fav = require("../models/favouriteModel");
const db = require("../database");

const getFavorites = (req, res) => {
  Fav.getByUser(req.user.id, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows || []);
  });
};

const addFavorite = (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.id;

  // Verify property exists
  db.get(
    "SELECT id FROM properties WHERE id = ?",
    [propertyId],
    (err, property) => {
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      Fav.add(userId, propertyId, (err) => {
        if (err) {
          if (err.message.includes("UNIQUE constraint failed")) {
            return res
              .status(400)
              .json({ error: "Property already in favorites" });
          }
          return res.status(500).json({ error: "Failed to add favorite" });
        }
        res.status(201).json({ message: "Added to favorites" });
      });
    },
  );
};

const removeFavorite = (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.id;

  Fav.remove(userId, propertyId, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to remove favorite" });
    }
    res.json({ message: "Removed from favorites" });
  });
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
