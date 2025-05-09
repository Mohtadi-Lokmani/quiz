const express =require("express")
const router = express.Router()
const{
    getQuizs,
    getQuiz,
    createQuiz,
    getQuizsByUser
    
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





module.exports = router;