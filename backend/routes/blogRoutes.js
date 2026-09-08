const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  getMediaFiles,
  getCategoriesSummary,
  getTagsSummary,
  getAllComments,
  updateCommentStatus,
  deleteComment
} = require('../controllers/blogController');
const { requireAdminPassword } = require('../middleware/authMiddleware');
const { handleImageUpload } = require('../middleware/uploadMiddleware');

// Specific endpoints (MUST be defined before /:id)
router.get('/media', requireAdminPassword, getMediaFiles);
router.get('/categories-summary', getCategoriesSummary);
router.get('/tags-summary', getTagsSummary);
router.get('/comments/all', requireAdminPassword, getAllComments);
router.put('/comments/:id', requireAdminPassword, updateCommentStatus);
router.delete('/comments/:id', requireAdminPassword, deleteComment);

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected Blog Routes
router.post('/upload', requireAdminPassword, handleImageUpload, uploadBlogImage);
router.post('/', requireAdminPassword, createBlog);
router.put('/:id', requireAdminPassword, updateBlog);
router.delete('/:id', requireAdminPassword, deleteBlog);

module.exports = router;

