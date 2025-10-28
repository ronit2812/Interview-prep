const LearningCategoryModel = require("../models/LearningCategoryModel");
const APIResponse = require("../utils/reponseHandler");

const LearningCategoryController = async (req, res) => {
  const { categoryName } = req.body;
  const { id: createdByAdminId, username: createdByAdminName } = req.user;
  try {
    const Category = await LearningCategoryModel.create({
      categoryName,
      createdByAdminId,
      createdByAdminName,
    });
    if (Category) {
      return APIResponse(res, 200, "Category Store Successfully!", {
        id: Category._id,
        categoryName: Category.categoryName,
      });
    } else {
      return APIResponse(res, 401, "Category not store Successfully!");
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

const getCategoryController = async (req, res) => {
  try {
    const Category = await LearningCategoryModel.find();
    return APIResponse(res, 200, "Categories Fetched...", Category);
  } catch (error) {
    return APIResponse(res, 500, "ERROR :: Internal Error", error.message);
  }
};

module.exports = { LearningCategoryController, getCategoryController };
