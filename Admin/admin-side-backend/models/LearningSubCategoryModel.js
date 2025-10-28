const mongoose = require("mongoose");

const LearningSubCategoryModel = mongoose.Schema({
  CategoryID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "learning-categories",
  },
  CategoryName: {
    type: String,
    required: true,
    ref: "learning-categories",
  },
  SubCategoryName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdByAdminID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "admin-side-users",
  },
  createdByAdminName: {
    type: String,
    required: true,
    ref: "admin-side-users",
  },
});

module.exports = mongoose.model(
  "learning-sub-categories",
  LearningSubCategoryModel
);
