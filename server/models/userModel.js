const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, min: 6 },
  isAgent: { type: Boolean },
  gender: {type: String},
  phone: {type: String},
  location: {type: String},
  dob: {type: Date}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
