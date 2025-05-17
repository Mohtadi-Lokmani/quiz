const Question = require("../models/questionModel");
const mongoose = require("mongoose");
const Option = require("../models/optionModel");
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

  
  // Modify an existing question
const modifyQuestion = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  try {
    const question = await Question.findByIdAndUpdate(id, { text }, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating question" });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Delete all options associated with the question
    await Option.deleteMany({ questionId: id });

    res.status(200).json({ message: "Question and its options deleted successfully", question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting question and its options" });
  }
};

module.exports = {
    getQuestions,
    getQuestion,
    createQuestion,
    modifyQuestion,
    deleteQuestion

};
