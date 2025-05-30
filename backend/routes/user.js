const express =require("express")
const router = express.Router()
const User = require("../models/userModel")
const{
    signupUser,
    loginUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    
}= require("../controllers/userController")

// get all users
 router.get("/", getUsers)


//get user
router.get("/:id", getUser)

// login user
router.post('/login',loginUser)


// signup user
router.post('/signup',signupUser)

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);




module.exports = router;