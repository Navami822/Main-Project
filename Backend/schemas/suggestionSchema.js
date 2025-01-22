const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true }, // Store admission number instead of ObjectId
  studentName: { type: String, required: true },
  question: { type: String, required: true },
  reply: { type: String, default: "" }, // Empty initially
  createdAt: { type: Date, default: Date.now },
});


const Suggestion = mongoose.model('Suggestion', suggestionSchema);
module.exports = Suggestion;
