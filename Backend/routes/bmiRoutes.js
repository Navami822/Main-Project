const express = require('express');
const router = express.Router();
const BMI = require('../schemas/bmiSchema'); // Correct import for the BMI model

// Function to calculate BMI
const calculateBMI = (height, weight) => {
  return weight / (height * height);
};

// Function to categorize BMI
function categorizeBMI(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
  if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
  return 'Obesity';
}

// Add a new student with BMI calculation and role
router.post('/', async (req, res) => {
  try {
    const { email, name, age, gender, height, weight, userId } = req.body;
    const bmi = calculateBMI(height, weight); // Calculate BMI
    const category = categorizeBMI(bmi); // Categorize BMI
    const newEntry = new BMI({
      email,
      name,
      age,
      gender,
      height,
      weight,
      bmi,
      category,
      role: 'student',
      userId // Default role is 'student'
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
router.delete('/deleteStudent/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await BMI.findByIdAndDelete(id); // Corrected to use BMI model
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting student', error: err.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await BMI.find(); // Corrected to use BMI model
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching students', error: err.message });
  }
});

// Calculate BMI and update it for a student
router.put('/calculateBMI/:id', async (req, res) => {
  const { id } = req.params;
  const { height, weight } = req.body;

  if (!height || !weight) {
    return res.status(400).json({ message: 'Height and weight are required to calculate BMI.' });
  }

  const bmi = calculateBMI(height, weight);
  const category = categorizeBMI(bmi);

  try {
    const updatedStudent = await BMI.findByIdAndUpdate(
      id,
      { height, weight, bmi, category },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating BMI', error: err.message });
  }
});

module.exports = router;
