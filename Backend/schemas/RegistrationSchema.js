const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Teacher', 'Student'], default: 'Teacher' },
});

const Client = mongoose.model('Client', registrationSchema);
module.exports = Client;
