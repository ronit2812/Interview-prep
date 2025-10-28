const mongoose = require("mongoose");

const learningSubSectionSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningSection",
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    subSectionName: {
      type: String,
      required: true,
    },
    createdByAdminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admins",
      required: true,
    },
    createdByAdminName: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    collection: "learning-sub-section",
  }
);

const LearningSubSection = mongoose.model(
  "LearningSubSection",
  learningSubSectionSchema
);

module.exports = LearningSubSection;
