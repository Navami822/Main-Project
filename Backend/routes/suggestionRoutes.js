const express = require("express");
const router = express.Router();
const Suggestion = require("../schemas/suggestionSchema");
const BMI = require("../schemas/bmiSchema"); // For student details
const User = require("../schemas/userSchema"); // For teacher details

// 🟢 1. Student submits a suggestion
router.post("/suggestion", async (req, res) => {
    try {
        const { admissionNumber, studentName, question } = req.body;
        const newSuggestion = new Suggestion({ admissionNumber, studentName, question });
        await newSuggestion.save();
        res.json({ success: true, message: "Suggestion submitted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting suggestion", error });
    }
});

// 🔵 2. Fetch all suggestions (for teachers)
router.get("/suggestions", async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching suggestions", error });
    }
});

// 🟠 3. Teacher replies to a suggestion
router.put("/suggestion/:id/reply", async (req, res) => {
    try {
        const { reply } = req.body;
        const updatedSuggestion = await Suggestion.findByIdAndUpdate(req.params.id, { reply }, { new: true });
        res.json({ success: true, message: "Reply added successfully", updatedSuggestion });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error replying to suggestion", error });
    }
});

module.exports = router;
