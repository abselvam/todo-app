import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./todo.routes.js";
import { connectDB } from "./db.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log("Listenint on port:", PORT);
  connectDB();
});
