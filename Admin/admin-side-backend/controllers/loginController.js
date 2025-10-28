const Cryptr = require("cryptr");
const loginModel = require("../models/loginModel");
const { generateToken } = require("../services/auth");
const APIResponse = require("../utils/reponseHandler");
const cryptr = new Cryptr("mySecretKey", {
  encoding: "base64",
  saltLength: 10,
  pbkdf2Iterations: 1000,
});

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel.findOne({ email });
    if (!user) {
      return APIResponse(res, 404, "ERROR :: User not found");
    }
    let decrypted_password = cryptr.decrypt(user.password);
    let user_authenticated = user.isAuthenticate;
    if (password === decrypted_password && user_authenticated) {
      const token = generateToken({ id: user._id, username: user.username });
      res.cookie("uid", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return APIResponse(res, 200, "Login Successfull");
    } else {
      return APIResponse(res, 401, "ERROR :: Invalid Credentials");
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

module.exports = { loginAdmin };
