// softec@2024

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const agentRouter = require("./routes/agentRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/users", agentRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(3000);
    console.log("connected and listening");
  })
  .catch((err) => console.log(err));
