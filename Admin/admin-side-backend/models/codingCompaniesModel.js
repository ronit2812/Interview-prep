const mongoose = require("mongoose");

const codingCompaniesSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "coding-companies" }
);

const CodingCompanies = mongoose.model(
  "CodingCompanies",
  codingCompaniesSchema,
  "coding-companies"
);

module.exports = CodingCompanies;
