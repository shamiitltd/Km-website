const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

// GET /api/crop-advisory - Dynamic real-time Indian crop advisory
router.get('/', cropController.getCropAdvisory);

// GET /api/crop-advisory/crops - List of supported Indian crops
router.get('/crops', cropController.getAvailableCrops);

// GET /api/crop-advisory/pests - Consolidated list of all Indian agricultural pests and diseases
router.get('/pests', cropController.getAllPestsAndDiseases);

// POST and GET /api/crop-advisory/calculate-fertilizer - ICAR formula fertilizer calculator
router.post('/calculate-fertilizer', cropController.calculateFertilizer);
router.get('/calculate-fertilizer', cropController.calculateFertilizer);

module.exports = router;
