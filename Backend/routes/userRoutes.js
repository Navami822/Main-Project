const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../schemas/userSchema');

router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, email, institution, contact, password, role } = req.body;

    // Check if the user is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the role passed from the client
    const newUser = new User({
      firstname,
      lastname,
      email,
      institution,
      contact,
      password: hashedPassword,
      role,  // The role can now be "teacher" or "student"
    });

    await newUser.save();
    res.status(200).json({ message: 'Registration successful! Please log in below.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get("/teachers", async (req, res) => {
  try {
      const teachers = await User.find({ role: "teacher" }).select("_id firstname lastname email");
      res.json(teachers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;