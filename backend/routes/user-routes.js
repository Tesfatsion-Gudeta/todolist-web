const exporess = require("express");
const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");
const router = exporess.Router();

//login
router.post("/", loginUser);

//signup
router.post("/", signupUser);

//me
router.get("/:id", getUser);
