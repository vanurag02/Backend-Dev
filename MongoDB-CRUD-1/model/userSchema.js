const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: {
    type: String,
    unique: true,
    require: true,
  },
  userPhone: String,
  userPassword: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("user", userSchema);
