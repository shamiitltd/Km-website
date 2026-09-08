const express = require('express');
const router = express.Router();
const { 
  subscribeNewsletter,
  getBroadcastStats,
  sendTestBroadcast,
  dispatchManualBroadcast
} = require('../controllers/newsletterController');
const { requireAdminPassword } = require('../middleware/authMiddleware');

// Public Route: Subscribe to newsletter or waitlist
router.post('/subscribe', subscribeNewsletter);

// Protected Admin Routes: Manual broadcast & stats
router.get('/stats', requireAdminPassword, getBroadcastStats);
router.post('/test-broadcast', requireAdminPassword, sendTestBroadcast);
router.post('/broadcast', requireAdminPassword, dispatchManualBroadcast);

module.exports = router;
