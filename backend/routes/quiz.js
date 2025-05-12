const express =require("express")
const router = express.Router()
const{
    getQuizs,
    getQuiz,
    createQuiz,
    deleteQuiz
    
}= require("../controllers/quizController")

const requireAuth = require("../middleware/requireAuth")



//get all Quizs
router.get("/", getQuizs)


//get a single Quiz
router.get("/:id", getQuiz)

//authenticate all routes
router.use(requireAuth)


//create a new Quiz
router.post("/",createQuiz)

router.delete("/:id",deleteQuiz)


module.exports = router;