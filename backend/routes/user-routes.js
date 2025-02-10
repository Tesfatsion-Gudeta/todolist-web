const exporess = require("express");
const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth-middleware");
const router = exporess.Router();

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

//me
router.get("/me", authMiddleware, getUser);

module.exports = router;
