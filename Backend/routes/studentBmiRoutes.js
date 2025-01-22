const express = require('express');
const router = express.Router();
const Bmi = require('../schemas/bmiSchema');
const FinalBmi = require('../schemas/finalbmi');


// Fetch BMI data for a single student by email
router.get('/getStudentBmiData', async (req, res) => {
  const { email } = req.query;

  try {
    const initialBmi = await Bmi.findOne({ email });
    const finalBmi = await FinalBmi.findOne({ email });

    if (!initialBmi || !finalBmi) {
      return res.status(404).json({ error: 'BMI data not found for the given email.' });
    }

    res.json({
      name: initialBmi.name,
      email,
      initialBmi: initialBmi.bmi,
      finalBmi: finalBmi.finalBmi,
    });
    console.log(initialBmi)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
