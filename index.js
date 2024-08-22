const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use('/api/v1', schoolRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Synchronize the model with the database (creates the table if it doesn't exist)
        await sequelize.sync();
        console.log('School model was synchronized successfully.');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();