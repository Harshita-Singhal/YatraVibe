const express = require('express');
const router = express.Router();
const { generateSmartItinerary } = require('../controllers/itineraryController');

router.post('/generate', generateSmartItinerary);

module.exports = router;
