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
        return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    try {
        const existingQuiz = await Quiz.findOne({ title });
        const currentQuiz = await Quiz.findById(id);

        if (!currentQuiz) {
            return res.status(404).json({ error: 'No such quiz' });
        }

        if (existingQuiz && existingQuiz._id.toString() !== id) {
            return res.status(400).json({ error: 'Title already in use' });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { title, description, categorie },
            { new: true }
        );

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
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
