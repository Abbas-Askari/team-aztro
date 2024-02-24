const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  name: { type: String, required: true },
  activity: { type: String },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
