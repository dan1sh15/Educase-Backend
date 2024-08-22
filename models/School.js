const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the School model with validations
const School = sequelize.define('School', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name cannot be empty' },
            isString(value) { // Custom validation
                if (typeof value !== 'string') {
                    throw new Error('Name must be a string');
                }
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Address cannot be empty' },
            isString(value) { // Custom validation
                if (typeof value !== 'string') {
                    throw new Error('Address must be a string');
                }
            }
        }
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: { msg: 'Latitude must be a valid float' }
        }
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: { msg: 'Longitude must be a valid float' }
        }
    }
}, {
    tableName: 'schools',
    timestamps: false
});

module.exports = School;