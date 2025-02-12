const express = require("express");
const mongoose = require("mongoose");
const FinalBmi = require("../schemas/finalbmi"); // Assuming you already have the finalbmi model in a separate file

const app = express();

// Fetch report for a specific userId
app.get("/api/report/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching report for userId:", req.params.userId);

    try {
        // Retrieve students data by userId from the finalbmi collection
        const studentsData = await FinalBmi.find({ userId });

        // Handle the case when no students are found for the given userId
        if (studentsData.length === 0) {
            return res.status(404).json({ message: "No students found for this teacher" });
        }

        // Map the data into a report format
        const report = studentsData.map(({ _id, name, bmi, finalBmi }) => {
            return {
                studentId: _id,  // MongoDB's _id is used as the studentId
                name,
                bmi,
                finalBmi,
                progress: compareBmi(bmi, finalBmi)
            };
        });

        // Return the report
        res.json(report); // Correct response format
    } catch (error) {
        // Return a server error if something goes wrong
        console.error(error);  // Log the error for troubleshooting
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Helper function to compare BMI and determine progress
const compareBmi = (initialBmi, finalBmi) => {
    if (finalBmi > initialBmi) return "Improved";
    if (finalBmi < initialBmi) return "Decreased";
    return "No Change";
};

module.exports = app;
