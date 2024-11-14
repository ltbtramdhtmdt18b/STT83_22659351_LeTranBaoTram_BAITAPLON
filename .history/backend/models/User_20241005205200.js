const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("User", userSchema);

module.exports = User;
