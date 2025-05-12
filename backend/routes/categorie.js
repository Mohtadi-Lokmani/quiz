const express =require("express")
const router = express.Router()
const{
    getCategories,
    getCategorie,
    createCategorie,
    deleteCategory,
}= require("../controllers/categorieController")

//get all categories
router.get("/", getCategories)

//get a single Categorie
router.get("/:id", getCategorie)

//create a new Categorie
router.post("/",createCategorie)

router.delete("/:id",deleteCategory)



module.exports = router;

