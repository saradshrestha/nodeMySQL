const { check, validationResult } = require('express-validator');

exports.userStoreValidationRules = [
  check('name').notEmpty().withMessage('Please enter your name'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('email').notEmpty().withMessage('Please enter email'),
  check('email').custom(async (value) => {
    const existingUser = await User.findOne({ where: { email: value.toLowerCase() } });
    if (existingUser) {
      throw new Error('Email address is already in use.');
    }
  }),

  check('password').notEmpty().withMessage('Please enter your password'),
  check('password').isLength({min:6}).withMessage('Please enter your password'),

  check('confirm_password').notEmpty().withMessage('Please enter your comfirm password'),

];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};