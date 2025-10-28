const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
