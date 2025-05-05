const Question = require("../models/questionModel");
const mongoose = require("mongoose");

// Get all questions
const getQuestions = async (req, res) => {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.status(200).json(questions);
};

// Get a single question
const getQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such question' });
    }

    const question = await Question.findById(id);
    if (!question) {
        return res.status(404).json({ error: 'No such question' });
    }

    res.status(200).json(question);
};

// Create a new question
const createQuestion = async (req, res) => {
    const { text, quizId } = req.body;
    const question = await Question.create({ text, quizId });
    res.status(200).json(question);
};

module.exports = {
    getQuestions,
    getQuestion,
    createQuestion
};
