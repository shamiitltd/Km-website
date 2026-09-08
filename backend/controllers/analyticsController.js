const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Helper to normalize referrer strings
 */
function cleanReferrer(ref) {
  if (!ref || ref === 'Direct' || ref === '' || ref === 'undefined') return 'Direct';
  try {
    const url = new URL(ref);
    const host = url.hostname.replace('www.', '');
    if (host.includes('google')) return 'Google Search';
    if (host.includes('bing')) return 'Bing Search';
    if (host.includes('yahoo')) return 'Yahoo Search';
    if (host.includes('facebook') || host.includes('fb.')) return 'Facebook';
    if (host.includes('twitter') || host.includes('t.co') || host.includes('x.com')) return 'Twitter / X';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('instagram')) return 'Instagram';
    if (host.includes('whatsapp')) return 'WhatsApp';
    if (host.includes('youtube')) return 'YouTube';
    if (host.includes('localhost') || host.includes('127.0.0.1')) return 'Direct';
    return host;
  } catch {
    return ref;
  }
}

/**
 * POST /api/analytics/track
 * Track a page view and update active visitor session
 */
exports.trackPageView = async (req, res) => {
  try {
    let { visitorId, sessionId, path, title, referrer, deviceType, browser, os } = req.body;

    if (!visitorId || !sessionId) {
      return res.status(400).json({ error: 'visitorId and sessionId are required' });
    }

    path = path || '/';
    // Exclude admin routes from tracking
    if (path.startsWith('/admin')) {
      return res.json({ success: true, skipped: true });
    }

    deviceType = deviceType || 'desktop';
    referrer = cleanReferrer(referrer);

    const now = new Date();

    // 1. Record PageView
    await prisma.pageView.create({
      data: {
        visitorId,
        sessionId,
        path,
        title: title ? String(title).slice(0, 150) : null,
        referrer,
        deviceType,
        browser: browser ? String(browser).slice(0, 50) : 'Unknown',
        os: os ? String(os).slice(0, 50) : 'Unknown',
        createdAt: now
      }
    });

    // 2. Upsert ActiveSession for live pulse tracking
    await prisma.activeSession.upsert({
      where: { sessionId },
      update: {
        visitorId,
        currentPath: path,
        deviceType,
        browser: browser ? String(browser).slice(0, 50) : null,
        os: os ? String(os).slice(0, 50) : null,
        lastActiveAt: now
      },
      create: {
        sessionId,
        visitorId,
        currentPath: path,
        deviceType,
        browser: browser ? String(browser).slice(0, 50) : null,
        os: os ? String(os).slice(0, 50) : null,
        lastActiveAt: now
      }
    });

    // 3. Opportunistic cleanup of stale active sessions (> 5 minutes old)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    prisma.activeSession.deleteMany({
      where: { lastActiveAt: { lt: fiveMinutesAgo } }
    }).catch(() => {});

    return res.json({ success: true });
  } catch (error) {
    console.error('Error in trackPageView:', error);
    return res.status(500).json({ error: 'Failed to record page view' });
  }
};

/**
 * POST /api/analytics/heartbeat
 * Lightweight ping every 15-20 seconds to maintain live active status
 */
exports.heartbeat = async (req, res) => {
  try {
    const { sessionId, visitorId, currentPath, deviceType } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    // Ignore admin routes
    if (currentPath && currentPath.startsWith('/admin')) {
      return res.json({ success: true, skipped: true });
    }

    const now = new Date();
    await prisma.activeSession.upsert({
      where: { sessionId },
      update: {
        currentPath: currentPath || '/',
        lastActiveAt: now
      },
      create: {
        sessionId,
        visitorId: visitorId || 'anonymous',
        currentPath: currentPath || '/',
        deviceType: deviceType || 'desktop',
        lastActiveAt: now
      }
    });

    return res.json({ success: true, timestamp: now.getTime() });
  } catch (error) {
    console.error('Error in heartbeat:', error);
    return res.status(500).json({ error: 'Heartbeat error' });
  }
};

/**
 * POST /api/analytics/leave
 * Called on page unload or visibility change to immediately clean up active session
 */
