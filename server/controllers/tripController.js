const Trip = require("../model/trip");
const User = require("../model/user");
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
  // destination: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
  // source: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
});

async function getAllTrips(req, res) {
  const trips = await Trip.find().exec();
  res.json({ trips });
}

async function createTrip(req, res) {
  //   const { email, name, password, isAgent } = req.body;
  console.log("body: ", req.body);
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

module.exports = { getAllTrips, createTrip };
