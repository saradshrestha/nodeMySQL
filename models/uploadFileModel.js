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
});



UploadFile.hasOne(User, { foreignKey: 'profile_image_id' });

module.exports = UploadFile;