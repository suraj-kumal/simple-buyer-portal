const router = require("express").Router();
const {
  getAllProperties,
  getPropertyById,
} = require("../controllers/propertyController");

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

module.exports = router;
