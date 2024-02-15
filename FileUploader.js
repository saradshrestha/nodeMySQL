const multer = require('multer');
const fs = require('fs');

class FileUploader {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const uploadPath = `uploads/${year}/${month}/${day}`;
        cb(null, uploadPath);

        // Create the folder structure if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });

    this.upload = multer({ storage: this.storage });
  }

  multiple(fieldName, maxCount) {
    return this.upload.array(fieldName, maxCount);
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }
}

module.exports = FileUploader;
