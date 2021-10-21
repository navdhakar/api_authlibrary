const auth = require("../middleware/auth");
const login_auth = require("../middleware/login_auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/login", login_auth, async (req, res) => {
  console.log(req.auth_token);
  res.send({
    token_data: req.auth_token,
  });
});

router.post("/", async (req, res) => {
  // validate the request body first
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // //find an existing user
  // let user = await User.findOne({ email: req.body.email });
  // if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    group: req.body.group,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  console.log(req.body.name);
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    group: user.group,
    token_data: token,
  });
});

module.exports = router;
