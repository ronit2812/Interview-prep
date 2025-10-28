const express = require("express");
const LearningCategoryController = require("../controllers/learningCategoryController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/learning/learning-category")
  .post(
    authenticateToken.authenticateToken,
    LearningCategoryController.LearningCategoryController
  );

router
  .route("/learning/get-categories")
  .get(LearningCategoryController.getCategoryController);

module.exports = router;
