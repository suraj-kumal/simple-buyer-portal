const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

//frontend routes

app.get("/login", () => {});
app.get("/dashboard", () => {});
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`Server is Listening at ${PORT}`);
});
