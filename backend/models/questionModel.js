
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: {
    type: String,
    required: true 
    },
  quizId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true },
});

module.exports = mongoose.model("Question", questionSchema);
