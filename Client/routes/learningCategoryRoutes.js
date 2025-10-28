const express = require("express");
const router = express.Router();
const {
  getAllLearningCategories,
} = require("../controllers/learningCategoryController");

router.get("/get-all-learning-categories", getAllLearningCategories);

module.exports = router;
