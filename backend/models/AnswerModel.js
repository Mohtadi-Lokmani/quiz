const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AnswertSchema = new Schema({
  AnswerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  AttempttId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attempt",
    required: true,
    unique: true,
  },
    QuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    OptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
        required: true,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose.model("Answer", AnswertSchema);
