const Attempt = require("../models/AttemptModel");
const mongoose = require("mongoose");

const getAttemptsid = async (req, res) => {
  const userId = req.user._id;

  try {
    const attempts = await Attempt.find({ userId })
      .sort({ createdAt: -1 })
      .populate('quizId');

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
};

module.exports = {
  getAttemptsid
};
