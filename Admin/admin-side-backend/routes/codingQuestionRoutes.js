const express = require("express");
const router = express.Router();

const {
  addTopic,
  getAllTopics,
  addCompany,
  getAllCompanies,
  addCodingQuestion,
  getAllCodingQuestions,
} = require("../controllers/codingQuestionController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/add-topic", authenticateToken.authenticateToken, addTopic);

router.get(
  "/get-all-topics",
  authenticateToken.authenticateToken,
  getAllTopics
);

router.post("/add-company", authenticateToken.authenticateToken, addCompany);

router.get(
  "/get-all-companies",
  authenticateToken.authenticateToken,
  getAllCompanies
);

router.post(
  "/add-coding-question",
  authenticateToken.authenticateToken,
  addCodingQuestion
);

router.get(
  "/get-all-coding-questions",
  authenticateToken.authenticateToken,
  getAllCodingQuestions
);

module.exports = router;
