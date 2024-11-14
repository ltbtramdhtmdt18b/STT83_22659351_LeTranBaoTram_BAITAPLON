const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "" }, // Thêm trường name
  address: { type: String, default: "" }, // Thêm trường address
  phone: { type: String, default: "" }, // Thêm trường phone
  email: { type: String, default: "" }, // Thêm trường email
});

module.exports = mongoose.model("User", UserSchema);
