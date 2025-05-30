const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
   
  },
  description: {
    type: String,
    required: true,
  },
  categorie: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
});
module.exports = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

