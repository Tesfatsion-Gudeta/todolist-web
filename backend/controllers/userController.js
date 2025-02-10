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

exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //maybe add expiration for the token
    const token = jwt.sign({ userId: newUser._id }, jwtPrivateKey);
    res.status(201).json({
      token,
      message: "user succesfully registered .",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured during sign up.",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//todo: implement refreshtoken
