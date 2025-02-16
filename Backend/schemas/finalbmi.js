const mongoose = require('mongoose');

const finalBmiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  finalBmi: { type: Number, required: true },
  bmi: { type: Number },  // Optional, if not found in bmi collection
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Final', finalBmiSchema);