const express =require("express")
const router = express.Router()
const{
    getMyQuizs,
    getMyQuiz,
    
    
}= require("../controllers/myquizController")

const requireAuth = require("../middleware/requireAuth")

//authenticate all routes
router.use(requireAuth)

//get all Quizs
router.get("/", getMyQuizs)


//get a single Quiz
router.get("/:id", getMyQuiz)





module.exports = router;