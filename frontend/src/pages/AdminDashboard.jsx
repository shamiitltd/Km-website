import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminBlog from './AdminBlog';
import AdminBroadcast from './AdminBroadcast';

export default function AdminDashboard({ defaultSection = 'dashboard', defaultSubSection = 'all' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Authentication State
  const [password, setPassword] = useState(() => {
    return sessionStorage.getItem('km_admin_auth') === 'true' ? 'admin123' : '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('km_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');

  // Active Navigation Module & Sub-Section State
  const activeSection = searchParams.get('tab') || defaultSection;
  const activeSubSection = searchParams.get('sub') || defaultSubSection;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleNavigate = (section, subSection = null) => {
    if (subSection) {
      setSearchParams({ tab: section, sub: subSection });
    } else {
      setSearchParams({ tab: section });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Analytics State
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState(7);
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

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError('Please enter the administrator password.');
      return;
    }
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
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/analytics/stats?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${password || 'admin123'}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('km_admin_auth');
      }
    } catch (err) {
      console.error('Failed to fetch analytics stats:', err);
    }
  }, [apiUrl, password, timeRange]);

  // Fetch SEO Settings and 301 Redirects
  const fetchSeoData = useCallback(async () => {
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
  }, [apiUrl, password]);

  // Fetch Media files
  const fetchMedia = useCallback(async () => {
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
  }, [apiUrl, password]);

  // Fetch Categories & Tags Summary
  const fetchTaxonomy = useCallback(async () => {
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
  }, [apiUrl]);

  // Fetch Comments
  const fetchComments = useCallback(async () => {
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
  }, [apiUrl, password]);

  // Fetch Subscribers
  const fetchSubscribers = useCallback(async () => {
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
    }
  }, [apiUrl, password]);

  // Initial and reactive data fetching
  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStats();
      fetchSeoData();
      fetchTaxonomy();
      if (activeSection === 'media') fetchMedia();
      if (activeSection === 'comments') fetchComments();
      if (activeSection === 'newsletter') fetchSubscribers();
    }
  }, [isAuthenticated, activeSection, fetchStats, fetchSeoData, fetchTaxonomy, fetchMedia, fetchComments, fetchSubscribers]);

  // 10-second auto-refresh for live traffic monitoring
  useEffect(() => {
    if (!isAuthenticated) {
      if (autoRefreshTimerRef.current) clearInterval(autoRefreshTimerRef.current);
      return;
    }

    autoRefreshTimerRef.current = setInterval(() => {
      fetchStats();
    }, 10000);

    return () => {
      if (autoRefreshTimerRef.current) clearInterval(autoRefreshTimerRef.current);
    };
  }, [isAuthenticated, fetchStats]);

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
        setSeoFeedback({ type: 'success', message: 'SEO settings successfully deployed to live website!' });
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
    { title: 'Weather Forecast & Radar', path: '/weather', status: 'Active', indexed: true, priority: '0.9', changefreq: 'daily' },
    { title: 'Crop Cultivation Advisory', path: '/crop-advisory', status: 'Active', indexed: true, priority: '0.9', changefreq: 'daily' },
    { title: 'APMC Mandi Market Prices', path: '/market-prices', status: 'Active', indexed: true, priority: '0.9', changefreq: 'daily' },
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
            <div className="mb-5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-rose-50 to-amber-50/60 border border-rose-200/90 text-rose-800 flex items-center gap-2.5 shadow-xs text-left">
              <div className="w-5 h-5 rounded-full bg-rose-500/15 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Administrator Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44] focus:border-[#2C8C44] outline-none text-center tracking-[0.2em] font-mono text-base"
                autoFocus
              />
            </div>
             <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#123C26] to-[#2C8C44] hover:from-[#0E2E1D] hover:to-[#227237] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enter Command Center</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate unified real-time stats metrics with resilient fallbacks
  const liveCount = stats?.live?.count ?? 0;
  const todayVisitors = stats?.today?.uniqueVisitors ?? stats?.today?.visitors ?? 0;
  const todayViews = stats?.today?.views ?? stats?.today?.pageviews ?? 0;
  const lifetimeVisitors = stats?.allTime?.uniqueVisitors ?? stats?.lifetime?.visitors ?? 0;
  const lifetimeViews = stats?.allTime?.totalViews ?? stats?.lifetime?.views ?? 0;
  const subscribersCount = stats?.hub?.subscribers ?? subscribers.length ?? 0;
  const publishedBlogs = stats?.hub?.blogsPublished ?? stats?.hub?.publishedBlogs ?? 0;
  const draftBlogs = stats?.hub?.blogsDraft ?? stats?.hub?.draftBlogs ?? 0;

  // 2. Main Executive Unified Dashboard Layout with Left Sidebar
  return (
    <div className="h-screen w-full bg-[#F8FAF8] flex overflow-hidden text-gray-900 font-sans">
      
      {/* 2.1 AUTHENTIC KISAN MITRA SIDEBAR (Matching reference image strictly) */}
      <AdminSidebar
        activeSection={activeSection}
        activeSubSection={activeSubSection}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        counts={{
          posts: publishedBlogs,
          subscribers: subscribersCount,
          liveVisitors: liveCount,
          media: mediaFiles.length,
          comments: comments.length
        }}
      />

      {/* 2.2 MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto">
        
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

            {/* Quick Status / Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="text-[#123C26] uppercase tracking-wider">Control Center</span>
              <span>/</span>
              <span className="capitalize text-gray-800">{activeSection}</span>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-3">
            {/* Live active beacon */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200/60 text-xs font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live: {liveCount} Online</span>
            </div>

            {/* Quick Public Site Link */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 shadow-2xs transition-all"
            >
              <span>View Site</span>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>

            {/* Lock session button */}
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
            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Image URL copied to clipboard!</span>
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
                  <div className="text-3xl font-black text-gray-900">{liveCount}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">Active right now</p>
                </div>

                {/* Today's Visitors */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Visitors</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{todayVisitors}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{todayViews} total pageviews</p>
                </div>

                {/* All-Time Reach */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">All-Time Reach</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{lifetimeVisitors}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{lifetimeViews} total views</p>
                </div>

                {/* Subscribers */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subscribers</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{subscribersCount}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">Newsletter community</p>
                </div>

                {/* Blog Posts */}
                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Posts</span>
                  <div className="text-3xl font-black text-gray-900 mt-2">{publishedBlogs}</div>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{draftBlogs} in drafts</p>
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
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-2.5 group-hover:bg-[#123C26] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Write Article</span>
                    <span className="text-[10px] text-gray-400">Open Blog CMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('newsletter')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-2.5 group-hover:bg-[#123C26] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.063.046-.128.09-.194.133L6.87 18.257a1.125 1.125 0 01-1.62-1.002V6.745a1.125 1.125 0 011.62-1.002l3.276 2.284c.066.043.131.087.194.133m0 7.68v-7.68m0 7.68A2.25 2.25 0 0012.59 18h2.036c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125H12.59a2.25 2.25 0 00-2.25 2.25m4.5 3.375h1.5a2.25 2.25 0 002.25-2.25v0a2.25 2.25 0 00-2.25-2.25h-1.5" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Broadcast</span>
                    <span className="text-[10px] text-gray-400">Email subscribers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('media')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-2.5 group-hover:bg-[#123C26] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Media Library</span>
                    <span className="text-[10px] text-gray-400">Manage assets</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('analytics')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-2.5 group-hover:bg-[#123C26] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#123C26] block">Traffic Stats</span>
                    <span className="text-[10px] text-gray-400">Full telemetry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate('settings')}
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-2.5 group-hover:bg-[#123C26] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                    </div>
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
                      className="text-xs text-emerald-700 hover:text-emerald-900 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Analytics</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
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
                      <a href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-bold text-xs">
                        /sitemap.xml ↗
                      </a>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">Robots Directives</p>
                        <p className="text-[11px] text-gray-500">Allow: /, Disallow: /admin, Sitemap reference</p>
                      </div>
                      <a href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}/robots.txt`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-bold text-xs">
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
                          <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#123C26] flex items-center justify-center mb-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.38 2.25c-4.42 0-8 3.58-8 8 0 2.22.9 4.23 2.36 5.67-.14-.54-.23-1.11-.23-1.7 0-3.86 3.14-7 7-7 .59 0 1.16.09 1.7.23C14.77 4.15 13.68 2.25 12.38 2.25zM17.75 8.5c-3.87 0-7 3.13-7 7 0 .59.09 1.16.23 1.7 1.44-1.46 2.34-3.48 2.34-5.7 0-.58-.09-1.15-.24-1.69 1.25.75 2.17 2.05 2.47 3.59.13-.61.2-1.25.2-1.9 0-1.66-1.34-3-3-3z"/>
                            </svg>
                          </div>
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
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Filter Posts</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
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
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span>Media Asset Library</span>
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Upload Media Asset</span>
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
                            className="text-[10px] font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            <span>Copy URL</span>
                          </button>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-gray-400 hover:text-gray-700 inline-flex items-center gap-0.5"
                          >
                            <span>Open</span>
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
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
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span>Public Website Pages Directory</span>
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
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                              </svg>
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
                    onClick={() => handleNavigate('newsletter', 'broadcast')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                      activeSubSection !== 'subscribers'
                        ? 'bg-[#123C26] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.063.046-.128.09-.194.133L6.87 18.257a1.125 1.125 0 01-1.62-1.002V6.745a1.125 1.125 0 011.62-1.002l3.276 2.284c.066.043.131.087.194.133m0 7.68v-7.68m0 7.68A2.25 2.25 0 0012.59 18h2.036c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125H12.59a2.25 2.25 0 00-2.25 2.25m4.5 3.375h1.5a2.25 2.25 0 002.25-2.25v0a2.25 2.25 0 00-2.25-2.25h-1.5" />
                    </svg>
                    <span>Broadcast Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleNavigate('newsletter', 'subscribers');
                      fetchSubscribers();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                      activeSubSection === 'subscribers'
                        ? 'bg-[#123C26] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <span>Subscriber Hub ({subscribers.length || subscribersCount || '•'})</span>
                  </button>
                </div>

                {activeSubSection === 'subscribers' && (
                  <button
                    type="button"
                    onClick={exportSubscribersCSV}
                    disabled={!subscribers.length}
                    className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Export CSV</span>
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
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span>Reader Comments & Feedback Moderation</span>
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
                    No reader comments pending moderation. All clear!
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
                    {liveCount}
                  </div>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Active in last 60 seconds</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Visitors</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{todayVisitors}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{todayViews} views today</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">All-Time Reach</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{lifetimeVisitors}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{lifetimeViews} total views</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subscribers</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{subscribersCount}</div>
                  <p className="text-[11px] text-gray-400 font-medium">Community members</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Posts</span>
                  <div className="text-3xl font-black text-gray-900 my-1">{publishedBlogs}</div>
                  <p className="text-[11px] text-gray-400 font-medium">{draftBlogs} drafts</p>
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
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                    <span>Search Engine Optimization & Webmaster Center</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage Google Search Console, Bing Webmaster code, robots directives, dynamic sitemaps, and 301 URL redirects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSeo}
                  disabled={isSavingSeo}
                  className="px-5 py-2.5 bg-[#123C26] hover:bg-[#0F311F] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  <span>{isSavingSeo ? 'Deploying Changes...' : 'Deploy & Save SEO Settings'}</span>
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
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <span>Webmaster Verification Tokens</span>
                  </h3>
                  
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
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Crawling Directives & Sitemaps</span>
                  </h3>

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
                    <a href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                      Open /sitemap.xml ↗
                    </a>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">Dynamic robots.txt</p>
                      <p className="text-[10px] text-gray-500">Guides search engine crawlers</p>
                    </div>
                    <a href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}/robots.txt`} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">
                      Open /robots.txt ↗
                    </a>
                  </div>
                </div>

                {/* 301 Redirects Manager */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                      <span>301 Permanent URL Redirects Manager</span>
                    </h3>
                    <span className="text-xs font-bold text-gray-500">{redirects.length} Active Rules</span>
                  </div>

                  <form onSubmit={handleCreateRedirect} noValidate className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <input
                      type="text"
                      placeholder="Source Path (e.g. /old-article)"
                      value={newRedirect.sourceUrl}
                      onChange={(e) => setNewRedirect({ ...newRedirect, sourceUrl: e.target.value })}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Target Path (e.g. /blog/new-slug)"
                      value={newRedirect.targetUrl}
                      onChange={(e) => setNewRedirect({ ...newRedirect, targetUrl: e.target.value })}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono"
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
