const LearningSubSection = require("../models/LearningSubSection");

// Add new learning subsection
const addLearningSubSection = async (req, res) => {
  try {
    const { sectionId, sectionName, subSectionName } = req.body;
    const { id: createdByAdminId, username: createdByAdminName } = req.user;

    if (!sectionId || !sectionName || !subSectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSubSection = new LearningSubSection({
      sectionId,
      sectionName,
      subSectionName,
      createdByAdminID: createdByAdminId,
      createdByAdminName: createdByAdminName,
    });

    await newSubSection.save();

    res.status(201).json({
      success: true,
      message: "Learning subsection created successfully",
      data: newSubSection,
    });
  } catch (error) {
    console.error("Error in addLearningSubSection:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fetch learning subsections by section
const getLearningSubSection = async (req, res) => {
  try {
    const subsections = await LearningSubSection.find();

    res.status(200).json({
      success: true,
      message: "Learning subsections fetched successfully",
      data: subsections,
    });
  } catch (error) {
    console.error("Error in getLearningSubSection:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addLearningSubSection,
  getLearningSubSection,
};
