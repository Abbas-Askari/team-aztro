// softec@2024

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/userRouter");
// const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/users", userRouter);

app.listen(3000);
console.log("connected and listening");
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {})
  .catch((err) => console.log(err));
