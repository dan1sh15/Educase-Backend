const School = require('../models/School');
const { validationResult } = require('express-validator');

exports.addSchool = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { name, address, latitude, longitude } = req.body;

        if(!name || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newSchool = await School.create({
            name,
            address,
            latitude: latitude || null,
            longitude: longitude || null,
        });

        return res.status(200).json({
            success: true,
            message: "School added successfully",
            data: newSchool,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error adding school data",
        });
    }
};

exports.allSchoolDetails = async (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate user input
    if (!latitude || !longitude) {
        return res.status(400).json({ 
            success: false,
            message: 'Latitude and longitude are required.'
        });
    }
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ 
            success: false,
            message: 'Latitude and longitude must be valid numbers.' 
        });
    }

    try {
        // Fetch all schools from the database
        const schools = await School.findAll();

        // Calculate distance for each school and sort by distance
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school.toJSON(), distance };
        }).sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            message: "School data fetched successfully",
            data: sortedSchools,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching schools' 
        });
    }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    // using Haversine formula found in wikipedia -> https://en.wikipedia.org/wiki/Haversine_formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};