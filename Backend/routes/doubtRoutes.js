const express = require("express");
const router = express.Router();
const Doubt = require("../schemas/doubtSchema");

// POST route to submit doubt
router.post("/doubts", async (req, res) => {
  try {
    const { studentEmail, teacherEmail, doubt } = req.body;

    if (!studentEmail || !teacherEmail || !doubt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDoubt = new Doubt({ studentEmail, teacherEmail, doubt });
    await newDoubt.save();
    res.status(201).json({ message: "Doubt submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
