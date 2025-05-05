const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
    
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});
module.exports = mongoose.model("Option", optionSchema);
