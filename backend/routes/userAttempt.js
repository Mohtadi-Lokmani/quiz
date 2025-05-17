
const express = require('express');
const router = express.Router();
const{
    getAttemptsByQuizId
}= require("../controllers/UserattemptController")


const requireAuth = require('../middleware/requireAuth');

router.get('/:quizId', requireAuth, getAttemptsByQuizId);



module.exports = router;
