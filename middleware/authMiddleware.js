const jwt = require("jsonwebtoken");
const SECRET = "hireme";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    //checking algorithms is crucial
    // jwt can be exploited
    req.user = jwt.verify(token, SECRET, {
      algorithms: ["HS256"],
    });
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authMiddleware };
