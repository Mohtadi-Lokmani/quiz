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
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Attempt", AttemptSchema);
