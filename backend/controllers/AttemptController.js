const Attempt = require("../models/AttemptModel");
const mongoose = require("mongoose");

// Get all Attempts
const getAttempts = async (req, res) => {
    const attempts = await Attempt.find({}).sort({ createdAt: -1 });
    res.status(200).json(attempts);
};



// Get a single Attempt
const getAttempt = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such attempt' });
    }

    const attempt = await Attempt.findById(id);
    if (!attempt) {
        return res.status(404).json({ error: 'No such attempt' });
    }

    res.status(200).json(attempt);
};


// Create a new Attempt
const createAttempt = async (req, res) => {
    const { userId, quizId, score } = req.body;
    const attempt = await Attempt.create({ userId, quizId, score });
    res.status(200).json(attempt);
};


module.exports = {
    getAttempts,
    getAttempt,
    createAttempt
};
