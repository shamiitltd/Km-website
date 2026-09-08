const { PrismaClient } = require('@prisma/client');
const { sendBlogBroadcastToSubscribers } = require('../services/emailService');
const prisma = new PrismaClient();

// Fetch all blogs
const getAllBlogs = async (req, res) => {
  try {
    const { status, category } = req.query;
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader && authHeader.includes('admin123');

    const whereClause = {};

    // If explicit status query passed (e.g. ?status=all or ?status=DRAFT)
    if (status && status.toLowerCase() !== 'all') {
      whereClause.status = status.toUpperCase();
    } else if (!status && !isAdmin) {
      // Public visitors only see published posts
      whereClause.status = 'PUBLISHED';
    }

    if (category && category !== 'All Posts') {
      whereClause.category = category;
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
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

// Helper to generate a clean, readable SEO-friendly slug
function slugify(text) {
  if (!text) return 'post-' + Date.now().toString(36);
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'post-' + Date.now().toString(36);
}

// Fetch single blog by ID or Slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Look up by ID or Slug
    const blog = await prisma.blog.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });
    
    if (blog) {
      return res.json(blog);
    }

    // 2. If not found directly, check 301 Redirect table (e.g. old blog slug)
    const lookupPath = `/blog/${id}`.toLowerCase();
    const redirectRecord = await prisma.urlRedirect.findFirst({
      where: {
        sourceUrl: lookupPath,
        isActive: true
      }
    });

    if (redirectRecord) {
      prisma.urlRedirect.update({
        where: { id: redirectRecord.id },
        data: { hitCount: { increment: 1 } }
      }).catch(() => {});

      return res.status(301).json({
        redirect: redirectRecord.targetUrl,
        statusCode: 301,
        message: 'Blog post has moved permanently'
      });
    }

    return res.status(404).json({ error: 'Blog post not found' });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Create a new blog (Protected)
const createBlog = async (req, res) => {
  try {
    const { 
      title, 
      content, 
      category, 
      author, 
      readTime, 
      imageUrl, 
      status, 
      publishDate, 
      tags, 
      slug,
      canonicalUrl,
      ogImageUrl,
      seoKeywords,
      isNoIndex,
      isNoFollow,
      metaTitle, 
      metaDescription 
    } = req.body;

    if (!title || !content || !category || !author || !readTime || !imageUrl) {
      return res.status(400).json({ error: 'All core fields are required' });
    }

    const blogStatus = (status || 'PUBLISHED').toUpperCase();
    const parsedPublishDate = publishDate ? new Date(publishDate) : new Date();
    const formattedTags = Array.isArray(tags) ? JSON.stringify(tags) : (tags || null);

    // Compute or sanitize unique slug
    let generatedSlug = slug ? slugify(slug) : slugify(title);
    const existingSlugBlog = await prisma.blog.findUnique({ where: { slug: generatedSlug } });
    if (existingSlugBlog) {
      generatedSlug = `${generatedSlug}-${Date.now().toString(36)}`;
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        category,
        author,
        readTime,
        imageUrl,
        status: blogStatus,
        publishDate: isNaN(parsedPublishDate.getTime()) ? new Date() : parsedPublishDate,
        tags: formattedTags,
        slug: generatedSlug,
        canonicalUrl: canonicalUrl || null,
        ogImageUrl: ogImageUrl || null,
        seoKeywords: seoKeywords || null,
        isNoIndex: Boolean(isNoIndex),
        isNoFollow: Boolean(isNoFollow),
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null
      }
    });

    // Automatically broadcast notification to all subscribed users ONLY if published
    if (blogStatus === 'PUBLISHED') {
      setImmediate(async () => {
        try {
          await sendBlogBroadcastToSubscribers(newBlog);
        } catch (broadcastErr) {
          console.error('[Blog Broadcast Error]:', broadcastErr);
        }
      });
    }

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
    const { 
      title, 
      content, 
      category, 
      author, 
      readTime, 
      imageUrl, 
      status, 
      publishDate, 
      tags, 
      slug,
      canonicalUrl,
      ogImageUrl,
      seoKeywords,
      isNoIndex,
      isNoFollow,
      metaTitle, 
      metaDescription 
    } = req.body;

    const previousBlog = await prisma.blog.findUnique({ where: { id } });
    if (!previousBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const blogStatus = status ? status.toUpperCase() : previousBlog.status;
    const parsedPublishDate = publishDate ? new Date(publishDate) : previousBlog.publishDate;
    const formattedTags = Array.isArray(tags) ? JSON.stringify(tags) : (tags !== undefined ? tags : previousBlog.tags);

    // Check slug change and register 301 redirect if changed
    let updatedSlug = previousBlog.slug;
    if (slug !== undefined && slug !== null) {
      const cleanNewSlug = slugify(slug);
      if (cleanNewSlug !== previousBlog.slug) {
        // If slug conflict with another post, suffix it
        const conflict = await prisma.blog.findFirst({
          where: { slug: cleanNewSlug, NOT: { id } }
        });
        updatedSlug = conflict ? `${cleanNewSlug}-${Date.now().toString(36)}` : cleanNewSlug;

        // Register 301 redirect from old slug to new slug
        if (previousBlog.slug) {
          await prisma.urlRedirect.upsert({
            where: { sourceUrl: `/blog/${previousBlog.slug}`.toLowerCase() },
            update: {
              targetUrl: `/blog/${updatedSlug}`,
              statusCode: 301,
              isActive: true,
              updatedAt: new Date()
            },
            create: {
              sourceUrl: `/blog/${previousBlog.slug}`.toLowerCase(),
              targetUrl: `/blog/${updatedSlug}`,
              statusCode: 301,
              isActive: true
            }
          }).catch(err => console.error('Redirect creation error:', err));
        }
      }
    } else if (!previousBlog.slug) {
      // Auto-assign slug if previous post lacked one
      updatedSlug = slugify(title || previousBlog.title);
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        category,
        author,
        readTime,
        imageUrl,
        status: blogStatus,
        publishDate: isNaN(parsedPublishDate.getTime()) ? previousBlog.publishDate : parsedPublishDate,
        tags: formattedTags,
        slug: updatedSlug,
        canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : previousBlog.canonicalUrl,
        ogImageUrl: ogImageUrl !== undefined ? ogImageUrl : previousBlog.ogImageUrl,
        seoKeywords: seoKeywords !== undefined ? seoKeywords : previousBlog.seoKeywords,
        isNoIndex: isNoIndex !== undefined ? Boolean(isNoIndex) : previousBlog.isNoIndex,
        isNoFollow: isNoFollow !== undefined ? Boolean(isNoFollow) : previousBlog.isNoFollow,
        metaTitle: metaTitle !== undefined ? metaTitle : previousBlog.metaTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : previousBlog.metaDescription
      }
    });

    // If a draft is now published for the first time, broadcast to subscribers
    if (previousBlog.status !== 'PUBLISHED' && blogStatus === 'PUBLISHED') {
      setImmediate(async () => {
        try {
          await sendBlogBroadcastToSubscribers(updatedBlog);
        } catch (broadcastErr) {
          console.error('[Blog Broadcast Error]:', broadcastErr);
        }
      });
    }

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

