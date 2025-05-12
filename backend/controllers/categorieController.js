const Categorie = require("../models/categorieModel");
const mongoose = require("mongoose");

// Get all categories
const getCategories = async (req, res) => {
    const categories = await Categorie.find({}).sort({ createdAt: -1 });
    res.status(200).json(categories);
};

// Get a single categorie
const getCategorie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Categorie' });
    }

    const categorie = await Categorie.findById(id);
    if (!categorie) {
        return res.status(404).json({ error: 'No such categorie' });
    }

    res.status(200).json(categorie);
};

// Create a new categorie
const createCategorie = async (req, res) => {
    const { label, icon } = req.body;
  
    try {
      const categorie = await Categorie.create({ label, icon });
      res.status(200).json(categorie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
 



// Delete category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category' });
    }

    try {
        const category = await Categorie.findOneAndDelete({ _id: id });
        if (!category) {
            return res.status(404).json({ error: 'No such category' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getCategories,
    getCategorie,
    createCategorie,
    deleteCategory
};

