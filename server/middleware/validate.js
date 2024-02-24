const User = require("../models/userModel");
const Trip = require("../models/tripModel");
const mongoose = require("mongoose");

const getValidAgent = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const user = await User.findById(id);

  if (!user || !user.isAgent) {
    return null;
  }

  return user;
};

const getValidTrip = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const trip = await Trip.findById(id);

  if (!trip) {
    return null;
  }

  return trip;
};

module.exports = { getValidAgent, getValidTrip };
