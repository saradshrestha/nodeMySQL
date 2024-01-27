// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/users', userController.getAllUsers);

router.post('/user-submit',userMiddleware, userController.createUser);

module.exports = router;
