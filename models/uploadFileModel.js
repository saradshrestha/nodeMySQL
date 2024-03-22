// models/uploadFileModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));
const User = require('./userModel')


const UploadFile = sequelize.define('UploadFile', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resize_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



// UploadFile.hasOne(User);`

module.exports = UploadFile;