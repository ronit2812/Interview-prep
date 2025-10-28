const express = require("express");
const router = express.Router();
const LearningContentController = require("../controllers/LearningContentController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post(
  "/learning/add-learning-content",
  authenticateToken.authenticateToken,
  LearningContentController.addLearningContent
);

router.get(
  "/learning/get-all-learning-content",
  authenticateToken.authenticateToken,
  LearningContentController.getAllLearningContent
);

router.post(
  "/learning/get-learning-content-by-id",
  authenticateToken.authenticateToken,
  LearningContentController.getLearningContentById
);

router.post(
  "/learning/update-learning-content",
  authenticateToken.authenticateToken,
  LearningContentController.updateLearningContent
);

router.post(
  "/learning/delete-learning-content",
  authenticateToken.authenticateToken,
  LearningContentController.deleteLearningContent
);

module.exports = router;
