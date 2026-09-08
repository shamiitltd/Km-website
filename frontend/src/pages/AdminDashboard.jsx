import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminBlog from './AdminBlog';
import AdminBroadcast from './AdminBroadcast';

export default function AdminDashboard({ defaultSection = 'dashboard', defaultSubSection = 'all' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Authentication State
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Navigation Module & Sub-Section State
  const paramTab = searchParams.get('tab');
  const paramSub = searchParams.get('sub');
  const [activeSection, setActiveSection] = useState(paramTab || defaultSection);
  const [activeSubSection, setActiveSubSection] = useState(paramSub || defaultSubSection);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (paramTab && paramTab !== activeSection) {
      setActiveSection(paramTab);
    }
    if (paramSub && paramSub !== activeSubSection) {
      setActiveSubSection(paramSub);
    }
  }, [paramTab, paramSub]);

  const handleNavigate = (section, subSection = null) => {
    setActiveSection(section);
    if (subSection) {
      setActiveSubSection(subSection);
      setSearchParams({ tab: section, sub: subSection });
    } else {
      setSearchParams({ tab: section });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Analytics State
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date());
  const [hoveredTrendPoint, setHoveredTrendPoint] = useState(null);
  const autoRefreshTimerRef = useRef(null);

  // SEO Settings State
  const [seoForm, setSeoForm] = useState({
    siteTitle: 'KisanMitra - AI-Powered Smart Farming Companion',
    siteDescription: 'Empowering farmers across India with AI-driven crop disease diagnostics, real-time weather alerts, APMC mandi market prices, and precision agricultural guidance.',
    canonicalDomain: 'https://kisanmitra.in',
    defaultOgImage: '/assets/hero-D2VKPB0P.png',
    googleVerificationCode: '',
    bingVerificationCode: '',
    otherVerificationCode: '',
    robotsIndexing: 'index, follow',
    twitterHandle: '@KisanMitra',
    organizationName: 'KisanMitra Technologies',
    contactEmail: 'support@kisanmitra.com',
    contactPhone: '+919548450539',
    sitemapUrl: 'https://kisanmitra.in/sitemap.xml',
    lastGeneratedAt: null
  });
  const [redirects, setRedirects] = useState([]);
  const [newRedirect, setNewRedirect] = useState({ sourceUrl: '', targetUrl: '', statusCode: 301 });
  const [isSavingSeo, setIsSavingSeo] = useState(false);
  const [seoFeedback, setSeoFeedback] = useState({ type: '', message: '' });

  // Media Library State
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [copyToast, setCopyToast] = useState('');
  const mediaFileInputRef = useRef(null);

  // Categories & Tags Summary State
  const [categories, setCategories] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  // Comments Moderation State
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Subscriber Hub State
  const [subscribers, setSubscribers] = useState([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check persisted admin session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('km_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      setPassword('admin123');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('km_admin_auth', 'true');
    } else {
      setAuthError('Incorrect master password. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('km_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Fetch Analytics Stats
  const fetchStats = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/analytics/stats?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${password || 'admin123'}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setLastRefreshedAt(new Date());
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('km_admin_auth');
      }
    } catch (err) {
      console.error('Failed to fetch analytics stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch SEO Settings and 301 Redirects
  const fetchSeoData = async () => {
    try {
      const [settingsRes, redirectsRes] = await Promise.all([
        fetch(`${apiUrl}/seo/settings`),
        fetch(`${apiUrl}/seo/redirects`, {
          headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
        })
      ]);
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data && data.settings) {
          setSeoForm(data.settings);
        }
      }
      if (redirectsRes.ok) {
        const rData = await redirectsRes.json();
        setRedirects(rData.redirects || []);
      }
    } catch (err) {
      console.error('Failed to load SEO configuration:', err);
    }
  };

  // Fetch Media files
  const fetchMedia = async () => {
    setIsLoadingMedia(true);
    try {
      const res = await fetch(`${apiUrl}/blogs/media`, {
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMediaFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  // Fetch Categories & Tags Summary
  const fetchTaxonomy = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch(`${apiUrl}/blogs/categories-summary`),
        fetch(`${apiUrl}/blogs/tags-summary`)
      ]);
      if (catRes.ok) {
        const cData = await catRes.json();
        setCategories(cData.categories || []);
      }
      if (tagRes.ok) {
        const tData = await tagRes.json();
        setTagsList(tData.tags || []);
      }
    } catch (err) {
      console.error('Failed to fetch taxonomy:', err);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const res = await fetch(`${apiUrl}/blogs/comments/all`, {
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Fetch Subscribers
  const fetchSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const res = await fetch(`${apiUrl}/newsletter/subscribers`, {
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  // Initial and reactive data fetching
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats(true);
      fetchSeoData();
      fetchTaxonomy();
      if (activeSection === 'media') fetchMedia();
      if (activeSection === 'comments') fetchComments();
      if (activeSection === 'newsletter') fetchSubscribers();
    }
  }, [isAuthenticated, timeRange, activeSection]);

  // 10-second auto-refresh for live traffic monitoring
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) {
      if (autoRefreshTimerRef.current) clearInterval(autoRefreshTimerRef.current);
      return;
    }

    autoRefreshTimerRef.current = setInterval(() => {
      fetchStats(false);
    }, 10000);

    return () => {
      if (autoRefreshTimerRef.current) clearInterval(autoRefreshTimerRef.current);
    };
  }, [isAuthenticated, autoRefresh, timeRange]);

  // Save SEO Settings
  const handleSaveSeo = async (e) => {
    e.preventDefault();
    setIsSavingSeo(true);
    setSeoFeedback({ type: '', message: '' });

    try {
      const res = await fetch(`${apiUrl}/seo/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password || 'admin123'}`
        },
        body: JSON.stringify(seoForm)
      });

      if (res.ok) {
        const data = await res.json();
        setSeoForm(data.settings);
        setSeoFeedback({ type: 'success', message: 'SEO settings successfully deployed to live website! ✨' });
      } else {
        const err = await res.json().catch(() => ({}));
        setSeoFeedback({ type: 'error', message: err.error || 'Failed to update SEO settings.' });
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      setSeoFeedback({ type: 'error', message: 'Network error saving SEO settings.' });
    } finally {
      setIsSavingSeo(false);
    }
  };

  // Create 301 Redirect
  const handleCreateRedirect = async (e) => {
    e.preventDefault();
    if (!newRedirect.sourceUrl || !newRedirect.targetUrl) return;

    try {
      const res = await fetch(`${apiUrl}/seo/redirects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password || 'admin123'}`
        },
        body: JSON.stringify(newRedirect)
      });

      if (res.ok) {
        setNewRedirect({ sourceUrl: '', targetUrl: '', statusCode: 301 });
        fetchSeoData();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Failed to add redirect rule.');
      }
    } catch (err) {
      console.error('Redirect creation failed:', err);
    }
  };

  // Delete 301 Redirect
  const handleDeleteRedirect = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/seo/redirects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
      });
      if (res.ok) {
        fetchSeoData();
      }
    } catch (err) {
      console.error('Failed to delete redirect:', err);
    }
  };

  // Upload Media
  const handleUploadMediaFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await fetch(`${apiUrl}/blogs/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` },
        body: fd
      });
      if (res.ok) {
        fetchMedia();
      } else {
        alert('Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload media error:', err);
    } finally {
      setIsUploadingMedia(false);
      if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
    }
  };

  // Copy Image URL to Clipboard
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopyToast(url);
    setTimeout(() => setCopyToast(''), 3000);
  };

  // Comments Actions
  const handleUpdateComment = async (id, status) => {
    try {
      const res = await fetch(`${apiUrl}/blogs/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password || 'admin123'}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/blogs/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password || 'admin123'}` }
      });
      if (res.ok) fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  // Export Subscribers CSV
  const exportSubscribersCSV = () => {
    if (!subscribers.length) return;
    const header = ['Email', 'Source', 'Registration Date'];
    const rows = subscribers.map(s => [
      `"${s.email}"`,
      `"${s.source || 'Website'}"`,
      `"${new Date(s.createdAt).toLocaleString()}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `kisanmitra_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format Helpers
  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'Just now';
    const seconds = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // SVG Trend Chart Dimensions
  const chartData = useMemo(() => {
    if (!stats || !stats.trend || stats.trend.length === 0) return null;
    const points = stats.trend;
    const maxViews = Math.max(1, ...points.map(p => p.views));
    const maxVisitors = Math.max(1, ...points.map(p => p.visitors));
    const ceiling = Math.max(maxViews, maxVisitors, 5);

    const width = 680;
    const height = 220;
    const paddingX = 40;
    const paddingY = 30;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const stepX = points.length > 1 ? chartW / (points.length - 1) : chartW;

    const viewsCoords = points.map((p, i) => {
      const x = paddingX + i * stepX;
      const y = paddingY + chartH - (p.views / ceiling) * chartH;
      return { x, y, ...p };
    });

    const visitorsCoords = points.map((p, i) => {
      const x = paddingX + i * stepX;
      const y = paddingY + chartH - (p.visitors / ceiling) * chartH;
      return { x, y, ...p };
    });

    const makePath = (coords) => {
      if (!coords.length) return '';
      return coords.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '');
    };

    const viewsPath = makePath(viewsCoords);
    const visitorsPath = makePath(visitorsCoords);

    const firstX = viewsCoords[0]?.x ?? paddingX;
    const lastX = viewsCoords[viewsCoords.length - 1]?.x ?? (width - paddingX);
    const bottomY = paddingY + chartH;
    const viewsArea = `${viewsPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    return {
      width,
      height,
      paddingX,
      paddingY,
      chartW,
      chartH,
      ceiling,
      viewsCoords,
      visitorsCoords,
      viewsPath,
      visitorsPath,
      viewsArea
    };
  }, [stats]);

  // Dynamic Page Catalog Inventory
  const pagesInventory = [
    { title: 'Home', path: '/', status: 'Active', indexed: true, priority: '1.0', changefreq: 'daily' },
    { title: 'Features & AI Tools', path: '/features', status: 'Active', indexed: true, priority: '0.9', changefreq: 'weekly' },
    { title: 'How It Works', path: '/how-it-works', status: 'Active', indexed: true, priority: '0.8', changefreq: 'weekly' },
    { title: 'Fair Pricing Guarantee', path: '/pricing', status: 'Active', indexed: true, priority: '0.8', changefreq: 'weekly' },
    { title: 'About Us', path: '/about', status: 'Active', indexed: true, priority: '0.7', changefreq: 'monthly' },
    { title: 'Agronomy Blog Hub', path: '/blog', status: 'Active', indexed: true, priority: '0.9', changefreq: 'daily' },
    { title: 'Contact & Support', path: '/contact', status: 'Active', indexed: true, priority: '0.6', changefreq: 'monthly' },
    { title: 'Terms and Conditions', path: '/terms-and-conditions', status: 'Active', indexed: true, priority: '0.4', changefreq: 'monthly' },
    { title: 'Refund & Cancellation Policy', path: '/refund-policy', status: 'Active', indexed: true, priority: '0.4', changefreq: 'monthly' },
    { title: 'Careers Portal', path: '/careers', status: 'Active', indexed: true, priority: '0.4', changefreq: 'monthly' }
  ];

  // 1. Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950 via-[#0A2617] to-[#04130A] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#123C26] to-[#2C8C44] rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-1 tracking-tight">
            KisanMitra Command Center
          </h2>
          <p className="text-center text-gray-500 text-xs sm:text-sm mb-6 font-medium">
            Real-Time Website Operations & Executive Hub
          </p>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-700">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Administrator Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44] focus:border-[#2C8C44] outline-none text-center tracking-[0.2em] font-mono text-base"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#123C26] to-[#2C8C44] hover:from-[#0E2E1D] hover:to-[#227237] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
            >
              Enter Command Center ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Main Executive Unified Dashboard Layout with Left Sidebar
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex overflow-x-hidden text-gray-900 font-sans">
      
      {/* 2.1 AUTHENTIC KISAN MITRA SIDEBAR (Matching reference image strictly) */}
      <AdminSidebar
        activeSection={activeSection}
        activeSubSection={activeSubSection}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        counts={{
          posts: stats?.hub?.blogsPublished ?? 0,
          subscribers: stats?.hub?.subscribers ?? 0,
          liveVisitors: stats?.live?.count ?? 0,
          media: mediaFiles.length,
          comments: comments.length
        }}
      />

      {/* 2.2 MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP EXECUTIVE HEADER BAR */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              title="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Breadcrumb Navigator */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="text-[#134629] font-black uppercase tracking-wider">KisanMitra</span>
              <span>/</span>
              <span className="text-gray-900 capitalize">
                {activeSection === 'posts' ? `Posts • ${activeSubSection === 'write' ? 'Write New' : activeSubSection === 'categories' ? 'Categories' : activeSubSection === 'tags' ? 'Tags' : 'All Posts'}` : activeSection}
              </span>
            </div>

            {/* Live System Radar Indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] font-bold text-[#123C26] shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Pulse</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Auto Refresh Toggle */}
            <button
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                autoRefresh
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}
              title="Toggle automatic refresh"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <span>Auto (10s)</span>
            </button>

            {/* Manual Refresh */}
            <button
              type="button"
              onClick={() => {
                fetchStats(true);
                if (activeSection === 'media') fetchMedia();
                if (activeSection === 'comments') fetchComments();
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
              title="Refresh data"
            >
              <svg className={`w-3.5 h-3.5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Public Site Link */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] text-xs font-bold rounded-xl border border-gray-200 transition-all"
            >
              <span>Public Site</span>
              <span>↗</span>
            </Link>

            {/* Lock Session */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-bold rounded-xl border border-gray-200 hover:border-red-200 shadow-2xs transition-all cursor-pointer"
              title="Lock admin session"
            >
              <span>Lock</span>
            </button>
          </div>
        </header>

        {/* COPY NOTIFICATION TOAST */}
        {copyToast && (
          <div className="fixed top-16 right-6 z-50 bg-[#123C26] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
            <span>📋 Image URL copied to clipboard!</span>
          </div>
        )}

        {/* 2.3 DYNAMIC MODULE VIEWS */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* =========================================================================
              MODULE 1: DASHBOARD OVERVIEW
             ========================================================================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Executive Welcome Banner */}
              <div className="bg-gradient-to-r from-[#123C26] to-[#206338] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl">
                  <span className="px-3 py-1 bg-emerald-800/60 text-emerald-200 text-xs font-bold rounded-full border border-emerald-700/50 uppercase tracking-wider">
                    Executive Control Center
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                    Welcome to KisanMitra Operations
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1 leading-relaxed">
                    Live system intelligence, agronomy content management, newsletter broadcasting, and visitor analytics.
                  </p>
                </div>
              </div>

              {/* 5 KEY METRIC COMMAND CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Live Online */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Online</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="text-3xl font-black text-gray-900">{stats?.live?.count ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">Active right now</p>
                </div>

                {/* Today's Visitors */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Visitors</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{stats?.today?.visitors ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{stats?.today?.views ?? 0} total pageviews</p>
                </div>

                {/* All-Time Reach */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">All-Time Reach</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{stats?.lifetime?.visitors ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{stats?.lifetime?.views ?? 0} total views</p>
                </div>

                {/* Subscribers */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subscribers</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{stats?.hub?.subscribers ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">Newsletter community</p>
                </div>

                {/* Blog Posts */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Posts</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{stats?.hub?.blogsPublished ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{stats?.hub?.blogsDraft ?? 0} in drafts</p>
                </div>
              </div>

              {/* FAST ACTIONS DECK */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Fast Operational Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate('posts', 'write')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 block">✍️</span>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Write Article</span>
                    <span className="text-[10px] text-gray-400">Open Blog CMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('newsletter')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 block">📢</span>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Broadcast</span>
                    <span className="text-[10px] text-gray-400">Email subscribers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('media')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 block">🖼️</span>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Media Library</span>
                    <span className="text-[10px] text-gray-400">Manage assets</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('analytics')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 block">📊</span>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Traffic Stats</span>
                    <span className="text-[10px] text-gray-400">Full telemetry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('settings')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 block">🌐</span>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">SEO Engine</span>
                    <span className="text-[10px] text-gray-400">Search Console & 301</span>
                  </button>
                </div>
              </div>

              {/* TWO COLUMN SUMMARY: TOP PAGES & RECENT ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Visited Pages */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Top Visited Pages
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleNavigate('analytics')}
                      className="text-xs text-emerald-700 hover:underline font-bold"
                    >
                      View Analytics ➔
                    </button>
                  </div>

                  <div className="space-y-2">
                    {stats?.topPages?.slice(0, 5).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs font-medium">
                        <span className="font-bold text-[#123C26] truncate max-w-[240px]">{p.path}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-mono">{p.views} views</span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                            {p.percentage}%
                          </span>
                        </div>
                      </div>
                    )) || <div className="py-6 text-center text-xs text-gray-400">Awaiting traffic data</div>}
                  </div>
                </div>

                {/* System Telemetry & Health */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    System Infrastructure Health
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">Database Engine</p>
                        <p className="text-[11px] text-gray-500">Prisma ORM • SQLite dev.db</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                        Operational
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">Dynamic XML Sitemap</p>
                        <p className="text-[11px] text-gray-500">Auto-generated Sitemaps 0.9 Protocol</p>
                      </div>
                      <a href="http://localhost:5000/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-bold text-xs">
                        /sitemap.xml ↗
                      </a>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">Robots Directives</p>
                        <p className="text-[11px] text-gray-500">Allow: /, Disallow: /admin, Sitemap reference</p>
                      </div>
                      <a href="http://localhost:5000/robots.txt" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-bold text-xs">
                        /robots.txt ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 2: POSTS (All Posts, Write New, Categories, Tags)
             ========================================================================= */}
          {activeSection === 'posts' && (
            <div>
              {/* SubSection 1: Write New */}
              {activeSubSection === 'write' && (
                <AdminBlog embedded={true} initialMode="write" />
              )}

              {/* SubSection 2: All Posts */}
              {activeSubSection === 'all' && (
                <AdminBlog embedded={true} initialMode="manage" />
              )}

              {/* SubSection 3: Categories Manager */}
              {activeSubSection === 'categories' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Blog Taxonomy & Categories</h2>
                      <p className="text-xs text-gray-500 mt-1">Manage agronomy post categories and distribution</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('posts', 'write')}
                      className="px-4 py-2 bg-[#123C26] text-white text-xs font-bold rounded-xl hover:bg-[#0F311F] transition-all cursor-pointer"
                    >
                      + New Article with Category
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat, idx) => (
                      <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
                        <div>
                          <span className="text-2xl mb-2 block">🌾</span>
                          <h3 className="text-base font-bold text-gray-900">{cat.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">Articles published under this category</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                            {cat.count} {cat.count === 1 ? 'Article' : 'Articles'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleNavigate('posts', 'all')}
                            className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                          >
                            Filter Posts ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SubSection 4: Tags Manager */}
              {activeSubSection === 'tags' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
                    <h2 className="text-xl font-bold text-gray-900">Article Tags & Keywords</h2>
                    <p className="text-xs text-gray-500 mt-1">Topic tags indexing farmer search and recommendations</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
                    <div className="flex flex-wrap gap-2.5">
                      {tagsList.map((t, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-[#123C26] rounded-xl text-xs font-bold border border-emerald-200 transition-all"
                        >
                          <span>#{t.tag}</span>
                          <span className="px-1.5 py-0.5 bg-emerald-200/60 text-emerald-900 rounded-md text-[10px]">
                            {t.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              MODULE 3: MEDIA LIBRARY
             ========================================================================= */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              {/* Media Header & Upload */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🖼️</span> Media Asset Library
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded cover photos, article images, and graphics. Total: {mediaFiles.length} files.
                  </p>
                </div>

                <div>
                  <input
                    type="file"
                    ref={mediaFileInputRef}
                    onChange={handleUploadMediaFile}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mediaFileInputRef.current?.click()}
                    disabled={isUploadingMedia}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#123C26] hover:bg-[#0F311F] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingMedia ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        <span>+ Upload Media Asset</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Media Grid */}
              {isLoadingMedia ? (
                <div className="py-12 text-center text-xs text-gray-400">Loading media library...</div>
              ) : mediaFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaFiles.map((m, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col"
                    >
                      <div className="h-36 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                        <img
                          src={m.url}
                          alt={m.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <p className="text-[11px] font-bold text-gray-800 truncate font-mono" title={m.filename}>
                          {m.filename}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {(m.size / 1024).toFixed(1)} KB
                        </p>
                        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(m.url)}
                            className="text-[10px] font-bold text-emerald-800 hover:text-emerald-900 cursor-pointer"
                          >
                            Copy URL 📋
                          </button>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-gray-400 hover:text-gray-700"
                          >
                            Open ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-gray-400 bg-white rounded-3xl border border-gray-200">
                  No uploaded media files found yet. Click "+ Upload Media Asset" to add images.
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              MODULE 4: PAGES DIRECTORY
             ========================================================================= */}
          {activeSection === 'pages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>📄</span> Public Website Pages Directory
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage search indexation, canonical URLs, and preview live public routes.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
                  10 Active Routes
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Page Title</th>
                        <th className="p-4">Route Path</th>
                        <th className="p-4">Search Indexing</th>
                        <th className="p-4">Sitemap Priority</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pagesInventory.map((p, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/60">
                          <td className="p-4 font-bold text-gray-900">{p.title}</td>
                          <td className="p-4 font-mono text-emerald-800 font-bold">{p.path}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                              Indexed (index, follow)
                            </span>
                          </td>
                          <td className="p-4 font-mono text-gray-600">{p.priority} ({p.changefreq})</td>
                          <td className="p-4 text-right">
                            <Link
                              to={p.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-[#123C26] rounded-xl border border-gray-200 hover:border-emerald-300 font-bold text-xs transition-all inline-flex items-center gap-1"
                            >
                              <span>View Live</span>
                              <span>↗</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 5: NEWSLETTER (Broadcast Studio & Subscribers)
             ========================================================================= */}
          {activeSection === 'newsletter' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-4 border border-gray-200/90 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubSection('broadcast')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeSubSection !== 'subscribers'
                        ? 'bg-[#123C26] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📢 Broadcast Studio
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubSection('subscribers');
                      fetchSubscribers();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeSubSection === 'subscribers'
                        ? 'bg-[#123C26] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    👥 Subscriber Hub ({subscribers.length || stats?.hub?.subscribers || '•'})
                  </button>
                </div>

                {activeSubSection === 'subscribers' && (
                  <button
                    type="button"
                    onClick={exportSubscribersCSV}
                    disabled={!subscribers.length}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-all cursor-pointer disabled:opacity-50"
                  >
                    📥 Export CSV
                  </button>
                )}
              </div>

              {activeSubSection === 'subscribers' ? (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Registered Community Subscribers</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Total: {subscribers.length} members</p>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                    {subscribers.map((s, idx) => (
                      <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50/60 text-xs">
                        <div>
                          <p className="font-bold text-gray-900">{s.email}</p>
                          <p className="text-[10px] text-gray-400">Source: {s.source || 'Website'}</p>
                        </div>
                        <span className="font-mono text-gray-400 text-[11px]">
                          {new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <AdminBroadcast embedded={true} />
              )}
            </div>
          )}

          {/* =========================================================================
              MODULE 6: COMMENTS MODERATION
             ========================================================================= */}
          {activeSection === 'comments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>💬</span> Reader Comments & Feedback Moderation
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Review, approve, and moderate comments on blog articles</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
                  {comments.length} Comments
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
                {isLoadingComments ? (
                  <div className="py-12 text-center text-xs text-gray-400">Loading comments...</div>
                ) : comments.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {comments.map((c) => (
                      <div key={c.id} className="p-5 hover:bg-gray-50/60 flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs">
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{c.authorName}</span>
                            <span className="text-gray-400">• {c.authorEmail}</span>
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              c.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {c.status}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{c.content}</p>
                          {c.blogTitle && (
                            <p className="text-[11px] text-emerald-800 font-medium">On Article: {c.blogTitle}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {c.status !== 'APPROVED' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateComment(c.id, 'APPROVED')}
                              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(c.id)}
                            className="px-3 py-1 bg-white hover:bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-gray-200 hover:border-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-xs text-gray-400">
                    No reader comments pending moderation. All clear! ✨
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 7: ANALYTICS (Full Traffic Telemetry Engine)
             ========================================================================= */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              {/* HERO KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-[#0A2617] text-white rounded-3xl p-5 shadow-md border border-emerald-800/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Online</span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white my-1">
                    {stats?.live?.count ?? 0}
                  </div>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Active in last 60 seconds</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Visitors</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{stats?.today?.visitors ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{stats?.today?.views ?? 0} views today</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">All-Time Reach</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{stats?.lifetime?.visitors ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{stats?.lifetime?.views ?? 0} total views</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subscribers</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{stats?.hub?.subscribers ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium">Community members</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Posts</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{stats?.hub?.blogsPublished ?? 0}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{stats?.hub?.blogsDraft ?? 0} drafts</p>
                </div>
              </div>

              {/* AUDIENCE VELOCITY TREND SVG CHART */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Audience Traffic Velocity Trend</h3>
                    <p className="text-xs text-gray-400 font-medium">Daily unique visitors and cumulative pageviews</p>
                  </div>
                  <div className="flex bg-gray-100 rounded-xl p-1 text-xs font-bold">
                    {[7, 14, 30].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setTimeRange(r)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          timeRange === r ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                        }`}
                      >
                        {r} Days
                      </button>
                    ))}
                  </div>
                </div>

                {chartData && (
                  <div className="relative w-full overflow-x-auto">
                    <svg viewBox={`0 0 ${chartData.width} ${chartData.height}`} className="w-full h-52 sm:h-64">
                      <defs>
                        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2C8C44" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2C8C44" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d={chartData.viewsArea} fill="url(#viewsGrad)" />
                      <path d={chartData.viewsPath} fill="none" stroke="#2C8C44" strokeWidth="2.5" />
                      <path d={chartData.visitorsPath} fill="none" stroke="#123C26" strokeWidth="2.5" strokeDasharray="4 4" />
                      {chartData.visitorsCoords.map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r={4}
                          fill="#123C26"
                          className="hover:scale-150 transition-transform cursor-pointer"
                          onMouseEnter={() => setHoveredTrendPoint(pt)}
                          onMouseLeave={() => setHoveredTrendPoint(null)}
                        />
                      ))}
                    </svg>
                    {hoveredTrendPoint && (
                      <div className="absolute top-2 right-4 bg-gray-900 text-white p-2.5 rounded-xl text-xs font-bold shadow-lg">
                        <span>{hoveredTrendPoint.date}: {hoveredTrendPoint.visitors} visitors, {hoveredTrendPoint.views} views</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* TELEMETRY BREAKDOWNS: TOP PAGES, DEVICES, REFERRERS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Top Visited Pages</h3>
                  <div className="space-y-2">
                    {stats?.topPages?.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs font-medium">
                        <span className="font-bold text-[#123C26] truncate max-w-[180px]">{p.path}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-mono">{p.views} views</span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                            {p.percentage}%
                          </span>
                        </div>
                      </div>
                    )) || <div className="text-xs text-gray-400">No page data yet</div>}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Hardware & Devices</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Desktop</span>
                        <span>{stats?.devices?.desktop?.percentage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#123C26] h-full" style={{ width: `${stats?.devices?.desktop?.percentage || 0}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Mobile</span>
                        <span>{stats?.devices?.mobile?.percentage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#2C8C44] h-full" style={{ width: `${stats?.devices?.mobile?.percentage || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Traffic Sources</h3>
                  <div className="space-y-2">
                    {stats?.topReferrers?.map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs font-medium">
                        <span className="font-bold text-gray-800 truncate max-w-[180px]">{r.source}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                          {r.percentage}%
                        </span>
                      </div>
                    )) || <div className="text-xs text-gray-400">No referrers recorded yet</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 8: SETTINGS (SEO & Webmaster Console)
             ========================================================================= */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🌐</span> Search Engine Optimization & Webmaster Center
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage Google Search Console, Bing Webmaster code, robots directives, dynamic sitemaps, and 301 URL redirects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSeo}
                  disabled={isSavingSeo}
                  className="px-5 py-2.5 bg-[#123C26] hover:bg-[#0F311F] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingSeo ? 'Deploying Changes...' : '💾 Deploy & Save SEO Settings'}
                </button>
              </div>

              {/* Feedback Banner */}
              {seoFeedback.message && (
                <div className={`p-4 rounded-2xl text-xs font-bold border flex items-center justify-between ${
                  seoFeedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
                }`}>
                  <span>{seoFeedback.message}</span>
                  <button type="button" onClick={() => setSeoFeedback({ type: '', message: '' })} className="font-bold">✕</button>
                </div>
              )}

              {/* Grid Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Webmaster Verification Tokens */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">🔍 Webmaster Verification Tokens</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-800">Google Search Console Token</label>
                    <input
                      type="text"
                      value={seoForm.googleVerificationCode || ''}
                      onChange={(e) => setSeoForm({ ...seoForm, googleVerificationCode: e.target.value })}
                      placeholder="e.g. 4v9hQz_g-xxxxxxxxxxxxxxxxxxx"
                      className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono outline-none focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-800">Bing Webmaster Code</label>
                    <input
                      type="text"
                      value={seoForm.bingVerificationCode || ''}
                      onChange={(e) => setSeoForm({ ...seoForm, bingVerificationCode: e.target.value })}
                      placeholder="e.g. 7A6B8C9D0E1F2G3H4I5J6K7L8M9N"
                      className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono outline-none focus:bg-white"
                    />
                  </div>
                </div>

                {/* Dynamic Directives */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">🤖 Crawling Directives & Sitemaps</h3>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-800">Robots Indexing</label>
                    <select
                      value={seoForm.robotsIndexing || 'index, follow'}
                      onChange={(e) => setSeoForm({ ...seoForm, robotsIndexing: e.target.value })}
                      className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                    >
                      <option value="index, follow">index, follow (Recommended)</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">Live Dynamic XML Sitemap</p>
                      <p className="text-[10px] text-gray-500">Auto-includes all public routes and articles</p>
                    </div>
                    <a href="http://localhost:5000/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                      Open /sitemap.xml ↗
                    </a>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">Dynamic robots.txt</p>
                      <p className="text-[10px] text-gray-500">Guides search engine crawlers</p>
                    </div>
                    <a href="http://localhost:5000/robots.txt" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">
                      Open /robots.txt ↗
                    </a>
                  </div>
                </div>

                {/* 301 Redirects Manager */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900">🔀 301 Permanent URL Redirects Manager</h3>
                    <span className="text-xs font-bold text-gray-500">{redirects.length} Active Rules</span>
                  </div>

                  <form onSubmit={handleCreateRedirect} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <input
                      type="text"
                      placeholder="Source Path (e.g. /old-article)"
                      value={newRedirect.sourceUrl}
                      onChange={(e) => setNewRedirect({ ...newRedirect, sourceUrl: e.target.value })}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Target Path (e.g. /blog/new-slug)"
                      value={newRedirect.targetUrl}
                      onChange={(e) => setNewRedirect({ ...newRedirect, targetUrl: e.target.value })}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#123C26] hover:bg-[#0E2E1D] text-white text-xs font-bold rounded-xl"
                    >
                      + Add 301 Rule
                    </button>
                  </form>

                  {redirects.length > 0 && (
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-gray-50 text-gray-500 font-bold">
                          <tr>
                            <th className="p-3">Source URL</th>
                            <th className="p-3">Target URL</th>
                            <th className="p-3">Hits</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {redirects.map((r) => (
                            <tr key={r.id}>
                              <td className="p-3 font-bold text-gray-900">{r.sourceUrl}</td>
                              <td className="p-3 text-emerald-800 font-bold">{r.targetUrl}</td>
                              <td className="p-3 text-gray-500">{r.hitCount || 0}</td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRedirect(r.id)}
                                  className="text-red-500 hover:text-red-700 font-bold"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
