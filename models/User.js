const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  token: String,
  name: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
