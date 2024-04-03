// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const responseService = require('../responseService/ResponseService');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json(responseService.error('Unauthorized - No token provided',401))
    }
    const secretKey = process.env.SECRET_KEY || 'fallback_secret_key';
    // const token1 = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    // return res.json({token:token,token1:secretKey});
    const decoded = jwt.verify(token, secretKey);
        req.user_id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.json(responseService.error(error.message))
  }
};

module.exports = authenticateUser;
