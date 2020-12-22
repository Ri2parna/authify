const User = require("../models/User");
const jwt = require("jsonwebtoken");
// error handler function
const handleErrors = (err) => {
  // validation errors
  let error = { email: "", password: "" };
  // if (err.code === 11000) {
  //  error.email = "Email already exists";
  //  return error;
  // }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
    return error;
  }
  return "error in the handle error function";
};
const createToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ id }, "thisisnotasecretkey", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const caughtErrors = handleErrors(err);
    res.status(400).json({ caughtErrors });
  }
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login({ email, password });
    if (user) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });
      res.status(201).json({ user: user._id });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error using Login function" });
  }
};
