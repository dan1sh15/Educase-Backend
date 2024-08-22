const { Sequelize } = require('sequelize');

// Set up a Sequelize instance and connect to your MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false // Disable logging; default: console.log
});

module.exports = sequelize;