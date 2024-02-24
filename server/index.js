// softec@2024

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const userRouter = require("./routes/userRouter");
const tripRouter = require("./routes/tripRouter");
const reviewRouter = require("./routes/reviewRouter");
const authRouter = require("./routes/authRouter");
const imageRouter = require("./routes/imageRouter");
// const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/trips", tripRouter);
app.use("/reviews", reviewRouter);
app.use("/images", imageRouter);
app.use(express.static("images"));

app.listen(3000);
console.log("listening!");
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => console.log(err));
