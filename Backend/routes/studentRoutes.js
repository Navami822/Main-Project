const express = require('express');
const Student = require('../schemas/bmiSchema'); 
const cors = require('cors');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());





// Route to fetch student details based on email
app.get('/student-details', async (req, res) => {
  const email = req.query.email;  // Get email from query parameter

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  try {
    const student = await Student.findOne({ email });  // Find student by email

    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    // Send the student data as response
    res.json({ student });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error. Please try again later.' });
  }
});

module.exports = app;