exports.leaveSession = async (req, res) => {
  try {
    let sessionId = req.body.sessionId;
    // Handle beacon text payloads if parsed as string
    if (!sessionId && typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        sessionId = parsed.sessionId;
      } catch {}
    }

    if (sessionId) {
      await prisma.activeSession.deleteMany({
        where: { sessionId }
      });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Error in leaveSession:', error);
    return res.status(500).json({ error: 'Leave error' });
  }
};

/**
 * GET /api/analytics/stats
 * Comprehensive analytics intelligence for Admin Dashboard
 */
exports.getAnalyticsStats = async (req, res) => {
  try {
    // Admin password verification
    const authHeader = req.headers.authorization;
    const token = req.query.token;
    const isAuthorized = 
      (authHeader && authHeader === 'Bearer admin123') ||
      token === 'admin123';

    if (!isAuthorized) {
      return res.status(401).json({ error: 'Unauthorized: Admin access required' });
    }

    const now = new Date();

    // 1. LIVE ACTIVE VISITORS (Active within last 60 seconds)
    const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000);
    const activeSessions = await prisma.activeSession.findMany({
      where: {
        lastActiveAt: { gte: sixtySecondsAgo }
      },
      orderBy: { lastActiveAt: 'desc' }
    });

    const liveCount = activeSessions.length;
    // Group active users by current path
    const livePagesMap = {};
    activeSessions.forEach(s => {
      const p = s.currentPath || '/';
      livePagesMap[p] = (livePagesMap[p] || 0) + 1;
    });
    const livePages = Object.entries(livePagesMap).map(([path, count]) => ({ path, count }));

    // 2. TODAY & YESTERDAY METRICS
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

    // Today's total views
    const todayViews = await prisma.pageView.count({
      where: { createdAt: { gte: todayStart } }
    });

    // Today's unique visitors
    const todayVisitorsRaw = await prisma.pageView.findMany({
      where: { createdAt: { gte: todayStart } },
      select: { visitorId: true },
      distinct: ['visitorId']
    });
    const todayUniqueVisitors = todayVisitorsRaw.length;

    // Yesterday's stats for comparison
    const yesterdayViews = await prisma.pageView.count({
      where: {
        createdAt: {
          gte: yesterdayStart,
          lt: todayStart
        }
      }
    });
    const yesterdayVisitorsRaw = await prisma.pageView.findMany({
      where: {
        createdAt: {
          gte: yesterdayStart,
          lt: todayStart
        }
      },
      select: { visitorId: true },
      distinct: ['visitorId']
    });
    const yesterdayUniqueVisitors = yesterdayVisitorsRaw.length;

    // 3. ALL-TIME TOTALS
    const totalViews = await prisma.pageView.count();
    const allVisitorsRaw = await prisma.pageView.findMany({
      select: { visitorId: true },
      distinct: ['visitorId']
    });
    const totalUniqueVisitors = allVisitorsRaw.length;

    // 4. HISTORICAL VELOCITY TREND (Last 7, 14, or 30 days)
    const rangeDays = parseInt(req.query.range, 10) || 7;
    const clampedRange = Math.min(Math.max(rangeDays, 7), 30);
    const trendStartDate = new Date(todayStart.getTime() - (clampedRange - 1) * 24 * 60 * 60 * 1000);

    const rangePageViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: trendStartDate } },
      select: { visitorId: true, createdAt: true }
    });

    // Bucket by YYYY-MM-DD
    const trendMap = {};
    for (let i = 0; i < clampedRange; i++) {
      const d = new Date(trendStartDate.getTime() + i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      trendMap[key] = {
        date: key,
        label,
        views: 0,
        visitorsSet: new Set()
      };
    }

    rangePageViews.forEach(pv => {
      const key = pv.createdAt.toISOString().slice(0, 10);
      if (trendMap[key]) {
        trendMap[key].views += 1;
        trendMap[key].visitorsSet.add(pv.visitorId);
      }
    });

    const trend = Object.values(trendMap).map(item => ({
      date: item.date,
      label: item.label,
      views: item.views,
      visitors: item.visitorsSet.size
    }));

    // 5. TOP VISITED PAGES LEADERBOARD
    const allPageViews = await prisma.pageView.findMany({
      select: { path: true, visitorId: true }
    });

    const pageStatsMap = {};
    allPageViews.forEach(pv => {
      const p = pv.path || '/';
      if (!pageStatsMap[p]) {
        pageStatsMap[p] = { path: p, views: 0, visitorsSet: new Set() };
      }
      pageStatsMap[p].views += 1;
      pageStatsMap[p].visitorsSet.add(pv.visitorId);
    });

    const topPages = Object.values(pageStatsMap)
      .map(p => ({
        path: p.path,
        views: p.views,
        uniqueVisitors: p.visitorsSet.size,
        percentage: totalViews > 0 ? Math.round((p.views / totalViews) * 100) : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // 6. DEVICE BREAKDOWN
    const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
    const browserCounts = {};
    const osCounts = {};
    const referrerCounts = {};

    const recentRecords = await prisma.pageView.findMany({
      take: 1000,
      orderBy: { createdAt: 'desc' },
      select: { deviceType: true, browser: true, os: true, referrer: true }
    });

    recentRecords.forEach(r => {
      const dev = (r.deviceType || 'desktop').toLowerCase();
      if (deviceCounts[dev] !== undefined) deviceCounts[dev] += 1;
      else deviceCounts.desktop += 1;

      const br = r.browser || 'Other';
      browserCounts[br] = (browserCounts[br] || 0) + 1;

      const os = r.os || 'Other';
      osCounts[os] = (osCounts[os] || 0) + 1;

      const ref = r.referrer || 'Direct';
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    });

    const sampleTotal = recentRecords.length || 1;
    const deviceBreakdown = {
      desktop: Math.round((deviceCounts.desktop / sampleTotal) * 100),
      mobile: Math.round((deviceCounts.mobile / sampleTotal) * 100),
      tablet: Math.round((deviceCounts.tablet / sampleTotal) * 100),
      counts: deviceCounts
    };

    const topBrowsers = Object.entries(browserCounts)
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / sampleTotal) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topOS = Object.entries(osCounts)
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / sampleTotal) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topReferrers = Object.entries(referrerCounts)
      .map(([source, count]) => ({ source, count, percentage: Math.round((count / sampleTotal) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // 7. RECENT LIVE ACTIVITY STREAM
    const recentActivity = await prisma.pageView.findMany({
      take: 15,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        path: true,
        deviceType: true,
        browser: true,
        referrer: true,
        createdAt: true
      }
    });

    // 8. QUICK HUB STATS (Blogs & Subscribers)
    const [publishedBlogsCount, draftBlogsCount, subscriberCount, latestBroadcast] = await Promise.all([
      prisma.blog.count({ where: { status: 'PUBLISHED' } }),
      prisma.blog.count({ where: { status: 'DRAFT' } }),
      prisma.newsletterSubscriber.count(),
      prisma.broadcastLog.findFirst({ orderBy: { sentAt: 'desc' } })
    ]);

    return res.json({
      success: true,
      timestamp: now.toISOString(),
      live: {
        count: liveCount,
        pages: livePages
      },
      today: {
        uniqueVisitors: todayUniqueVisitors,
        views: todayViews,
        comparison: {
          yesterdayUnique: yesterdayUniqueVisitors,
          yesterdayViews: yesterdayViews,
          changePercent: yesterdayUniqueVisitors > 0
            ? Math.round(((todayUniqueVisitors - yesterdayUniqueVisitors) / yesterdayUniqueVisitors) * 100)
            : 0
        }
      },
      allTime: {
        uniqueVisitors: totalUniqueVisitors,
        totalViews: totalViews,
        viewsPerVisitor: totalUniqueVisitors > 0 ? (totalViews / totalUniqueVisitors).toFixed(1) : '1.0'
      },
      trend,
      topPages,
      deviceBreakdown,
      topBrowsers,
      topOS,
      topReferrers,
      recentActivity,
      hub: {
        publishedBlogs: publishedBlogsCount,
        draftBlogs: draftBlogsCount,
        subscribers: subscriberCount,
        latestBroadcast: latestBroadcast ? {
          subject: latestBroadcast.subject,
          sentCount: latestBroadcast.sentCount,
          sentAt: latestBroadcast.sentAt
        } : null
      }
    });
  } catch (error) {
    console.error('Error in getAnalyticsStats:', error);
    return res.status(500).json({ error: 'Failed to compute analytics statistics' });
  }
};
