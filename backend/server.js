require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/blogs', blogRoutes);

// Server Init
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
