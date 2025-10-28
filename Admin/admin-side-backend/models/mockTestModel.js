const mongoose = require("mongoose");

const mockQuestionSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "learning-categories",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "learning-sub-categories",
      required: true,
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "learning-section",
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    correctOption: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },
    explanation: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "mock-test-questions",
  }
);

module.exports = mongoose.model(
  "MockQuestion",
  mockQuestionSchema,
  "mock-test-questions"
);
