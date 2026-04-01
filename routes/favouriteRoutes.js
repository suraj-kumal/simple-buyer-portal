const router = require("express").Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favouriteController");
const { authMiddleware } = require("../middleware/authMiddleware");

//making sure middleware never touches controller
router.get("/", authMiddleware, getFavorites);
router.post("/:id", authMiddleware, addFavorite);
router.delete("/:id", authMiddleware, removeFavorite);

module.exports = router;
