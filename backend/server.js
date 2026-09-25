require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const seoRoutes = require('./routes/seoRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cropRoutes = require('./routes/cropRoutes');
const marketRoutes = require('./routes/marketRoutes');
const seoController = require('./controllers/seoController');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy for accurate https protocol resolution in production
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Search Engine Directives & XML Sitemap
app.get('/sitemap.xml', seoController.getSitemapXml);
app.get('/robots.txt', seoController.getRobotsTxt);

const fs = require('fs');

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/crop-advisory', cropRoutes);
app.use('/api/market-prices', marketRoutes);

// --------------------------------------------------------------------------
// Serve Frontend Static Build Files (Production / Unified Deployment)
// --------------------------------------------------------------------------
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// --------------------------------------------------------------------------
// SPA Fallback Middleware
// Handles direct browser navigation and page refresh on client-side routes
// (e.g. /about, /blog, /contact, /features, /weather, /market-prices)
// --------------------------------------------------------------------------
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  // Never intercept API endpoints, uploaded media, sitemap or robots
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/uploads')
  ) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  // Return index.html for all frontend routes
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  next();
});

// Server Init
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
