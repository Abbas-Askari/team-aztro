const User = require("../models/userModel");
const z = require("zod");

const userSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long."),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
  isAgent: z.boolean(),
});

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  res.json({ users });
}

async function createUser(req, res) {
  //   const { email, name, password, isAgent } = req.body;
  console.log("body: ", req.body);
  const data = userSchema.safeParse(req.body);
  if (data.success) {
    const validated = data.data;
    const user = new User(validated);
    await user.save();
    res.json({ user });
  } else {
    const result = data.error;
    const errors = result.errors.map((error) => ({
      message: error.message,
      path: error.path[0],
    }));
    res.json({ errors });
  }
}

module.exports = { getAllUsers, createUser };
