const Trip = require("../models/tripModel");
const { getValidAgent, getValidTrip } = require("../middleware/validate");
const z = require("zod");
const Event = require("../models/eventModel");

async function createBooking(req, res) {
  const { tripID } = req.params;
  const user = req.user;

  // const trip = await getValidTrip(tripID);
  const trip = await Trip.findById(tripID)
    .populate({ path: "reviews" })
    .populate({ path: "timeline" })
    .populate({ path: "agent" })
    .exec();

  for (const review of trip.reviews) {
    console.log(review);
    const r = await review.populate("user");
  }

  if (!trip) {
    return res.json({ error: "No Valid Trip Found" });
  }

  return res.json({ trip });
}

module.exports = { getAllTrips, createTrip, getUserTrips, createBooking };
