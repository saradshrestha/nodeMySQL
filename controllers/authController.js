// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const responseService = require('../responseService/ResponseService');
const { response } = require('express');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate a token for the user
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    const response = responseService.success({ user : user, token : token }, 'User successfully registered.');
    res.send(response);

  } catch (error) {
    res.send(responseService.error({error: error.message}));
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.send(responseService.error('User Not Found.',404)); 
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send(responseService.error('Invalid email or password',401)); 
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.send(responseService.success({user: user,token:token},"Successfully Logged In."),200);

    // res.json({ user, token });
  } catch (error) {
    res.send(responseService.error(error.message));
  }
};
