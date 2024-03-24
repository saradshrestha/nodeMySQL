// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const responseService = require('../responseService/ResponseService');
const FileUploader = require('../global/FileUploader');
const fileUploaderfn = new FileUploader();
const sendVerificationMail = require('../mail/userVerificationMail');



// Register a new user
exports.registerUser = async (req, res) => {
  try {   
    const { name, email, password, file } = req.body;
    var uploadedImage='';
    if(file){
      var uploaded = fileUploaderfn.single('image')(req, res, async (err) => {
        if (err) {
          return res.send(responseService.error(err.message));
        }
      });
      uploadedImage = uploaded;
    }
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ name, email, hash,uploadedImage });
      if(user){
        await sendVerificationMail(user.email);
        res.send(responseService.success(user, 'User successfully registered.',200));
      } 
      res.send(responseService.error("Something Went Wrong."));
  } catch (error) {
    res.send(responseService.error(error.message ));
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
