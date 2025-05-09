const Question = require("../models/questionModel");
const mongoose = require("mongoose");

// Get all questions
const getQuestions = async (req, res) => {
  const { quizId } = req.query;

  try {
    const questions = await Question.find({ quizId }).populate('options');
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch questions with options' });
  }
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
    if (!text || !quizId) {
      return res.status(400).json({ message: "Question text and quiz ID are required." });
    }
    try {
      const question = await Question.create({ text, quizId });
      res.status(201).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error while creating the question." });
    }
  };
  

module.exports = {
    getQuestions,
    getQuestion,
    createQuestion
};
