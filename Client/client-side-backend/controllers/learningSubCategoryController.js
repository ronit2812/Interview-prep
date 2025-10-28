const LearningSubCategoryModel = require("../models/LearningSubCategoryModel");

const getAllLearningSubCategories = async (req, res) => {
  try {
    const learningSubCategories = await LearningSubCategoryModel.find();

    res.status(200).json({
      success: true,
      message: "Learning sub categories fetched successfully",
      data: learningSubCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllLearningSubCategories };
