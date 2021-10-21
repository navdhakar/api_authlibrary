const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

//simple schema
const HireSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  project_title: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  technology_required: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  time_limit: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  required_experience: {
    type: String,
    required: false,
  },
  //milestone needs to be added
  //give different access rights if admin or not
  isAdmin: Boolean,
});

//custom method to generate authToken
HireSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("myprivatekey")); //get the private key from the config file -> environment variable
  return token;
};

const Hire = mongoose.model("Hire", HireSchema);

//function to validate Hire
function validateHire(Hire) {
  const schema = Joi.object({
    company_name: Joi.string().required(),
    email: Joi.string().required(),
    contact_no: Joi.number().required(),
    project_title: Joi.string().required(),
    project_description: Joi.string().min(3).max(1000).required(),
    technology_required: Joi.string().min(3).max(255).required(),
    time_limit: Joi.string().required(),
    budget: Joi.number().required(),
    required_experience: Joi.string().required(),
  });

  return schema.validate(Hire);
}

exports.Hire = Hire;
exports.validate = validateHire;
