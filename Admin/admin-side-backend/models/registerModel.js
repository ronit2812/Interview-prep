const mongoose = require("mongoose");

const registerData = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isAuthenticate: { type: Boolean, default: false },
  },
  {
    collection: "admin-side-users",
  }
);

module.exports = mongoose.model("register-model", registerData);
