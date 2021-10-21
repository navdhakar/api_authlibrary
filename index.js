const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.route");
const hireRoute = require("./routes/hire.route");
const workRoute = require("./routes/work.route");
const express = require("express");

const router = express.Router();

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

router.use(express.json());
//use users route for api/users
router.use("/register", usersRoute);
router.use("/hire", hireRoute);
module.exports = router;
