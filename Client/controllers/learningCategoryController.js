const LearningCategoryModel = require("../models/LearningCategoryModel");

const getAllLearningCategories = async (req, res) => {
  try {
    const learningCategories = await LearningCategoryModel.find();
    res.status(200).json({
      success: true,
      message: "Learning categories fetched successfully",
      data: learningCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllLearningCategories };
