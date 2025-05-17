const Attempt = require("../models/AttemptModel");
const mongoose = require("mongoose");


const getAttemptsByQuizId = async (req, res) => {
  const { quizId } = req.params;

  try {
    const attempts = await Attempt.find({ quizId })
      .populate('userId', 'name email') 
      .sort({ createdAt: -1 });

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attempts for this quiz' });
  }
};


module.exports = {
getAttemptsByQuizId,

}
