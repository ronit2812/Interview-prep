const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected Routes!", user: req.user });
});

module.exports = router;
