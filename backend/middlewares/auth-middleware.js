const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "no token provided, authorization denied." });
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;
