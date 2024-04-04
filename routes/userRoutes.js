// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { userProfileUpdateValidationRules, validate } = require('../validations/userProfileUpdateValidation');


router.post('/profile-update',authMiddleware,userProfileUpdateValidationRules,validate, userController.profileUpdate);


module.exports = router;
