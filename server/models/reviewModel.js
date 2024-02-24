const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  agent: { type: mongoose.Types.ObjectId, ref: "Agent" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  rating: {type: Number, required: true}
});

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review