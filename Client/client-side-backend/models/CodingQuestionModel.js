const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema(
  {
    input: String,
    output: String,
    inputType: {
      type: String,
      enum: ["String", "Number", "Array", "Object", "Boolean"],
    },
    targetValue: String,
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: String,
    expectedOutput: String,
    inputType: {
      type: String,
      enum: ["String", "Number", "Array", "Object", "Boolean"],
    },
    targetValue: String,
    isHidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const codingQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coding-topics",
      },
    ],
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coding-companies",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    examples: [exampleSchema],
    testCases: [testCaseSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "coding-problems",
  }
);

const CodingQuestion = mongoose.model(
  "CodingQuestion",
  codingQuestionSchema,
  "coding-problems"
);

module.exports = CodingQuestion;
