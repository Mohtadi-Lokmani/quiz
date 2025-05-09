const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


questionSchema.virtual('options', {
  ref: 'Option',
  localField: '_id',
  foreignField: 'questionId'
});

module.exports = mongoose.model('Question', questionSchema);
