import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api", todoRoutes);

app.listen(() => {
  console.log("Listenint on port:", process.env.PORT);
});
