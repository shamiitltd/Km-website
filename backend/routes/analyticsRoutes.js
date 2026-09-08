const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Client tracking routes
router.post('/track', analyticsController.trackPageView);
router.post('/heartbeat', analyticsController.heartbeat);
router.post('/leave', analyticsController.leaveSession);

// Admin statistics route
router.get('/stats', analyticsController.getAnalyticsStats);

module.exports = router;
