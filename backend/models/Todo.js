const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: string,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
