const Trip = require("../models/tripModel");
const { getValidAgent, getValidTrip } = require("../middleware/validate");
const z = require("zod");

const tripSchema = z.object({
  title: z.string().min(3, "title must be atleast 3 characters long"),
  description: z
    .string()
    .min(3, "description must be atleast 3 characters long"),
  timeline: z.array(z.string()),
  reviews: z.array(z.string()),
  price: z.number(),
  agent: z.string(),
  images: z.array(z.string()),
});

async function getAllTrips(req, res) {
  const trips = await Trip.find().exec();
  res.json({ trips });
}

async function createTrip(req, res) {
  //   const { email, name, password, isAgent } = req.body;
  console.log("body: ", req.body);
  console.log("files: ", req.files);
  const data = tripSchema.safeParse(req.body);
  if (data.success) {
    const validated = data.data;
    console.log({ validated });
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
  const trip = await Trip.findById(tripID).populate({ path: "reviews" }).exec();
  const trip2 = await Trip.findById(tripID).exec();
  console.log({ rev: trip.reviews, rev2: trip2.reviews });

  if (!trip) {
    return res.json({ error: "No Valid Trip Found" });
  }

  return res.json({ trip });
}

module.exports = { getAllTrips, createTrip, getUserTrips, getTrip };
