// bmitableRoutes.js (Node.js/Express)
const express = require('express');
const Bmi = require('../schemas/bmiSchema');
const FinalBmi = require('../schemas/finalbmi');// Import models
const router = express.Router();

// Route to fetch BMI data based on userId (Teacher's userId)
router.get('/getStudentsData', async (req, res) => {
  try {
    // Extract userId (Teacher) from query parameters
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId (Teacher) is required' });
    }

    // Fetch all students' BMI data from the Bmi collection for the given userId (Teacher)
    const bmiData = await Bmi.find({ userId });
    const finalBmiData = await FinalBmi.find({ userId });

    if (!bmiData || !finalBmiData) {
      return res.status(404).json({ message: 'No data found for students of this teacher' });
    }

    // Combine the data and prepare the final result
    const result = bmiData.map(studentBmi => {
      // Find the corresponding FinalBmi data for each student
      const studentFinalBmi = finalBmiData.find(finalBmi => finalBmi.email === studentBmi.email);

      if (studentFinalBmi) {
        return {
          name: studentFinalBmi.name,
          email: studentBmi.email,
          initialBmi: studentBmi.bmi,
          finalBmi: studentFinalBmi.finalBmi,
          change: studentFinalBmi.finalBmi - studentBmi.bmi
        };
      } else {
        return null;
      }
    }).filter(student => student !== null);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching students\' BMI data', error });
  }
});

module.exports = router;
