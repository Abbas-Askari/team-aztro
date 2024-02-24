const {
  getAllTrips,
  createTrip,
  getUserTrips,
  getTrip,
} = require("../controllers/tripController");
const { upload } = require("../middleware/storage");

const router = require("express").Router();

router.get("/", getAllTrips);
router.get("/agent/:agentID", getUserTrips);
router.get("/trip/:tripID", getTrip);
router.post("/", upload.array("images"), createTrip);

module.exports = router;
