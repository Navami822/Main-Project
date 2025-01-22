const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  institution: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher" },  // ✅ Automatically sets role as "teacher"
});

const User = mongoose.model('User', userSchema);
module.exports = User;
