const mongoose = require("mongoose");

const FinalBMISchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bmi: { type: Number, required: true },
   // Added userId field
});

const FinalBMI = mongoose.model("FinalBMI", FinalBMISchema);

module.exports = FinalBMI;
