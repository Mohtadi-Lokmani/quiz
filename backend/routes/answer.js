const express =require("express")
const router = express.Router()
const{
   getAnswers,
    getAnswer,
    createAnswer,
}= require("../controllers/AnswerController")

//get all categories
router.get("/", getAnswers)

//get a single Categorie
router.get("/:id", getAnswer)

//create a new Categorie
router.post("/",createAnswer)



module.exports = router;

