const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { create } = require('domain');
const UploadFile = require('../models/uploadFileModel');

class FileUploader {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const originalImagePath = `uploads/${year}/${month}/${day}/${filename}`;
        const resizeImagePath = `uploads/resize/${year}/${month}/${day}/${filename}`;
        //Creating foler if does not exists
        try{
          fs.mkdirSync(originalImagePath, { recursive: true });
          fs.mkdirSync(resizeImagePath, { recursive: true });

          cb(null, originalImagePath);
        } catch (error) {
          cb(error, null);
        }
         
      },
      filename: async (req, file, cb) => {

        const filename = file.originalname;
        var ext = path.extname(filename).toLowerCase();
        const originalPath = `uploads/${year}/${month}/${day}/original/${filename}`;
        const resizeImagePath = `uploads/${year}/${month}/${day}/resize/${filename}`;


        // Resize image using sharp if it's an image
        if (file.mimetype.startsWith('image/')) {
          await sharp(file.path).resize({ width: 300, height: 300 }).toFile(resizeImagePath);
          // If you want to keep the original file as well, comment the line above and uncomment the line below
          await sharp(file.path).toFile(originalPath);
        }else{
          fs.renameSync(file.path, originalPath);
        }
        
        // Store To database
        try {
          const uploaded = await UploadFile.create({
            filename: filename,
            path: originalPath,
            resize_path: resizeImagePath,
            ext: ext,
          });
          cb(null, uploaded);
        } catch (error) {
          cb(error, null);
        }
      },
    });

    this.upload = multer({ storage: this.storage });
  }

  multiple(fieldName, maxCount=null) {
    return this.upload.array(fieldName, maxCount);
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }
}

module.exports = FileUploader;
