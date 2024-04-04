// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const responseService = require('../responseService/ResponseService');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json(responseService.error('Unauthorized - No token provided',401))
    }
    const tokenString = token.split(' ')[1];
    const secretKey = process.env.SECRET_KEY;
    console.log(token);
    const decoded = jwt.verify(tokenString, secretKey);
        req.user_id = decoded.userId;
        req.user_name = decoded.userName;

    next();
  } catch (error) {
    console.log(error);
    return res.json(responseService.error(error.message))
  }
};

module.exports = authenticateUser;
