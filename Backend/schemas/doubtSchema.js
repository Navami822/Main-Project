const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  teacherEmail: { type: String, required: true },
  doubt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doubt", DoubtSchema);
