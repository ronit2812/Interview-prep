const registerModel = require("../models/registerModel");
const Cryptr = require("cryptr");
const { generateToken } = require("../services/auth");
const APIResponse = require("../utils/reponseHandler");

const cryptr = new Cryptr("mySecretKey", {
  encoding: "base64",
  saltLength: 10,
  pbkdf2Iterations: 1000,
});

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return APIResponse(res, 400, "All fields are required");
    }

    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return APIResponse(res, 409, "Email is already in use");
    }

    const newUser = await registerModel.create({
      username: username,
      email: email,
      password: cryptr.encrypt(password),
    });

    const token = generateToken({
      id: newUser._id,
      username: newUser.username,
    });

    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return APIResponse(res, 201, "Admin registered successfully", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return APIResponse(res, 500, "Server error", error.message);
  }
};

module.exports = { registerController };
