const mongoose = require('mongoose');

// Define the BMI schema
const bmiSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number },
  role: { type: String, default: 'student' }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }// Added role field with default value 'student'
});

// Create the BMI model
const BMI = mongoose.model('BMI', bmiSchema); // Corrected the model name
module.exports = BMI;
