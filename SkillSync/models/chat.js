const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);