const express = require("express");
const router = express.Router();
const {
  getCodingQuestion,
  getCodingQuestionById,
} = require("../controllers/codingQuestionController");

router.get("/coding-questions", getCodingQuestion);
router.post("/coding-question-by-id", getCodingQuestionById);

module.exports = router;
