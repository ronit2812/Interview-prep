const express = require("express");
const router = express.Router();
const {
  addAssignmentQuestionsController,
  getAllAssignmentQuestionsController,
  getAssignmentQuestionByIdController,
  updateAssignmentQuestionByIdController,
  deleteAssignmentQuestionByIdController,
} = require("../controllers/assignmentQuestionController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post(
  "/add-assignment-questions",
  authenticateToken.authenticateToken,
  addAssignmentQuestionsController
);

router.get(
  "/get-all-assignment-questions",
  authenticateToken.authenticateToken,
  getAllAssignmentQuestionsController
);

router.post(
  "/get-assignment-question-by-id",
  authenticateToken.authenticateToken,
  getAssignmentQuestionByIdController
);

router.put(
  "/update-assignment-question-by-id",
  authenticateToken.authenticateToken,
  updateAssignmentQuestionByIdController
);

router.delete(
  "/delete-assignment-question-by-id",
  authenticateToken.authenticateToken,
  deleteAssignmentQuestionByIdController
);

module.exports = router;
