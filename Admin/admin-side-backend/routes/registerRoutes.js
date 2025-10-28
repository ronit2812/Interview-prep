const express = require("express");
const registerController = require("../controllers/registerController");

const router = express.Router();

router
  .route("/register-admin-data")
  .post(registerController.registerController);

module.exports = router;
