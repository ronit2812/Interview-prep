const express = require("express");
const router = express.Router();
const {
  addLearningSection,
  getLearningSection,
} = require("../controllers/learningSectionController");
const authenticateToken = require("../middlewares/authMiddleware");

// Protected routes - require authentication
router.post(
  "/learning/learning-section",
  authenticateToken.authenticateToken,
  addLearningSection
);
router.get(
  "/learning/get-section",
  authenticateToken.authenticateToken,
  getLearningSection
);

module.exports = router;
