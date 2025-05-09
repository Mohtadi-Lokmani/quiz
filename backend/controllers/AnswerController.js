const Answer = require("../models/AnswerModel");
const mongoose = require("mongoose");

// Get all Answers
const getAnswers = async (req, res) => {
    const answers = await Answer.find({}).sort({ createdAt: -1 });
    res.status(200).json(answers);
};


// Get a single answer
const getAnswer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such answer' });
    }

    const answer = await Answer.findById(id);
    if (!answer) {
        return res.status(404).json({ error: 'No such answer' });
    }

    res.status(200).json(answer);
};

// Create a new answer
const createAnswer = async (req, res) => {
    const {  AttemptId, QuestionId, OptionId, isCorrect } = req.body;

    

    try {
        const answer = await Answer.create({ AttemptId, QuestionId, OptionId, isCorrect });
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAnswers,
    getAnswer,
    createAnswer
};
