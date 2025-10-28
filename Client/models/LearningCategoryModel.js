const mongoose = require("mongoose");

const LearningCategoryModel = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdByAdminId: {
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

module.exports = mongoose.model("learning-categories", LearningCategoryModel);
