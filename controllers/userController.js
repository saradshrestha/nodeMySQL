// controllers/userController.js
const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    // const users = await User.findAll();
    let allUsers = { 
      'name' : 'SaradTest',
      'id' : 1
    }
    const users = await User.findAll();

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({ name, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
