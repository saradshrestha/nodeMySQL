const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');
const UploadFile = require('../models/uploadFileModel');

class FileUploader {
  constructor() {
    this.storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const folderPath = `uploads/${year}/${month}/${day}`;
        const originalPath = `${folderPath}/original`;
        const resizePath = `${folderPath}/resize`;

        try {
          await fs.mkdir(originalPath, { recursive: true });
          await fs.mkdir(resizePath, { recursive: true });
          cb(null, originalPath);
        } catch (error) {
          cb(error, null);
        }
      },
      filename: async (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${Date.now()}${ext}`;
        const originalPath = file.path.replace('/original', ''); // Adjust the path
        const resizePath = originalPath.replace('/original', '/resize'); // Adjust the path

        try {
          if (file.mimetype.startsWith('image/')) {
            await sharp(file.path).resize({ width: 300, height: 300 }).toFile(resizePath);
          } else {
            await fs.rename(file.path, originalPath);
          }

          const uploaded = await UploadFile.create({
            filename: filename,
            path: originalPath,
            resize_path: resizePath,
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

  multiple(fieldName, maxCount = null) {
    return this.upload.array(fieldName, maxCount);
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }
}

module.exports = FileUploader;
