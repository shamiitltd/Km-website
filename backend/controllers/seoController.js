const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Helper to ensure default SEO settings exist in SQLite
 */
async function getOrCreateSeoSettings() {
  let settings = await prisma.siteSeoSettings.findUnique({
    where: { id: 'default' }
  });

  if (!settings) {
    settings = await prisma.siteSeoSettings.create({
      data: {
        id: 'default',
        siteTitle: 'KisanMitra - AI-Powered Smart Farming Companion',
        siteDescription: 'Empowering farmers across India with AI-driven crop disease diagnostics, real-time weather alerts, APMC mandi market prices, and precision agricultural guidance.',
        canonicalDomain: process.env.SITE_URL || 'https://kisanmitra.in',
        defaultOgImage: '/assets/hero-D2VKPB0P.png',
        robotsIndexing: 'index, follow',
        twitterHandle: '@KisanMitra',
        organizationName: 'KisanMitra Technologies',
        contactEmail: 'support@kisanmitra.com',
        contactPhone: '+919548450539'
      }
    });
  }

  return settings;
}

/**
 * Sanitize verification tokens (allow only safe token characters, strip HTML/scripts)
 */
function sanitizeVerificationToken(token) {
  if (!token || typeof token !== 'string') return null;
  const trimmed = token.trim();
  // Strip any HTML tags, quotes or angle brackets
  const cleaned = trimmed.replace(/[<>"'/\\;]/g, '');
  return cleaned.slice(0, 150) || null;
}

/**
 * GET /sitemap.xml and GET /api/seo/sitemap.xml
 * Dynamic XML Sitemap conforming to Sitemaps XML protocol 0.9
 */
exports.getSitemapXml = async (req, res) => {
  try {
    const settings = await getOrCreateSeoSettings();
    const domain = (settings.canonicalDomain || 'https://kisanmitra.in').replace(/\/+$/, '');

    // 1. Static public indexable pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/features', priority: '0.9', changefreq: 'weekly' },
      { path: '/how-it-works', priority: '0.8', changefreq: 'weekly' },
      { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
      { path: '/about', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog', priority: '0.9', changefreq: 'daily' },
      { path: '/contact', priority: '0.6', changefreq: 'monthly' },
      { path: '/terms-and-conditions', priority: '0.4', changefreq: 'monthly' },
      { path: '/refund-policy', priority: '0.4', changefreq: 'monthly' },
      { path: '/careers', priority: '0.4', changefreq: 'monthly' }
    ];

    // 2. Fetch all published blog posts (excluding drafts, scheduled, and noindex posts)
    const publishedBlogs = await prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        isNoIndex: false
      },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
        publishDate: true
      },
      orderBy: { publishDate: 'desc' }
    });

    const nowIso = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${domain}${page.path}</loc>\n`;
      xml += `    <lastmod>${nowIso.slice(0, 10)}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Add blog posts
    for (const blog of publishedBlogs) {
      const targetSlug = blog.slug || blog.id;
      const modDate = blog.updatedAt || blog.publishDate || new Date();
      const modIso = new Date(modDate).toISOString().slice(0, 10);

      xml += `  <url>\n`;
      xml += `    <loc>${domain}/blog/${targetSlug}</loc>\n`;
      xml += `    <lastmod>${modIso}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap.xml:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
  }
};

/**
 * GET /robots.txt and GET /api/seo/robots.txt
 * Dynamic Robots.txt referencing canonical sitemap and blocking private routes
 */
exports.getRobotsTxt = async (req, res) => {
  try {
    const settings = await getOrCreateSeoSettings();
    const domain = (settings.canonicalDomain || 'https://kisanmitra.in').replace(/\/+$/, '');
    const isGlobalNoindex = (settings.robotsIndexing || '').toLowerCase().includes('noindex');

    let robotsTxt = '';

    if (isGlobalNoindex) {
      // Staging / private environment safety mode
      robotsTxt = `# KisanMitra Robots Directives (Staging / Private Mode)\nUser-agent: *\nDisallow: /\n`;
    } else {
      // Production search engine crawl rules
      robotsTxt = `# KisanMitra Search Engine Directives\n`;
      robotsTxt += `User-agent: *\n`;
      robotsTxt += `Allow: /\n`;
      robotsTxt += `Disallow: /admin/\n`;
      robotsTxt += `Disallow: /admin\n`;
      robotsTxt += `Disallow: /api/\n\n`;
      robotsTxt += `# Dynamic XML Sitemap\n`;
      robotsTxt += `Sitemap: ${domain}/sitemap.xml\n`;
    }

    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(robotsTxt);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).send('User-agent: *\nAllow: /\n');
  }
};

