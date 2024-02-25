const Trip = require("../models/tripModel");
const { getValidAgent, getValidTrip } = require("../middleware/validate");
const z = require("zod");
const Event = require("../models/eventModel");
const Booking = require("../models/bookingModel");

const tripSchema = z.object({
  title: z.string().min(3, "title must be atleast 3 characters long"),
  description: z
    .string()
    .min(3, "description must be atleast 3 characters long"),
  timeline: z.array(
    z.object({
      name: z.string().min(3),
      time: z.string(),
      description: z.string().min(10),
    })
  ),
  reviews: z.array(z.string()),
  price: z.number(),
  agent: z.string(),
  images: z.array(z.string()),
  amenities: z.array(z.string()),
});

async function getAllTrips(req, res) {
  const trips = await Trip.find().populate({ path: "reviews" }).exec();
  res.json({
    trips: trips.map((trip) => ({
      ...trip.toJSON(),
      rating:
        trip.reviews.reduce((acc, { rating: v }) => acc + v, 0) /
        trip.reviews.length,
    })),
  });
}

async function createTrip(req, res) {
  //   const { email, name, password, isAgent } = req.body;
  console.log("body: ", req.body);
  console.log("files: ", req.files);
  const data = tripSchema.safeParse(req.body);
  if (data.success) {
    const validated = data.data;
    console.log({ validated });
    if (validated.timeline.length > 0) {
      // for (let i in validated.timeline) {
      //   i = +i;
      //   validated.timeline[i] = new Event({validated.timeline[i]});
      //   await validated.sa
      // }
      validated.timeline = await Event.insertMany(validated.timeline);
    }
    const trip = new Trip(validated);
    await trip.save();
    res.json({ trip });
  } else {
    const result = data.error;
    const errors = result.errors.map((error) => ({
      message: error.message,
      path: error.path[0],
    }));
    res.json({ errors });
  }
}

async function getUserTrips(req, res) {
  const { agentID } = req.params;

  const agent = await getValidAgent(agentID);

  if (!agent) {
    return res.json({ error: "No Valid Agent Found" });
  }

  const trips = await Trip.find({ agent: agent._id }).exec();
  return res.json({ trips });
}

async function getTrip(req, res) {
  const { tripID } = req.params;

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

async function createBooking(req, res) {
  const { tripID } = req.params;
  const user = req.user;
  const { extras } = req.body;

  const booking = new Booking({
    trip: tripID,
    user: user,
    extras,
  });

  await booking.save();
  console.log({ booking, body: req.body });

  return res.json({ booking });
}

async function getTripBookings(req, res) {
  const user = req.user;
  const bookings = await Booking.find({
    user: user,
  }).populate(["trip"]);
  console.log({ bookings });

  return res.json({ bookings });
}

module.exports = {
  getAllTrips,
  createTrip,
  getUserTrips,
  getTrip,
  createBooking,
  getTripBookings,
};
