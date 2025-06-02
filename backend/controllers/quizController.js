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
  const { title, description, categorie, userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }
  
    

  try {
    const newQuiz = new Quiz({
      title,
      description,
      categorie,
      userId, 
    });
    
    const exists = await Quiz.findOne({ title });
    if (exists) {
        throw new Error('title already in use');
    }

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    try {
        const quiz = await Quiz.findOneAndDelete({ _id: id });
        if (!quiz) {
            return res.status(404).json({ error: 'No such quiz' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
    getQuizs,
    getQuiz,
    createQuiz,
    deleteQuiz
};