/**
 * GET /api/seo/settings
 * Public endpoint to fetch site-wide SEO metadata and verification codes for client injection
 */
exports.getSeoSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSeoSettings();
    const domain = (settings.canonicalDomain || 'https://kisanmitra.in').replace(/\/+$/, '');

    // Also fetch last sitemap generation timestamp (latest blog publish date or settings updatedAt)
    const latestBlog = await prisma.blog.findFirst({
      where: { status: 'PUBLISHED' },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    });

    const lastGeneratedAt = latestBlog && latestBlog.updatedAt > settings.updatedAt
      ? latestBlog.updatedAt
      : settings.updatedAt;

    res.json({
      success: true,
      settings: {
        siteTitle: settings.siteTitle,
        siteDescription: settings.siteDescription,
        canonicalDomain: domain,
        defaultOgImage: settings.defaultOgImage,
        googleVerificationCode: settings.googleVerificationCode,
        bingVerificationCode: settings.bingVerificationCode,
        otherVerificationCode: settings.otherVerificationCode,
        robotsIndexing: settings.robotsIndexing,
        twitterHandle: settings.twitterHandle,
        organizationName: settings.organizationName,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        sitemapUrl: `${domain}/sitemap.xml`,
        lastGeneratedAt: lastGeneratedAt
      }
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    res.status(500).json({ error: 'Failed to retrieve SEO configuration' });
  }
};

/**
 * PUT /api/seo/settings
 * Admin-protected endpoint to update SEO settings
 */
exports.updateSeoSettings = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const {
      siteTitle,
      siteDescription,
      canonicalDomain,
      defaultOgImage,
      googleVerificationCode,
      bingVerificationCode,
      otherVerificationCode,
      robotsIndexing,
      twitterHandle,
      organizationName,
      contactEmail,
      contactPhone
    } = req.body;

    const sanitizedGoogle = sanitizeVerificationToken(googleVerificationCode);
    const sanitizedBing = sanitizeVerificationToken(bingVerificationCode);
    const sanitizedOther = sanitizeVerificationToken(otherVerificationCode);
    const cleanDomain = (canonicalDomain || 'https://kisanmitra.in').trim().replace(/\/+$/, '');

    const updated = await prisma.siteSeoSettings.upsert({
      where: { id: 'default' },
      update: {
        siteTitle: siteTitle ? String(siteTitle).slice(0, 150) : undefined,
        siteDescription: siteDescription ? String(siteDescription).slice(0, 300) : undefined,
        canonicalDomain: cleanDomain,
        defaultOgImage: defaultOgImage || '/assets/hero-D2VKPB0P.png',
        googleVerificationCode: sanitizedGoogle,
        bingVerificationCode: sanitizedBing,
        otherVerificationCode: sanitizedOther,
        robotsIndexing: robotsIndexing === 'noindex, nofollow' ? 'noindex, nofollow' : 'index, follow',
        twitterHandle: twitterHandle ? String(twitterHandle).slice(0, 50) : undefined,
        organizationName: organizationName ? String(organizationName).slice(0, 100) : undefined,
        contactEmail: contactEmail ? String(contactEmail).slice(0, 100) : undefined,
        contactPhone: contactPhone ? String(contactPhone).slice(0, 50) : undefined,
        updatedAt: new Date()
      },
      create: {
        id: 'default',
        siteTitle: siteTitle || 'KisanMitra - AI-Powered Smart Farming Companion',
        siteDescription: siteDescription || 'Empowering farmers across India with AI-driven crop diagnostics and advisory.',
        canonicalDomain: cleanDomain,
        defaultOgImage: defaultOgImage || '/assets/hero-D2VKPB0P.png',
        googleVerificationCode: sanitizedGoogle,
        bingVerificationCode: sanitizedBing,
        otherVerificationCode: sanitizedOther,
        robotsIndexing: robotsIndexing || 'index, follow',
        twitterHandle: twitterHandle || '@KisanMitra',
        organizationName: organizationName || 'KisanMitra Technologies',
        contactEmail: contactEmail || 'support@kisanmitra.com',
        contactPhone: contactPhone || '+919548450539'
      }
    });

    res.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    res.status(500).json({ error: 'Failed to update SEO settings' });
  }
};

