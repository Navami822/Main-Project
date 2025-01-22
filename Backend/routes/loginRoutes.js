const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema'); 
const cors = require('cors');
const app = express();
app.use(cors());


 // Make sure this path is correct based on your project structure

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // You should move this to an environment variable for better security

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      SECRET_KEY, 
      { expiresIn: '1h' }  // Set token expiration time (1 hour)
    );

    // Respond with success message, token, and role
    return res.status(200).json({
      success: true, 
      message: 'Login successful',
      token,
      role: user.role,
      id:user._id,
      email: user.email

    
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;