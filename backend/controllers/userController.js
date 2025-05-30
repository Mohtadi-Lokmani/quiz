const User = require("../models/userModel");
const Quiz = require("../models/QuizModel");
const Attempt = require("../models/AttemptModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');


//get all users

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
};

//get user by id
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        
        res.status(200).json({
            _id: user._id,  
            name: user.name,
            email: user.email,
            role:user.role,
            token
          });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);
        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToDelete.role === 'admin') {
      return res.status(403).json({ error: 'Cannot delete admin user' });
    }

    await User.findByIdAndDelete(id);

  
    const quizResult = await Quiz.deleteMany({ userId: id });     
    const attemptResult = await Attempt.deleteMany({ userId: id });

    

    res.status(200).json({ message: 'User, their quizzes, and attempts deleted successfully' });

  } catch (err) {
    console.error('Error deleting user:', err);  // Add this
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};



module.exports = { signupUser, loginUser ,getUser ,getUsers , deleteUser, updateUser }; 