/**
 * GET /api/seo/check-redirect?url=...
 * Check if a URL or slug matches an active 301 redirect
 */
exports.checkRedirect = async (req, res) => {
  try {
    const rawUrl = req.query.url;
    if (!rawUrl) return res.json({ redirect: null });

    // Normalize incoming URL (lowercase, clean leading/trailing slash)
    const normalized = rawUrl.trim().toLowerCase();

    const redirectRecord = await prisma.urlRedirect.findFirst({
      where: {
        sourceUrl: normalized,
        isActive: true
      }
    });

    if (redirectRecord) {
      // Increment hit count asynchronously
      prisma.urlRedirect.update({
        where: { id: redirectRecord.id },
        data: { hitCount: { increment: 1 } }
      }).catch(() => {});

      return res.json({
        redirect: redirectRecord.targetUrl,
        statusCode: redirectRecord.statusCode
      });
    }

    return res.json({ redirect: null });
  } catch (error) {
    console.error('Error checking redirect:', error);
    res.json({ redirect: null });
  }
};

/**
 * GET /api/seo/redirects
 * List all configured 301 redirects (Protected)
 */
exports.getRedirects = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const redirects = await prisma.urlRedirect.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, redirects });
  } catch (error) {
    console.error('Error fetching redirects:', error);
    res.status(500).json({ error: 'Failed to fetch redirects' });
  }
};

/**
 * POST /api/seo/redirects
 * Create or update a 301 redirect (Protected)
 */
exports.createRedirect = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    let { sourceUrl, targetUrl, statusCode } = req.body;
    if (!sourceUrl || !targetUrl) {
      return res.status(400).json({ error: 'sourceUrl and targetUrl are required' });
    }

    sourceUrl = sourceUrl.trim().toLowerCase();
    targetUrl = targetUrl.trim();

    // Prevent redirect loops
    if (sourceUrl === targetUrl.toLowerCase()) {
      return res.status(400).json({ error: 'Source URL and target URL cannot be identical' });
    }

    const record = await prisma.urlRedirect.upsert({
      where: { sourceUrl },
      update: {
        targetUrl,
        statusCode: statusCode === 302 ? 302 : 301,
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        sourceUrl,
        targetUrl,
        statusCode: statusCode === 302 ? 302 : 301,
        isActive: true
      }
    });

    res.status(201).json({ success: true, redirect: record });
  } catch (error) {
    console.error('Error creating redirect:', error);
    res.status(500).json({ error: 'Failed to create redirect' });
  }
};

/**
 * DELETE /api/seo/redirects/:id
 * Delete a redirect (Protected)
 */
exports.deleteRedirect = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const { id } = req.params;
    await prisma.urlRedirect.delete({ where: { id } });
    res.json({ success: true, message: 'Redirect removed' });
  } catch (error) {
    console.error('Error deleting redirect:', error);
    res.status(500).json({ error: 'Failed to delete redirect' });
  }
};