// Upload blog image (Protected)
const uploadBlogImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded' });
    }

    // Determine base URL dynamically (respecting reverse proxy / custom BASE_URL)
    const host = req.get('host');
    const protocol = req.protocol; // respects app.set('trust proxy', 1)
    const baseUrl = process.env.BASE_URL || `${protocol}://${host}`;

    const filename = req.file.filename;
    const relativePath = `/uploads/${filename}`;
    const fullUrl = `${baseUrl}${relativePath}`;

    // Return format compatible with custom UI, Jodit drag-and-drop, and standard CMS uploader
    res.status(200).json({
      success: true,
      url: fullUrl,
      relativePath: relativePath,
      filename: filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      // Jodit editor compatible fields:
      files: [fullUrl],
      data: {
        files: [fullUrl],
        baseurl: baseUrl,
        isImages: [true]
      },
      baseurl: baseUrl
    });
  } catch (error) {
    console.error('[Image Upload Error]:', error);
    res.status(500).json({ success: false, error: 'Failed to process uploaded image' });
  }
};

// Get all uploaded media files in /uploads/
const getMediaFiles = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ success: true, files: [] });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const baseUrl = process.env.BASE_URL || `${protocol}://${host}`;

    const dirFiles = fs.readdirSync(uploadsDir);
    const mediaFiles = dirFiles
      .filter(f => !f.startsWith('.') && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f))
      .map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          url: `${baseUrl}/uploads/${filename}`,
          size: stats.size,
          createdAt: stats.birthtime || stats.mtime
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, files: mediaFiles });
  } catch (error) {
    console.error('Error fetching media files:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch media files' });
  }
};

// Get categories summary with post counts
const getCategoriesSummary = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({ select: { category: true, status: true } });
    const counts = {};
    blogs.forEach(b => {
      const cat = b.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const summary = Object.entries(counts).map(([name, count]) => ({ name, count }));
    res.json({ success: true, categories: summary });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
};

// Get tags summary with post counts
const getTagsSummary = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({ select: { tags: true } });
    const counts = {};
    blogs.forEach(b => {
      if (b.tags) {
        let tagList = [];
        try {
          tagList = JSON.parse(b.tags);
        } catch {
          tagList = b.tags.split(',').map(t => t.trim());
        }
        if (Array.isArray(tagList)) {
          tagList.forEach(t => {
            if (t) counts[t] = (counts[t] || 0) + 1;
          });
        }
      }
    });
    const summary = Object.entries(counts).map(([tag, count]) => ({ tag, count }));
    res.json({ success: true, tags: summary });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tags' });
  }
};

// Comments Management
const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch comments' });
  }
};

const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const comment = await prisma.comment.update({
      where: { id },
      data: { status }
    });
    res.json({ success: true, comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, error: 'Failed to update comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({ where: { id } });
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: 'Failed to delete comment' });
  }
};

module.exports = {
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
};
