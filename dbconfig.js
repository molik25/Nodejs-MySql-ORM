const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('orm', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Use 'mysql' for MySQL
});

module.exports = sequelize;
