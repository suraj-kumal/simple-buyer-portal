require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

const authRoutes = require("./routes/authRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/favourites", favouriteRoutes);
app.use("/api/v1/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
