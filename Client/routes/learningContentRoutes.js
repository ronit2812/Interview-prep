const express = require("express");
const router = express.Router();

const {
  getAllLearningContents,
  getLearningContentById,
} = require("../controllers/learningContentController");

router.get("/get-all-learning-contents", getAllLearningContents);
router.post("/get-learning-content-by-id", getLearningContentById);

module.exports = router;
