const express =require("express")
const router = express.Router()
const{
    getQuizs,
    getQuiz,
    createQuiz,
    
}= require("../controllers/quizController")

//get all Quizs
router.get("/", getQuizs)

//get a single Quiz
router.get("/:id", getQuiz)

//create a new Quiz
router.post("/",createQuiz)



module.exports = router;