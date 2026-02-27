import Todo from "./model.js";

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return res.status(200).json({ message: "There are no todos", todos: [] });
    }
    return res.status(200).json({ message: "All todos:", todos });
  } catch (error) {
    console.error("Error in getAllTodo controller", error);
    return res
      .status(500)
      .json({ message: "internal error at getAllTodo controller" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !status) {
      return res.status(400).json({ message: "title and status are required" });
    }
    const newTodo = await new Todo({
      title,
      description,
      status,
    }).save();

    return res.status(201).json({
      message: "New todo created:",
      _id: newTodo._id,
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
    });
  } catch (error) {
    console.error("Error in addTodo controller", error);
    return res
      .status(500)
      .json({ message: "internal error at addTodo controller" });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!title && !description && !status) {
      return res.status(400).json({ message: "Pass atleast 1 field" });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;

    const newTodo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return res
      .status(201)
      .json({ message: "todo updated successfully", todo: newTodo });
  } catch (error) {
    console.error("Error in editTodo controller", error);
    return res
      .status(500)
      .json({ message: "internal error at editTodo controller" });
  }
};

export const deleteTodo = async (req, res) => {};
