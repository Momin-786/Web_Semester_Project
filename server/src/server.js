import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am Root for GET");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
