const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CategorieSchema = new Schema({
    
   label: {
    type: String,
    required: true,
   
    },
  icon: {
    type: String,
    required: true,
    },
  
    
  
  
});
module.exports = mongoose.model("Categorie", CategorieSchema);
