import express, { json } from "express";
import authRouter from "./routes/auth.route.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import { hashPassword } from "./utils/auth.utils.js";
import messageRoute from "./routes/message.route.js";
import { app, io, server } from "./utils/socket.js";

app.use(express.json({limit: "10mb"}));

app.use(cors());
dotenv.config();

const MONGODB_URI = process.env.MONGODB_DATABASE;
mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => {
    console.log("Connected to mongo!");
  })
  .catch((err) => console.log("Error: ", err));

app.get("/", async (req, res) => {
  try {
    const data = await User.find();

    console.log("*Raw data from DB:", data); // Logs everything to console
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data: ", err });
  }
});
console.log("hello");

app.use("/api/auth", authRouter);

app.use("/api/message", messageRoute);

server.listen(5000, "0.0.0.0", () => {
  console.log("listening!");
});
