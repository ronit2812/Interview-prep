const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.route("/login-admin-user").post(loginController.loginAdmin);

module.exports = router;