const mongoose = require("mongoose");
const { string } = require("zod");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeline: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  price: { type: Number, required: true },
  agent: { type: mongoose.Types.ObjectId, ref: "User" },
  images: [{ type: String }],
  destination: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  source: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
