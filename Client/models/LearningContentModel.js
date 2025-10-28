const mongoose = require("mongoose");

const learningContentSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "learning-categories",
    },
    categoryName: {
      type: String,
      required: true,
      ref: "learning-categories",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "learning-sub-categories",
    },
    subCategoryName: {
      type: String,
      required: true,
      ref: "learning-sub-categories",
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "learning-section",
    },
    sectionName: {
      type: String,
      required: true,
      ref: "learning-section",
    },
    subSectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "learning-sub-section",
    },
    subSectionName: {
      type: String,
      required: true,
      ref: "learning-sub-section",
    },
    content: {
      type: String,
      required: true,
    },
    created_by: {
      type: Date,
      default: Date.now,
    },
    createdByAdminID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "admin",
    },
    createdByAdminName: {
      type: String,
      required: true,
      ref: "admin",
    },
  },
  {
    collection: "learning-contents",
  }
);

module.exports = mongoose.model(
  "learning-contents",
  learningContentSchema,
  "learning-contents"
);
