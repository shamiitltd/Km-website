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

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/seo', seoRoutes);

// Server Init
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
