const { signup, login } = require("../controllers/authController");

const router = require("express").Router();

router.get("/signup", signup);
router.get("/login", login);

module.exports = router;
