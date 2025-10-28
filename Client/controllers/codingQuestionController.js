const CodingQuestionModel = require("../models/CodingQuestionModel");

const getCodingQuestion = async (req, res) => {
  try {
    const codingQuestion = await CodingQuestionModel.find(
      {},
      {
        __v: 0,
        companies: 0,
        createdAt: 0,
        examples: 0,
        testCases: 0,
        topics: 0,
      }
    );
    if (!codingQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Coding question not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coding question fetched successfully",
      codingQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching coding question" });
  }
};

const getCodingQuestionById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const codingQuestion = await CodingQuestionModel.findById(id);
    if (!codingQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Coding question not found" });
    }
    res.status(200).json({
      success: true,
      message: "Coding question fetched successfully",
      codingQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching coding question" });
  }
};

module.exports = { getCodingQuestion, getCodingQuestionById };
