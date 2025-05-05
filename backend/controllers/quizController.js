const Quiz = require("../models/quizModel");
const mongoose = require("mongoose");

// Get all quizzes
const getQuizs = async (req, res) => {
    const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
    res.status(200).json(quizzes);
};

// Get a single quiz
const getQuiz = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    res.status(200).json(quiz);
};

// Create a new quiz
const createQuiz = async (req, res) => {
    const { title, description, categorie } = req.body;
  
    if (!title || !description || !categorie ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const quiz = await Quiz.create({ title, description, categorie });
      res.status(200).json(quiz);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
module.exports = {
    getQuizs,
    getQuiz,
    createQuiz
};
