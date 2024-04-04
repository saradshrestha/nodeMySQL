// controllers/userController.js
const User = require('../models/userModel');
const { json } = require('body-parser');
const responseService = require('../responseService/ResponseService');
const FileUploader = require('../global/FileUploader');
const fileUploaderfn = new FileUploader();


exports.profileUpdate = async (req, res) => {
  try {
    const user = await User.findOne({ 
            where: { id: req.user_id }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
          });
    if (!user) return res.status(404).json(responseService.error('User Not Found', 404));

    const { name, email } = req.body;
    user.name = name;
   
    // console.log(req.files);
    if (req.files && req.files.length > 0) {
      // Handle file upload
      var image = '';
      fileUploaderfn.single('image')(req, res, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        } else {

          image = (req.file);
          console.log(image,'image ');
        }
      });
      // console.log(uploaded,'uploaded');
      // return res.json(uploaded);
      // const uploadedImageId = req.file.id; // Adjust this according to your file upload logic
      // user.profile_image_id = uploadedImageId;
    }

    await user.save();
    return res.json(responseService.success(user,'Successfully Updated',200));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
