const express = require("express");
const router = express.Router();
const LearningSubCategoryController = require("../controllers/learningSubCategoryController");
const authenticateToken = require("../middlewares/authMiddleware");

router
  .route("/learning/learning-sub-category")
  .post(
    authenticateToken.authenticateToken,
    LearningSubCategoryController.LearningSubCategoryController
  );
router
  .route("/learning/get-sub-category")
  .get(LearningSubCategoryController.getSubCategoryController);

module.exports = router;
