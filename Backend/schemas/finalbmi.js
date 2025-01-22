const mongoose = require('mongoose');

const finalBmiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  finalBmi: { type: Number, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FinalBmi', finalBmiSchema);
