const { verifyToken } = require("../services/auth");
const APIResponse = require("../utils/reponseHandler");

function authenticateToken(req, res, next) {
  const token = req.cookies.uid;
  if (!token) {
    return APIResponse(res, 401, "Not Authenticated!");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return APIResponse(res, 403, "Invalid Token!");
  }
  req.user = decoded;
  next();
}

module.exports = { authenticateToken };
