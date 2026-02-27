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
router.patch("/edit", editTodo);
router.delete("/delete", deleteTodo);

export default router;
