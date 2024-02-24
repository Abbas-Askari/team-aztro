const { getAllTrips, createTrip } = require("../controllers/tripController");

const router = require("express").Router();

router.get("/", getAllTrips);

router.post("/", createTrip);

module.exports = router;
