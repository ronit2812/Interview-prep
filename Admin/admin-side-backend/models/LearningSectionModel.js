const mongoose = require("mongoose");

const learningSectionSchema = new mongoose.Schema(
  {
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },
    subCategoryName: {
      type: String,
      required: true,
    },
    sectionName: {
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
    collection: "learning-section",
  }
);

const LearningSection = mongoose.model(
  "LearningSection",
  learningSectionSchema
);

module.exports = LearningSection;
