const express = require("express");
const app = express();
//for Cross-Origin Resource Sharing
const cors = require("cors");
const connectDB = require("./config/db");
const todos = require("./routes/todo-routes");
const authMiddleware = require("./middlewares/auth-middleware");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();
//middlewares
app.use(express.json());
app.use(cors());
//app.use(authMiddleware); //to apply authtentication to all routes

//routes
app.use("/api/todos", todos);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
