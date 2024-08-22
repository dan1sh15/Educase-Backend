const express = require('express');
const { addSchool, allSchoolDetails } = require('../controllers/school');
const router = express.Router();

router.post('/addSchool', addSchool);
router.get(`/listSchools`, allSchoolDetails);

module.exports = router;