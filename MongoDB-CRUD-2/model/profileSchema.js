const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userPhone: String,
  userAddress: String,
  userProfile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("profile", profileSchema);
