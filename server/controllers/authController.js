const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const z = require("zod");

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
});

const signupSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long."),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long."),
  isAgent: z.boolean(),
});

async function signup(req, res) {
  const data = signupSchema.safeParse(req.body);
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

async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (parsed.success) {
    const data = parsed.data;
    const user = await User.findOne({ email: data.email }).exec();

    if (!user) {
      const errors = [
        {
          path: "email",
          message: "Cannot find a user with the give email",
        },
      ];
      return res.json({ errors });
    }

    if (data.password !== user.password) {
      const errors = [
        {
          path: "password",
          message: "Wrong password!",
        },
      ];
      return res.json({ errors });
    }

    return jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      (error, token) => {
        if (error) {
          return res.json({
            errors: [
              {
                path: "custom",
                message: "Cannot login!",
              },
            ],
          });
        }
        res.json({
          token,
          user,
        });
      }
    );
  } else {
    const result = parsed.error;
    const errors = result.errors.map((error) => ({
      message: error.message,
      path: error.path[0],
    }));
    res.json({ errors });
  }
}


module.exports = { login, signup }