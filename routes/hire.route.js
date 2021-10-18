const auth = require("../middleware/auth");
const login_auth = require("../middleware/login_auth");
const bcrypt = require("bcrypt");
const { Hire, validate } = require("../models/hire.model");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/current", auth, async (req, res) => {
  const Hire = await Hire.findById(req.Hire._id).select("-password");
  res.send(Hire);
});

router.post("/login", login_auth, async (req, res) => {
  console.log(req.auth_token);
  res.send({
    token_data: req.auth_token,
  });
});

router.post("/hire_us", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing Hire
  let Hire = await Hire.findOne({ email: req.body.email });
  if (Hire) return res.status(400).send("Hire already registered.");

  Hire = new Hire({
    company_name: company_name,
    email: email,
    contact_no: contact_no,
    project_title: project_title,
    project_description: project_description,
    technology_required: technology_required,
    time_limit: time_limit,
    budget: budget,
    required_experience: required_experience,
  });
  Hire.password = await bcrypt.hash(Hire.password, 10);
  await Hire.save();
  console.log(req.body.name);
  const token = Hire.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: Hire._id,
    company_name: company_name,
    email: email,
    contact_no: contact_no,
    project_title: project_title,
    project_description: project_description,
    technology_required: technology_required,
    time_limit: time_limit,
    budget: budget,
    required_experience: required_experience,
    token_data: token,
  });
});

module.exports = router;
