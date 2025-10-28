const Question = require("../models/assignmentQuestionsModel");

// Controller to add a new assignment question
const addAssignmentQuestionsController = async (req, res) => {
  try {
    const {
      questionText,
      choiceType,
      difficulty,
      options,
      category,
      subCategory,
      section,
    } = req.body;

    const { id: createdByAdminId, username: createdByAdminName } = req.user;

    // Validate required fields
    if (!questionText || !choiceType || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate category, subcategory, and section
    if (!category || !category.id || !category.name) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid category information",
      });
    }

    if (!subCategory || !subCategory.id || !subCategory.name) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid sub-category information",
      });
    }

    if (!section || !section.id || !section.name) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid section information",
      });
    }

    // Validate options - at least one option and one correct answer
    if (!options || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one option",
      });
    }

    const hasCorrectOption = options.some(
      (option) => option.isCorrect === true
    );
    if (!hasCorrectOption) {
      return res.status(400).json({
        success: false,
        message: "At least one option must be marked as correct",
      });
    }

    // Create new question
    const newQuestion = new Question({
      questionText,
      choiceType,
      difficulty,
      options,
      category,
      subCategory,
      section,
      createdByAdminId,
      createdByAdminName,
    });

    // Save question to database
    await newQuestion.save();

    return res.status(201).json({
      success: true,
      message: "Assignment question added successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error adding assignment question:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add assignment question",
      error: error.message,
    });
  }
};

// Controller to get all assignment questions
const getAllAssignmentQuestionsController = async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json({
      success: true,
      message: "All assignment questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching assignment questions:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignment questions",
      error: error.message,
    });
  }
};

// Controller to get a single assignment question by ID
const getAssignmentQuestionByIdController = async (req, res) => {
  try {
    const { id } = req.body;
    const question = await Question.findById(id);
    return res.status(200).json({
      success: true,
      message: "Assignment question fetched successfully",
      data: question,
    });
  } catch (error) {
    console.error("Error fetching assignment question:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignment question",
      error: error.message,
    });
  }
};

// Controller to update an assignment question by ID
const updateAssignmentQuestionByIdController = async (req, res) => {
  try {
    const {
      id,
      questionText,
      choiceType,
      difficulty,
      options,
      category,
      subCategory,
      section,
    } = req.body;
    const { id: createdByAdminId, username: createdByAdminName } = req.user;

    const updatedQuestion = await Question.findByIdAndUpdate(id, {
      questionText,
      choiceType,
      difficulty,
      options,
      category,
      subCategory,
      section,
      createdByAdminId,
      createdByAdminName,
    });
    return res.status(200).json({
      success: true,
      message: "Assignment question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating assignment question:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update assignment question",
      error: error.message,
    });
  }
};

// Controller to delete an assignment question by ID
const deleteAssignmentQuestionByIdController = async (req, res) => {
  try {
    const { id } = req.body;
    await Question.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Assignment question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting assignment question:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment question",
      error: error.message,
    });
  }
};

module.exports = {
  addAssignmentQuestionsController,
  getAllAssignmentQuestionsController,
  getAssignmentQuestionByIdController,
  updateAssignmentQuestionByIdController,
  deleteAssignmentQuestionByIdController,
};
