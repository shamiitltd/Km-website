const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather?city=Noida OR ?lat=28.5355&lon=77.3910
router.get('/', weatherController.getWeather);

module.exports = router;
