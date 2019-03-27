const User = require("../models/user");
require("dotenv").config();
var jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.json({
      error: "this email is already exist"
    });
  }
  const user = new User(req.body);
  user
    .save()
    .then(result => {
      res.status(200).json({
        user: result
      });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({
        error: "email does not exist"
      });
    }

    if (!user.authenticate(password)) {
      res.status(401).json({
        error: "email and password does not match"
      });
    }

    var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Successfull Signout" });
};
