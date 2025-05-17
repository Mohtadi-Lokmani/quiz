const Attempt = require("../models/AttemptModel");
const mongoose = require("mongoose");

// Get all attempts
const getAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({}).sort({ createdAt: -1 });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
};



// Get a single attempt
const getAttempt = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such attempt" });
  }

  try {
    const attempt = await Attempt.findById(id).populate('answers.questionId answers.optionId');
    if (!attempt) {
      return res.status(404).json({ error: "No such attempt" });
    }
    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the attempt" });
  }
};

// Create a new attempt with answers
const createAttempt = async (req, res) => {
  const { userId, quizId, answers } = req.body;

  // Check if userId, quizId, and answers are provided
  if (!userId || !quizId || !answers) {
    return res.status(400).json({ error: "Please provide userId, quizId, and answers" });
  }

  // Log the incoming request to inspect its structure
  console.log(req.body);

  // Validate each answer to ensure both questionId and optionId are present
  const missingFields = answers.filter(a => !a.questionId || !a.optionId);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Please provide all required fields for each answer",
      missingFields
    });
  }

  try {
    // Calculate score based on correct answers
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = answers.length;
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    // Create the attempt with answers
    const attempt = await Attempt.create({
      userId,
      quizId,
      score,
      answers
    });

    res.status(201).json(attempt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






module.exports = {
  getAttempts,
  getAttempt,
  createAttempt
  
};
