const express = require('express');
const router = express.Router();
const{
    getAttemptsid
    
    
}= require("../controllers/myAttemptController")
const requireAuth = require("../middleware/requireAuth");

// Authenticate all routes
router.use(requireAuth);


router.get("/", getAttemptsid);

module.exports = router;
