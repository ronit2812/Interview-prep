const LearningSubCategoryModel = require("../models/LearningSubCategoryModel");
const APIResponse = require("../utils/reponseHandler");

const LearningSubCategoryController = async (req, res) => {
  const { categoryId, categoryName, subCategoryName } = req.body;
  const { id: createdByAdminId, username: createdByAdminName } = req.user;
  try {
    const subCategory = LearningSubCategoryModel.create({
      CategoryID: categoryId,
      CategoryName: categoryName,
      SubCategoryName: subCategoryName,
      createdByAdminID: createdByAdminId,
      createdByAdminName: createdByAdminName,
    });
    if (subCategory) {
      return APIResponse(res, 200, "Sub Category Stored!", {
        id: subCategory._id,
        subCategoryName: subCategory.SubCategoryName,
      });
    } else {
      return APIResponse(res, 401, "Sub Category not store Successfully!");
    }
  } catch (error) {
    return APIResponse(
      res,
      500,
      "ERROR :: Internal Server Error",
      error.message
    );
  }
};

const getSubCategoryController = async (req, res) => {
  try {
    const subCategory = await LearningSubCategoryModel.find();
    if (subCategory) {
      const response = subCategory.reduce((acc, item) => {
        const { CategoryName } = item;
        if (!acc[CategoryName]) {
          acc[CategoryName] = [];
        }
        acc[CategoryName].push(item);
        return acc;
      }, {});
      return APIResponse(res, 200, "Sub-Categories are fetched...", response);
    } else {
      return APIResponse(res, 400, "Sub Categories not found...");
    }
  } catch (error) {
    return APIResponse(res, 500, "ERROR :: Internal Server Error", error);
  }
};

module.exports = { LearningSubCategoryController, getSubCategoryController };
