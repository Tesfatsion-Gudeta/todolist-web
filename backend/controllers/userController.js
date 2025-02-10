const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "invalid email or password." });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(400).json({ message: "invalid email or password." });

    //maybe provide expiration time for the token
    const token = jwt.sign({ userId: user._id }, jwtPrivateKey);
    res.json({ token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "an error occured during login", error: error.message });
  }
};

exports.signupUser = (req, res) => {};

exports.getUser = (req, res) => {};

//todo: implement refreshtoken
