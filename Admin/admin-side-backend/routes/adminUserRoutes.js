const express = require("express");
const adminUserController = require("../controllers/adminUserController");

const router = express.Router();

router.route("/get-admin-users").get(adminUserController.getAdminUser);
router
  .route("/authenticate-user/:id")
  .put(adminUserController.authenticateAdminUserById);

module.exports = router;
