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
  }
  
});
module.exports = mongoose.model("Quiz", quizSchema);
