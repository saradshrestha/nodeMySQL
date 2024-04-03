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


exports.profileUpdate = async (req, res) => {
  
  try {
    const user = await User.findOne({ 
            where: { email }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
          });

    if (!user) {
      return res.json(responseService.error('Invalid Email Address.', 404));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json(responseService.error('Password Does Not Match', 401));
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
