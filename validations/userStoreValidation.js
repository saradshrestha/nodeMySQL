const { check, validationResult } = require('express-validator');
const User = require('../models/userModel');

exports.userStoreValidationRules = [
  
  check('name').notEmpty().withMessage('Please enter your name'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('email').notEmpty().withMessage('Please enter email'),
 
  check('password').notEmpty().withMessage('Please enter your password'),
  check('password').isLength({min:6}).withMessage('Please enter your password'),

  // check('confirm_password').notEmpty().withMessage('Please enter your comfirm password'),
  check('email').custom(async (value) => {
    const existingUser = await User.findOne({ where: { email: value } });
    console.log(existingUser);
    if (existingUser) {
      throw new Error('Email address is already in use.',422);
    }
  }),

];

exports.validate = (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(error => ({
        field: error.path, // or error.path if using express-validator 5.x
        message: error.msg
      }));
  
      return res.status(422).json({ errors: formattedErrors});
    }
    return next();
  }
    catch (error) {
      return res.status(422).json({ errors: [{ field: 'email', message: error.message }] });
    }

};