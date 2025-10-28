const express = require("express");
const router = express.Router();
const {
  getAllLearningSubCategories,
} = require("../controllers/learningSubCategoryController");

router.get("/get-all-learning-sub-categories", getAllLearningSubCategories);

module.exports = router;
