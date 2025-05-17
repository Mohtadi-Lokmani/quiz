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

 
  // Modify an existing option
const modifyOption = async (req, res) => {
  const { id } = req.params;
  const {  text, isCorrect, } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid option ID' });
  }

  try {
    const option = await Option.findByIdAndUpdate(id, {  text, isCorrect, }, { new: true });
    if (!option) {
      return res.status(404).json({ error: 'option not found' });
    }

    res.status(200).json(option);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating question" });
  }
};



module.exports = {
    getOptions,
    getOption,
    createOption,
    modifyOption
};
