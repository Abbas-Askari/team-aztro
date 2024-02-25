const {
  createReview,
  getReviewsOfTrip,
} = require("../controllers/reviewController");
const {
  getAllTrips,
  createTrip,
  getUserTrips,
  getTrip,
  createBooking,
  getTripBookings,
} = require("../controllers/tripController");
const requireAuth = require("../middleware/requireAuth");
const { upload } = require("../middleware/storage");

const router = require("express").Router();

router.get("/", getAllTrips);
router.get("/agent/:agentID", getUserTrips);
router.get("/trip/:tripID", getTrip);
router.post("/trip/:tripID/reviews", requireAuth, createReview);
router.post("/trip/:tripID/bookings", requireAuth, createBooking);
router.get("/bookings", requireAuth, getTripBookings);
// router.get("/trip/:tripID/reviews", getReviewsOfTrip);
router.post(
  "/",
  // upload.array("images"),
  createTrip
);

module.exports = router;
