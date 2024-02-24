const { getAllUsers, createUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getAllUsers);
router.post("/", createUser);

module.exports = router;
