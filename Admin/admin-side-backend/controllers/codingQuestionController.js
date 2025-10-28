const CodingTopics = require("../models/codingTopicsModel");
const CodingCompanies = require("../models/codingCompaniesModel");
const CodingQuestion = require("../models/codingQuestionModel");

// Add a new topic
const addTopic = async (req, res) => {
  try {
    const { topicName } = req.body;

    // Check if the topic already exists (case-insensitive)
    const existingTopic = await CodingTopics.findOne({
      topicName: { $regex: new RegExp(`^${topicName}$`, "i") },
    });

    if (existingTopic) {
      return res.status(400).json({
        success: false,
        message: "Topic already exists",
      });
    }

    // Create and save new topic
    const newTopic = new CodingTopics({ topicName });
    await newTopic.save();

    return res.status(201).json({
      success: true,
      message: "Topic added successfully",
      data: newTopic,
    });
  } catch (error) {
    console.error("Error adding topic:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await CodingTopics.find();
    res.status(200).json({ success: true, data: topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    const existingCompany = await CodingCompanies.findOne({
      companyName: { $regex: new RegExp(`^${companyName}$`, "i") },
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const newCompany = new CodingCompanies({ companyName });
    await newCompany.save();

    return res.status(201).json({
      success: true,
      message: "Company added successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await CodingCompanies.find();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addCodingQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      rewardPoints,
      difficultyLevel,
      isPremium,
      topics,
      companies,
      tags,
      examples,
      testCases,
    } = req.body;

    const newCodingQuestion = new CodingQuestion({
      title,
      description,
      rewardPoints,
      difficultyLevel,
      isPremium,
      topics,
      companies,
      tags,
      examples,
      testCases,
    });
    await newCodingQuestion.save();
    return res.status(201).json({
      success: true,
      message: "Coding question added successfully",
      data: newCodingQuestion,
    });
  } catch (error) {
    console.error("Error adding coding question:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllCodingQuestions = async (req, res) => {
  try {
    const codingQuestions = await CodingQuestion.find();
    res.status(200).json({ success: true, data: codingQuestions });
  } catch (error) {
    console.error("Error fetching coding questions:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addTopic,
  getAllTopics,
  addCompany,
  getAllCompanies,
  addCodingQuestion,
  getAllCodingQuestions,
};
