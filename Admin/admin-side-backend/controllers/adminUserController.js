const adminUserModel = require("../models/adminUserModel");
const APIResponse = require("../utils/reponseHandler");

const getAdminUser = async (req, res) => {
  try {
    const adminUsers = await adminUserModel.find();
    return APIResponse(
      res,
      200,
      "Admin Users fetched successfully!",
      adminUsers
    );
  } catch (err) {
    return APIResponse(
      res,
      500,
      "ERROR :: Fetching Admin Users Data",
      err.message
    );
  }
};

const authenticateAdminUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await adminUserModel.findByIdAndUpdate(
      id,
      { isAuthenticate: true },
      { new: true }
    );
    if (!updatedUser) {
      return APIResponse(res, 404, "ERROR :: Admin User not found");
    }
    return APIResponse(res, 200, "Admin user authenticated", updatedUser);
  } catch (err) {
    return APIResponse(
      res,
      500,
      "ERROR :: Failed to authenticate user",
      err.message
    );
  }
};

module.exports = { getAdminUser, authenticateAdminUserById };
