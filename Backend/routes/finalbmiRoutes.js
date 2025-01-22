const express = require('express');
const router = express.Router();
const FinalBmi = require('../schemas/finalbmi');  // Import the FinalBmi model

router.post('/', async (req, res) => {
  try {
    const { name, email, weight, height, finalBmi, userId } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email already exists in FinalBmi collection
    const existingBmi = await FinalBmi.findOne({ email });

    if (existingBmi) {
      // If record exists, update it instead of rejecting
      await FinalBmi.updateOne(
        { email },
        { $set: { name, weight, height, finalBmi, userId } }  // Use $set to update only specified fields
      );

      return res.status(200).json({ message: 'BMI data updated successfully!' });
    }

    // Create a new BMI record if no existing entry found
    const newFinalBmi = new FinalBmi({
      name,
      email,
      weight,
      height,
      finalBmi,
      userId,
    });

    await newFinalBmi.save();
    res.status(201).json({ message: 'BMI data saved successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
