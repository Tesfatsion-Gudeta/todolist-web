const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  postTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/auth-middleware");

//get all todos
router.get("/", authMiddleware, getAllTodos);

//get todo
router.get("/", authMiddleware, getTodo);

//post todo
router.post("/", authMiddleware, postTodo);

//put todo
router.put("/:id", authMiddleware, updateTodo);

//delete todo
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
