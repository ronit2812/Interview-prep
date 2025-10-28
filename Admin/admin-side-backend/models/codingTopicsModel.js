const mongoose = require("mongoose");

const codingTopicsSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "coding-topics",
  }
);

const CodingTopics = mongoose.model(
  "CodingTopics",
  codingTopicsSchema,
  "coding-topics"
);

module.exports = CodingTopics;
