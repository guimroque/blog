'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    post: DataTypes.STRING,
    email: DataTypes.STRING,
    autor: DataTypes.STRING,
    vistos: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};