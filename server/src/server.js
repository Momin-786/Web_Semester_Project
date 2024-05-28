import "dotenv/config";
import express from "express";
import connectDB from "./config/connectDB";
import errorHandler from "./error.middleware";
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am Root for GET");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
