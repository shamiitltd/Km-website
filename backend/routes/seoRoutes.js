const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

// Public XML Sitemap & Robots routes
router.get('/sitemap.xml', seoController.getSitemapXml);
router.get('/robots.txt', seoController.getRobotsTxt);

// Public settings & redirect lookup
router.get('/settings', seoController.getSeoSettings);
router.get('/check-redirect', seoController.checkRedirect);

// Admin-protected configuration & redirect routes
router.put('/settings', seoController.updateSeoSettings);
router.get('/redirects', seoController.getRedirects);
router.post('/redirects', seoController.createRedirect);
router.delete('/redirects/:id', seoController.deleteRedirect);

module.exports = router;
