const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET = "hireme";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  User.createUser(name, email, hash, function (err) {
    if (err) return res.status(400).json({ error: "User exists" });

    res.json({ message: "User created" });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, user) => {
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    //algorithm weak but fine
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      SECRET,
      { algorithm: "HS256" },
    );

    res.json({ token });
  });
};
module.exports = {
  signup,
  login,
};
