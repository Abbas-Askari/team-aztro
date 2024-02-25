const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  trip: { type: mongoose.Types.ObjectId, ref: "Trip", required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  extras: [
    {
      price: Number,
      name: String,
    },
  ],
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
