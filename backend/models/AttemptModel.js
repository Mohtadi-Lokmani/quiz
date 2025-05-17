const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AttemptSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
      required: true,
      default : null
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Attempt", AttemptSchema);