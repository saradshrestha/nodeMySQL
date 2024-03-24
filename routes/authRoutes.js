// routes/index.js
const express = require('express');
const router = express.Router();
const { userStoreValidationRules, validate } = require('../validations/userStoreValidation');
const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', userStoreValidationRules,validate,authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
