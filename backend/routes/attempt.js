const express =require("express")
const router = express.Router()
const{
    
    getAttempts,
    getAttempt,
    createAttempt,
}= require("../controllers/AttemptController")

//get all categories
router.get("/", getAttempts)

//get a single Categorie
router.get("/:id", getAttempt)

//create a new Categorie
router.post("/",createAttempt)



module.exports = router;

