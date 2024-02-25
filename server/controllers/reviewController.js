const Review = require("../models/reviewModel");
const z = require("zod");
const Trip = require("../models/tripModel");

const reviewSchema = z.object({
  trip: z.string(),
  user: z.string(),
  title: z.string(),
  content: z.string(),
  rating: z.number(),
});

async function getAllReviews(req, res) {
  const reviews = await Review.find().exec();
  res.json({ reviews });
}

async function createReview(req, res) {
  req.body.user = req.user._id.toString();
  // const { tripID } = req.params;
  req.body.trip = req.params.tripID;

  console.log("body: ", req.body, "params: ", req.params);
  const data = reviewSchema.safeParse(req.body);

  if (data.success) {
    const validated = data.data;
    const review = new Review(validated);
    await review.save();
    await Trip.updateOne(
      { _id: req.body.trip },
      { $push: { reviews: review } },
      {}
    ).exec();

    res.json({ review });
  } else {
    const result = data.error;
    const errors = result.errors.map((error) => ({
      message: error.message,
      path: error.path[0],
    }));
    res.json({ errors });
  }
  console.log({ data });
}

async function getReviewsOfTrip(req, res) {
  const { tripID } = req.params;

  const reviews = await Review.find({ trip: tripID }).populate("user").exec();

  if (!reviews) {
    return res.json({
      error: "Trip not found!",
    });
  }
  return res.json({ reviews });
}

module.exports = { getAllReviews, createReview, getReviewsOfTrip };
