import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTodo,
} from "./todo.controller.js";
import Todo from "./model.js";

const router = express.Router();

router.get("/all", getAllTodo);
router.post("/add", addTodo);
router.patch("/edit/:id", editTodo);
router.delete("/delete/:id", deleteTodo);
// for seeding bulk data through postman
router.post("/seed", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).json({ message: "Todos seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Seed failed" });
  }
});

export default router;
