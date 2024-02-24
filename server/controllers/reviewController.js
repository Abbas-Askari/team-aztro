const Review = require("../models/reviewModel");
const z = require("zod");

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
  req.body.trip = req.params.id;

  console.log("body: ", req.body);
  const data = reviewSchema.safeParse(req.body);

  const { tripId } = req.params;

  if (data.success) {
    const validated = data.data;
    const review = new Review(validated);
    await review.save();
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

module.exports = { getAllReviews, createReview };
