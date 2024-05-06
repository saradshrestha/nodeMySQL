'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }
  Post.init({
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      status: {
        type: DataTypes.ENUM,
        values:['Active','Inactive'],
        allowNull:false
        
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};