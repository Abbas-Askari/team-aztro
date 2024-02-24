const { getAllTrips, createTrip, getUserTrips, getTrip } = require("../controllers/tripController");

const router = require("express").Router();

router.get("/", getAllTrips);
router.get("/agent/:agentID", getUserTrips);
router.get("/trip/:tripID", getTrip);
router.post("/", createTrip);


module.exports = router;
