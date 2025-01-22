const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const loginRoutes=require('./routes/loginRoutes');
const bmiRoutes = require('./routes/bmiRoutes'); // Correct BMI route import
const Doubt = require("./schemas/doubtSchema");
const studentRoutes = require('./routes/studentRoutes');
const FinalBMI=require('./routes/finalbmiRoutes');
const bmitableRoutes=require('./routes/bmitableRoutes')
const doubtRoutes=require('./routes/doubtRoutes');
const studentBmiRoutes=require('./routes/studentBmiRoutes');
// Middleware
const cors = require('cors');
const app = express();
app.use(cors());


app.use(express.json());

// Connect to MongoDB
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  

  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/register', userRoutes);
app.use('/', loginRoutes);
app.use('/', studentRoutes);
app.use('/api/bmi',FinalBMI)
app.use('/api',studentBmiRoutes)
app.use('/api',bmitableRoutes)
app.get("/api/doubts", async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.status(200).json(doubts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.use('/api', doubtRoutes);

app.use('/bmicalculation', bmiRoutes); // Correct BMI route usage


// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
