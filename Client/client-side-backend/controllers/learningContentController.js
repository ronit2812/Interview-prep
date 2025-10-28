const LearningContent = require("../models/LearningContentModel");

const getAllLearningContents = async (req, res) => {
  try {
    const learningContents = await LearningContent.find();
    res.status(200).json({
      success: true,
      message: "Learning contents fetched successfully",
      learningContents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch learning contents",
      error: error.message,
    });
  }
};

const getLearningContentById = async (req, res) => {
  try {
    const { id } = req.body;
    const learningContent = await LearningContent.find({
      subCategoryId: id,
    });
    res.status(200).json({
      success: true,
      message: "Learning content fetched successfully",
      learningContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch learning content by ID",
      error: error.message,
    });
  }
};

module.exports = {
  getAllLearningContents,
  getLearningContentById,
};
