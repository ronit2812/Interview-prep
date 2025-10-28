const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register-user", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/user-profile", protect, getUserProfile);

module.exports = router;
