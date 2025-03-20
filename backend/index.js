const express = require("express");
const app = express();
//for Cross-Origin Resource Sharing
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo-routes");
const userRoutes = require("./routes/user-routes");

require("dotenv").config();
const PORT = process.env.PORT || 5001;

connectDB();
//middlewares
app.use(express.json());
app.use(cors());
//app.use(authMiddleware); //to apply authtentication to all routes

//routes
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
