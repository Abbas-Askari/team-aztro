const { getAllTrips, createTrip } = require("../controllers/tripController");

const router = require("express").Router();

router.get("/", getAllTrips);

router.post("/", createTrip);

// router.post("/", (req, res) => {
//   res.json("noice");
// });

module.exports = router;
