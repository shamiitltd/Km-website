require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple Auth Middleware for Admin Route
const requireAdminPassword = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Fallback for dev

  if (token !== adminPassword) {
    return res.status(403).json({ error: 'Forbidden: Incorrect password' });
  }

  next();
};

// GET /api/blogs - Fetch all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc' // Newest first
      }
    });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST /api/blogs - Create a new blog (Protected)
app.post('/api/blogs', requireAdminPassword, async (req, res) => {
  try {
    const { title, content, category, author, readTime, imageUrl } = req.body;

    if (!title || !content || !category || !author || !readTime || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        category,
        author,
        readTime,
        imageUrl
      }
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
