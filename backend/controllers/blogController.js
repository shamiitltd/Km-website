const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all blogs
const getAllBlogs = async (req, res) => {
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
};

// Fetch single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { id }
    });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error("Error fetching single blog:", error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Create a new blog (Protected)
const createBlog = async (req, res) => {
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
};

// Update a blog (Protected)
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, author, readTime, imageUrl } = req.body;

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        category,
        author,
        readTime,
        imageUrl
      }
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete a blog (Protected)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({
      where: { id }
    });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
