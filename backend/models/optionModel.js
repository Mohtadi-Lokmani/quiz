const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }
});

module.exports = mongoose.model('Option', optionSchema);
