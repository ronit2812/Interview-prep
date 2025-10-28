const MockQuestion = require("../models/mockTestModel");

const addMockTestQuestion = async (req, res) => {
  try {
    const {
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      sectionId,
      sectionName,
      questionText,
      options,
      correctOption,
      explanation,
    } = req.body;

    const mockQuestion = new MockQuestion({
      categoryId,
      categoryName,
      subcategoryId,
      subcategoryName,
      sectionId,
      sectionName,
      questionText,
      options,
      correctOption,
      explanation,
    });

    await mockQuestion.save();

    res.status(201).json({
      success: true,
      message: "Mock test question added successfully",
      data: mockQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMockTestQuestions = async (req, res) => {
  try {
    const mockQuestions = await MockQuestion.find();
    res.status(200).json({
      success: true,
      message: "Mock test questions fetched successfully",
      data: mockQuestions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { addMockTestQuestion, getMockTestQuestions };
