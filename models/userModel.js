// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));
const uploadFile = require('./uploadFileModel');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profile_image_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

User.belongsTo(uploadFile, { foreignKey: 'profile_image_id' });

module.exports = User;
