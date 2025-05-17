const express =require("express")
const router = express.Router()
const{
    getOptions,
    getOption,
    createOption,
    modifyOption
}= require("../controllers/optionController")

//get all Options
router.get("/", getOptions)

//get a single Option
router.get("/:id", getOption)

//create a new Option
router.post("/",createOption)


//modify

router.put("/:id",modifyOption)


module.exports = router;