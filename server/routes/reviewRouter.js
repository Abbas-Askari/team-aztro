const { getAllReviews, createReview } = require("../controllers/reviewController");

const router = require("express").Router();

router.get("/", getAllReviews);
router.post("/", createReview);

module.exports = router;
