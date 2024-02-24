const {
  getAllUsers,
  createUser,
  login,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
