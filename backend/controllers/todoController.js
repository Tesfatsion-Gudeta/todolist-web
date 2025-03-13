const mongoose = require("mongoose");
const Todo = require("../models/Todo");
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    // if (todos.length === 0) return res.json({ message: "no todos found" });
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};

exports.postTodo = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await Todo.create({ title, isCompleted, userId });
    res.json({ message: "todo successfully created.", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while creating todo", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, isCompleted } = req.body;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true, runValidators: true }
    );
    if (!todo) res.status(404).json({ message: "Todo not found" });
    res.json({ message: "todo updated successfully", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while updating todo", error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {};

exports.getTodo = async (req, res) => {};
