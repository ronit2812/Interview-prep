const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    choiceType: { type: String, enum: ["single", "multiple"], required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    options: {
      type: [optionSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },

    category: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
    subCategory: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
    section: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
    createdByAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "admin",
    },
    createdByAdminName: {
      type: String,
      required: true,
      ref: "admin",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "assignment-questions" }
);

module.exports = mongoose.model(
  "Question",
  questionSchema,
  "assignment-questions"
);
