const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BmiModel = require("../schemas/finalbmi"); // Ensure correct path

// ✅ Fetch BMI report
router.get("/bmi-report", async (req, res) => {
  try {
    const data = await BmiModel.find();

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No BMI data found" });
    }

    // ✅ Check effectiveness of training
    const allNormal = data.every(
      (student) => student.finalBmi >= 18.5 && student.finalBmi <= 24.9
    );
    const effectiveness = allNormal
      ? "The teacher has provided effective training."
      : "Some students still need improvement.";

    res.json({ data, effectiveness });
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
