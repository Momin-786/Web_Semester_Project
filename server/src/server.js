import "dotenv/config";
import express from "express";
import connectDB from "./config/connectDB.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import weatherRouter from "./routes/weatherReport.js";
import userRouter from "./routes/user.js";
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am Root for GET");
});

app.use("/weather-reports", weatherRouter )
app.use("/users", userRouter )

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
