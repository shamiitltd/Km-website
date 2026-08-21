const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { requireAdminPassword } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected Routes
router.post('/', requireAdminPassword, createBlog);
router.put('/:id', requireAdminPassword, updateBlog);
router.delete('/:id', requireAdminPassword, deleteBlog);

module.exports = router;
