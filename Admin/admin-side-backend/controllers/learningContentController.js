const LearningContent = require("../models/LearningContentModel");
const APIResponse = require("../utils/reponseHandler");

// Add new learning content
const addLearningContent = async (req, res) => {
  try {
    const {
      categoryId,
      categoryName,
      subCategoryId,
      subCategoryName,
      sectionId,
      sectionName,
      subSectionId,
      subSectionName,
      content,
    } = req.body;

    const { id: createdByAdminID, username: createdByAdminName } = req.user;

    const newLearningContent = new LearningContent({
      categoryId,
      categoryName,
      subCategoryId,
      subCategoryName,
      sectionId,
      sectionName,
      subSectionId,
      subSectionName,
      content,
      createdByAdminID: createdByAdminID,
      createdByAdminName: createdByAdminName,
    });

    const savedContent = await newLearningContent.save();

    return APIResponse(
      res,
      201,
      "Learning content added successfully",
      savedContent
    );
  } catch (error) {
    return APIResponse(
      res,
      500,
      "Error adding learning content",
      error.message
    );
  }
};

// Get all learning content
const getAllLearningContent = async (req, res) => {
  try {
    const allContent = await LearningContent.find();

    return APIResponse(
      res,
      200,
      "Learning content retrieved successfully",
      allContent
    );
  } catch (error) {
    return APIResponse(
      res,
      500,
      "Error retrieving learning content",
      error.message
    );
  }
};

// Get learning content by ID
const getLearningContentById = async (req, res) => {
  try {
    const { id } = req.body;
    const content = await LearningContent.findById(id);
    return APIResponse(
      res,
      200,
      "Learning content retrieved successfully",
      content
    );
  } catch (error) {
    return APIResponse(
      res,
      500,
      "Error retrieving learning content",
      error.message
    );
  }
};

// Update learning content
const updateLearningContent = async (req, res) => {
  try {
    const {
      id,
      categoryId,
      categoryName,
      subCategoryId,
      subCategoryName,
      sectionId,
      sectionName,
      subSectionId,
      subSectionName,
      content,
    } = req.body;
    const { id: createdByAdminID, username: createdByAdminName } = req.user;

    const updatedContent = await LearningContent.findByIdAndUpdate(id, {
      categoryId,
      categoryName,
      subCategoryId,
      subCategoryName,
      sectionId,
      sectionName,
      subSectionId,
      subSectionName,
      content,
      createdByAdminID: createdByAdminID,
      createdByAdminName: createdByAdminName,
    });

    if (!updatedContent) {
      return APIResponse(res, 404, "Learning content not found");
    }
    return APIResponse(
      res,
      200,
      "Learning content updated successfully",
      updatedContent
    );
  } catch (error) {
    return APIResponse(
      res,
      500,
      "Error updating learning content",
      error.message
    );
  }
};

// Delete learning content
const deleteLearningContent = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedContent = await LearningContent.findByIdAndDelete(id);
    return APIResponse(
      res,
      200,
      "Learning content deleted successfully",
      deletedContent
    );
  } catch (error) {
    return APIResponse(
      res,
      500,
      "Error deleting learning content",
      error.message
    );
  }
};
module.exports = {
  addLearningContent,
  getAllLearningContent,
  getLearningContentById,
  updateLearningContent,
  deleteLearningContent,
};
