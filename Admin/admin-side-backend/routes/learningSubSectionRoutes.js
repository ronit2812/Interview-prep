const express = require("express");
const router = express.Router();
const {
  addLearningSubSection,
  getLearningSubSection,
} = require("../controllers/learningSubSectionController");
const authenticateToken = require("../middlewares/authMiddleware");

// Protected routes - require authentication
router.post(
  "/learning/learning-sub-section",
  authenticateToken.authenticateToken,
  addLearningSubSection
);
router.get(
  "/learning/get-sub-section",
  authenticateToken.authenticateToken,
  getLearningSubSection
);

module.exports = router;
