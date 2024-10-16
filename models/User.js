const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');
const Post = require('./post');

const  User = sequelize.define('User', {
        username : {
            type : DataTypes.STRING,
            allowNull: false,
            unique : true
        }
})

User.hasMany(Post, { foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;