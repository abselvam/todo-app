import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./todo.routes.js";
import { connectDB } from "./db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log("Listenint on port:", PORT);
  connectDB();
});
