const Fav = require("../models/favouriteModel");

const getFavorites = (req, res) => {
  Fav.getByUser(req.user.id, (err, rows) => {
    res.json(rows);
  });
};

const addFavorite = (req, res) => {
  Fav.add(req.user.id, req.params.id, () => {
    res.json({ message: "Added" });
  });
};

const removeFavorite = (req, res) => {
  Fav.remove(req.user.id, req.params.id, () => {
    res.json({ message: "Removed" });
  });
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
