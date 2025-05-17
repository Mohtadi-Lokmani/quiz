const express =require("express")
const router = express.Router()
const{
    getQuestions,
    getQuestion,
    createQuestion,
    modifyQuestion,
    deleteQuestion

}= require("../controllers/QuestionController")

//get all Questions
router.get("/", getQuestions)

//get a single Question
router.get("/:id", getQuestion)

//create a new Question
router.post("/",createQuestion)


//modify
router.put("/:id",modifyQuestion)

//delete

router.delete("/:id",deleteQuestion)


module.exports = router;