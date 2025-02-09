const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("mongodb connected sucessfully.");
    })
    .catch((error) => {
      console.error("mongodb connection error: ", error);
    });
};

module.exports = connectDB;
