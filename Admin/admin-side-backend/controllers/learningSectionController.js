const LearningSection = require("../models/LearningSectionModel");

// Add new learning section
const addLearningSection = async (req, res) => {
  try {
    const { subcategoryId, subcategoryName, sectionName } = req.body;
    const { id: createdByAdminId, username: createdByAdminName } = req.user;

    if (!subcategoryId || !subcategoryName || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSection = new LearningSection({
      subCategoryId: subcategoryId,
      subCategoryName: subcategoryName,
      sectionName: sectionName,
      createdByAdminID: createdByAdminId,
      createdByAdminName: createdByAdminName,
    });

    await newSection.save();

    res.status(201).json({
      success: true,
      message: "Learning section created successfully",
      data: newSection,
    });
  } catch (error) {
    console.error("Error in addLearningSection:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fetch learning sections by subcategory
const getLearningSection = async (req, res) => {
  try {
    const sections = await LearningSection.find();

    res.status(200).json({
      success: true,
      message: "Learning sections fetched successfully",
      data: sections,
    });
  } catch (error) {
    console.error("Error in getLearningSection:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addLearningSection,
  getLearningSection,
};
