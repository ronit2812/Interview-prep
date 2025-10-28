const express = require("express");
const router = express.Router();
const {
  addMockTestQuestion,
  getMockTestQuestions,
} = require("../controllers/mockTestController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post(
  "/add-mock-test-question",
  authenticateToken.authenticateToken,
  addMockTestQuestion
);
router.get(
  "/get-mock-test-questions",
  authenticateToken.authenticateToken,
  getMockTestQuestions
);

module.exports = router;
