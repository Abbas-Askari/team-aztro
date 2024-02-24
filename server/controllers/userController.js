const User = require("../model/user");
const z = require("zod");

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  isAgent: z.boolean(),
});

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  res.json({ users });
}

async function createUser(req, res) {
  //   const { email, name, password, isAgent } = req.body;
  const data = userSchema.safeParse(req.body);
  console.log({ data });
}

module.exports = { getAllUsers, createUser };
