const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BmiModel = require("../schemas/finalbmi"); // Ensure the correct path

// ✅ Fetch BMI report
router.get("/bmi-report", async (req, res) => {
  try {
    const data = await BmiModel.find();

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No BMI data found" });
    }

    // ✅ Analyzing BMI changes
    let sameBMI = 0, increasedBMI = 0, decreasedBMI = 0;
    let underweight = 0, normal = 0, overweight = 0, obese = 0;

    data.forEach((student) => {
      if (student.bmi.toFixed(2) === student.finalBmi.toFixed(2)) {
        sameBMI++;
      } else if (student.finalBmi > student.bmi) {
        increasedBMI++;
      } else {
        decreasedBMI++;
      }

      if (student.finalBmi < 18.5) {
        underweight++;
      } else if (student.finalBmi >= 18.5 && student.finalBmi <= 24.9) {
        normal++;
      } else if (student.finalBmi >= 25 && student.finalBmi <= 29.9) {
        overweight++;
      } else {
        obese++;
      }
    });

    // ✅ Effectiveness of training
    const allNormal = data.every(
      (student) => student.finalBmi >= 18.5 && student.finalBmi <= 24.9
    );
    const effectiveness = allNormal
      ? "The teacher has provided effective training."
      : "Some students still need improvement.";

    res.json({
      data,
      analysis: {
        sameBMI: ((sameBMI / data.length) * 100).toFixed(2),
        increasedBMI: ((increasedBMI / data.length) * 100).toFixed(2),
        decreasedBMI: ((decreasedBMI / data.length) * 100).toFixed(2),
        underweight: ((underweight / data.length) * 100).toFixed(2),
        normal: ((normal / data.length) * 100).toFixed(2),
        overweight: ((overweight / data.length) * 100).toFixed(2),
        obese: ((obese / data.length) * 100).toFixed(2),
      },
      effectiveness,
    });
  } catch (error) {
    console.error("Error fetching BMI report:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// ✅ Delete BMI report
router.delete("/delete-report", async (req, res) => {
  try {
    await BmiModel.deleteMany({});
    res.json({ message: "BMI report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Error deleting report" });
  }
});

module.exports = router;
