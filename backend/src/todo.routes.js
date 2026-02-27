import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTodo,
} from "./todo.controller.js";

const router = express.Router();

router.get("/all", getAllTodo);
router.post("/add", addTodo);
router.patch("/edit/:id", editTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
