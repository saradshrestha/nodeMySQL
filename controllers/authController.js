// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const responseService = require('../responseService/ResponseService');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {   
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(password,email);
    const user = await User.create({ name, email, password: hash });
    const response = responseService.success(user, 'User successfully registered.');
    res.json(response);

  } catch (error) {
    res.json(responseService.error( error.message ));
  }
};



// Login an existing user
exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.send(responseService.error('User Not Found.', 404));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send(responseService.error('Invalid email or password', 401));
    }

    const secretKey = process.env.SECRET_KEY || 'fallback_secret_key';

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.send(responseService.success({ user: user, token: token }, "Successfully Logged In."), 200);

    // res.json({ user, token });
  } catch (error) {
    res.send(responseService.error(error.message));
  }
};