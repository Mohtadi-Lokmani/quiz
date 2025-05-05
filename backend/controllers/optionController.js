const Option = require("../models/optionModel");
const mongoose = require("mongoose");

// Get all options
const getOptions = async (req, res) => {
    const options = await Option.find({}).sort({ createdAt: -1 });
    res.status(200).json(options);
};

// Get a single option
const getOption = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such option' });
    }

    const option = await Option.findById(id);
    if (!option) {
        return res.status(404).json({ error: 'No such option' });
    }

    res.status(200).json(option);
};

// Create a new option
const createOption = async (req, res) => {
    const { text, isCorrect, questionId } = req.body;
    const option = await Option.create({ text, isCorrect, questionId });
    res.status(200).json(option);
};

module.exports = {
    getOptions,
    getOption,
    createOption
};
