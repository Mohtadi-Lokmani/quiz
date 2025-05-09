const Quiz = require("../models/quizModel");
const mongoose = require("mongoose");


// Get all quizzes
const getMyQuizs = async (req, res) => {
  const userId = req.user._id; 
    const Myquizzes = await Quiz.find({userId}).sort({ createdAt: -1 });
    res.status(200).json(Myquizzes);
};

// Get a single quiz
const getMyQuiz = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    const myquiz = await Quiz.findById(id);
    if (!myquiz) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    res.status(200).json(myquiz);
};

// modify a quiz
const modifyMyQuiz = async (req, res) => {
    const { id } = req.params;
    const { title, description, categorie } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    const myquiz = await Quiz.findByIdAndUpdate(id, { title, description, categorie }, { new: true });
    if (!myquiz) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    res.status(200).json(myquiz);
};

// delete a quiz
const deleteMyQuiz = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    const myquiz = await Quiz.findByIdAndDelete(id);
    if (!myquiz) {
        return res.status(404).json({ error: 'No such quiz' });
    }

    res.status(200).json(myquiz);
};

  
module.exports = {
    getMyQuizs,
    getMyQuiz,
    modifyMyQuiz,
    deleteMyQuiz
   
    
};
