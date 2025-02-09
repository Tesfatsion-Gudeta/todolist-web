const express = require("express");
const app = express();
//for Cross-Origin Resource Sharing
const cors = require("cors");
const connectDB = require("./config/db");
const todos = require("../backend/routes/todos");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();
//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/todos", todos);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
