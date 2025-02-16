const express = require('express');
const router = express.Router();
const Bmi = require('../schemas/bmiSchema');
const FinalBmi = require('../schemas/finalbmi');

// Store BMI Data
router.get('/api/bmi/get-bmi/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const bmiRecord = await Bmi.findOne({ email });

    if (!bmiRecord) {
      return res.status(404).json({ message: 'BMI not found', bmi: null });
    }

    res.json({ bmi: bmiRecord.bmi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// **Route 2: Store BMI Data**
router.post('/api/bmi/store-bmi', async (req, res) => {
  try {
    const { name, email, weight, height, finalBmi, bmi, userId } = req.body;

    const newFinalBmi = new FinalBmi({
      name,
      email,
      weight,
      height,
      finalBmi,
      bmi,
      userId,
    });

    await newFinalBmi.save();
    res.json({ message: 'BMI data stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error storing BMI data' });
  }
});

module.exports = router;