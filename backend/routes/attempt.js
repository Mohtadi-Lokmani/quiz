const express = require('express');
const router = express.Router();
const { getAttempts, getAttempt, createAttempt } = require('../controllers/AttemptController');

// Get all attempts
router.get("/", getAttempts);

// Get a single attempt
router.get("/:id", getAttempt);

// Create a new attempt
router.post("/", createAttempt);

module.exports = router;
