const User = require("../models/userModel");

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  res.json({ users });
}

module.exports = { getAllUsers };
