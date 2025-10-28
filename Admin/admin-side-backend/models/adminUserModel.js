const mongoose = require("mongoose");

const adminData = mongoose.Schema(
  {
    objectID: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAuthenticate: { type: Boolean, required: true },
  },
  {
    collection: "admin-side-users",
  }
);

module.exports = mongoose.model("admin-user-model", adminData);
