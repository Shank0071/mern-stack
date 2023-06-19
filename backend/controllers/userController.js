const HttpError = require("../models/httpError");

const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.json({ email, token });
  } catch (err) {
    const error = new HttpError("Some error occurred " + err, 500);
    return next(error);
  }
};

exports.signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.json({ email, token });
  } catch (err) {
    const error = new HttpError("Some error occurred " + err, 500);
    return next(error);
  }
};
