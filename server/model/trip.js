const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeline: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  price: { type: number, required: true },
  agent: { type: mongoose.Types.ObjectId, ref: "Agent" },
  destination: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  source: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
