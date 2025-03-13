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
    const { title } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await Todo.create({ title, userId });
    res.json({ message: "todo successfully created.", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while creating todo", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {};

exports.deleteTodo = async (req, res) => {};

exports.getTodo = async (req, res) => {};
