const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

//get all todos
router.get("/", getAllTodos);

//post todo
router.post("/", postTodo);

//put todo
router.put("/:id", updateTodo);

//delete todo
router.delete("/:id", deleteTodo);

module.exports = todos;
