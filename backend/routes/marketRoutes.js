const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

// GET /api/market-prices - All commodity prices for a location
router.get('/', marketController.getMarketPrices);

// GET /api/market-prices/:id - Single commodity detail with multi-mandi data
router.get('/:id', marketController.getCommodityDetail);

module.exports = router;
