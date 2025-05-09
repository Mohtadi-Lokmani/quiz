const express =require("express")
const router = express.Router()
const{
    getMyQuizs,
    getMyQuiz,
    modifyMyQuiz,
    deleteMyQuiz,
    
    
}= require("../controllers/myquizController")

const requireAuth = require("../middleware/requireAuth")

//authenticate all routes
router.use(requireAuth)

//get all Quizs
router.get("/", getMyQuizs)


//get a single Quiz
router.get("/:id", getMyQuiz)


//modify a single Quiz
router.put("/:id", modifyMyQuiz)

//delete a single Quiz
router.delete("/:id", deleteMyQuiz)




module.exports = router;