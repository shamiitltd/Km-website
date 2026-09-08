import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminBroadcast({ embedded = false }) {
  const [password, setPassword] = useState(() => {
    return (embedded || sessionStorage.getItem('km_admin_auth') === 'true') ? 'admin123' : '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return embedded || sessionStorage.getItem('km_admin_auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState('compose'); // 'compose' | 'history'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Stats
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [recentBroadcasts, setRecentBroadcasts] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Form State
  const initialFormState = {
    subject: '',
    category: 'Fair Pricing Launch',
    heading: '',
    imageUrl: '',
    message: '',
    ctaText: 'Explore KisanMitra',
    ctaUrl: 'https://kisanmitra.in'
  };
  const [formData, setFormData] = useState(initialFormState);

  // Feedback & Modal states
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Test Email Modal
  const [showTestModal, setShowTestModal] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testStatus, setTestStatus] = useState({ type: '', message: '' });

  const categoryPresets = [
    'Fair Pricing Launch',
    'Crop Advisory',
    'Feature Rollout',
    'Community News',
    'Seasonal Alert'
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('km_admin_auth', 'true');
    } else {
      setStatus({ type: 'error', message: 'Incorrect credentials. Access denied.' });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('km_admin_auth') === 'true') {
      setIsAuthenticated(true);
      setPassword('admin123');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/newsletter/stats`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriberCount(data.subscriberCount || 0);
        setRecentBroadcasts(data.recentBroadcasts || []);
      }
    } catch (err) {
      console.error('Failed to fetch broadcast stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Dispatch Test Email
  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    if (!testEmail.trim()) return;

    setIsSendingTest(true);
    setTestStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/newsletter/test-broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          testEmail: testEmail.trim(),
          ...formData
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus({ type: 'success', message: data.message });
      } else {
        setTestStatus({ type: 'error', message: data.error || 'Failed to dispatch test email.' });
      }
    } catch (err) {
      setTestStatus({ type: 'error', message: 'Network error while sending test email.' });
    } finally {
      setIsSendingTest(false);
    }
  };

  // Dispatch Full Broadcast to All Subscribers
  const handleConfirmBroadcast = async () => {
    setIsBroadcasting(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/newsletter/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: `✨ Broadcast successfully sent! Delivered to ${data.sent} of ${data.count} subscriber(s).`
        });
        setFormData(initialFormState);
        fetchStats();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to dispatch broadcast.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error during broadcast transmission.' });
    } finally {
      setIsBroadcasting(false);
      setShowConfirmModal(false);
    }
  };

  const inputClasses = "w-full px-4 py-3.5 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 focus:border-[#2C8C44] outline-none transition-all text-gray-800 text-sm";
  const labelClasses = "block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1";

  // 1. Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-gray-50 to-white flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="max-w-md w-full bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-green-900/10 border border-white p-10 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#123C26] to-[#2C8C44] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] to-[#2C8C44] mb-2">
            Broadcast Studio
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8 font-medium">Administrator Access</p>
          
          {status.message && (
            <div className="mb-6 p-4 rounded-xl text-sm font-semibold bg-red-50 border border-red-100 text-red-600">
              {status.message}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/50 focus:border-[#2C8C44] outline-none text-center tracking-[0.25em] font-medium"
              placeholder="••••••••"
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-[#123C26] to-[#2C8C44] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transform hover:-translate-y-0.5 transition-all cursor-pointer">
              Authenticate Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={embedded ? "w-full" : "min-h-screen bg-[#F8FAF8] py-12 px-4 sm:px-6 lg:px-10"}>
      <div className={embedded ? "w-full" : "max-w-[100rem] mx-auto"}>
        {/* TOP ADMIN QUICK NAVIGATION BAR */}
        {!embedded && (
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-200/60">
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] text-xs font-bold rounded-xl border border-gray-200 hover:border-[#123C26]/30 shadow-2xs transition-all"
              >
                <svg className="w-3.5 h-3.5 text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Command Center</span>
              </Link>
              <span className="text-gray-300 text-xs">/</span>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                Broadcast Studio
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] text-xs font-bold rounded-xl border border-gray-200 hover:border-[#123C26]/30 shadow-2xs transition-all"
              >
                <span className="text-xs">✍️</span>
                <span>Blog Writer CMS</span>
              </Link>
              <button
                onClick={() => {
                  sessionStorage.removeItem('km_admin_auth');
                  setIsAuthenticated(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-medium rounded-xl border border-gray-200 hover:border-red-200 shadow-2xs transition-all cursor-pointer"
              >
                <span>Lock Studio</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6 border-b border-gray-200/80 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-black text-[#123C26] tracking-tight">
                Newsletter & Broadcast Studio
              </h1>
              <span className="bg-[#EAF7ED] text-[#2C8C44] text-xs font-bold px-3 py-1 rounded-full border border-[#2C8C44]/30">
                mail.shamiit.com SMTP
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              Compose, preview, test, and broadcast email notifications to all subscribed farmers & members.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white rounded-2xl p-1.5 border border-gray-200 shadow-xs">
              <button
                onClick={() => setActiveTab('compose')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'compose' ? 'bg-[#123C26] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                Compose Broadcast
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'history' ? 'bg-[#123C26] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Broadcast History
              </button>
            </div>

            <Link
              to="/admin/blog/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:text-[#2C8C44] hover:border-[#2C8C44]/40 shadow-xs transition-all"
            >
              CMS Blog Posts →
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2.5 bg-white border border-red-200 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 shadow-xs transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Audience Metrics Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7ED] text-[#2C8C44] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Audience</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#123C26]">
                  {isLoadingStats ? '...' : subscriberCount}
                </span>
                <span className="text-xs font-semibold text-[#2C8C44] bg-[#EAF7ED] px-2 py-0.5 rounded-full">
                  Verified Subscribers
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F7FF] text-[#0066CC] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">SMTP Server</p>
              <p className="text-base font-extrabold text-gray-800 mt-0.5">mail.shamiit.com</p>
              <p className="text-xs text-gray-500">SSL/TLS Port 465 (Online)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5FF] text-[#7E22CE] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Universal Reach</p>
              <p className="text-base font-extrabold text-gray-800 mt-0.5">All Portals Included</p>
              <p className="text-xs text-gray-500">Pricing • Careers • Refund • Blog</p>
            </div>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {status.message && (
          <div className={`mb-8 p-5 rounded-2xl font-semibold flex items-center gap-3 border shadow-xs animate-fade-in ${
            status.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-[#EAF7ED] text-[#123C26] border-[#2C8C44]/30'
          }`}>
            {status.type === 'success' ? (
              <svg className="w-6 h-6 text-[#2C8C44] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            )}
            <span>{status.message}</span>
          </div>
        )}

        {/* TAB 1: COMPOSE & PREVIEW STUDIO */}
        {activeTab === 'compose' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Composer (55%) */}
            <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 lg:p-10 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#123C26] mb-6 flex items-center gap-2.5">
                <span>Compose Announcement</span>
              </h2>

              <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="space-y-6">
                
                {/* Category Preset Pills */}
                <div>
                  <label className={labelClasses}>Announcement Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categoryPresets.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                          formData.category === cat
                            ? 'bg-[#123C26] text-white border-[#123C26] shadow-xs'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Subject */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={labelClasses}>Email Subject Line *</label>
                    <span className="text-xs text-gray-400">{formData.subject.length} chars</span>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. 🌱 KisanMitra Fair Pricing Plans Are Now Live!"
                    className={`${inputClasses} font-semibold`}
                  />
                </div>

                {/* Heading / Title */}
                <div>
                  <label className={labelClasses}>In-Email Headline Title *</label>
                  <input
                    type="text"
                    name="heading"
                    required
                    value={formData.heading}
                    onChange={handleInputChange}
                    placeholder="e.g. Empowering Your Fields With Fair & Accessible Tools"
                    className={inputClasses}
                  />
                </div>

                {/* Banner Image URL (Optional) */}
                <div>
                  <label className={labelClasses}>Banner Image URL (Optional)</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/... or leave empty"
                    className={inputClasses}
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className={labelClasses}>Message Body *</label>
                  <textarea
                    name="message"
                    required
                    rows="7"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your announcement here. Use blank lines between paragraphs. It will be formatted into a clean, modern email layout automatically..."
                    className={`${inputClasses} resize-none leading-relaxed font-normal`}
                  ></textarea>
                </div>

                {/* Call-to-Action Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className={labelClasses}>Button Label (CTA)</label>
                    <input
                      type="text"
                      name="ctaText"
                      value={formData.ctaText}
                      onChange={handleInputChange}
                      placeholder="e.g. View Pricing Plans"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Button Target URL</label>
                    <input
                      type="url"
                      name="ctaUrl"
                      value={formData.ctaUrl}
                      onChange={handleInputChange}
                      placeholder="https://kisanmitra.in/pricing"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTestModal(true);
                      setTestStatus({ type: '', message: '' });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                    Send Test Preview
                  </button>

                  <button
                    type="submit"
                    disabled={!formData.subject.trim() || !formData.message.trim()}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#123C26] hover:bg-[#1b5034] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Broadcast to All ({subscriberCount})
                  </button>
                </div>

              </form>
            </div>

            {/* Right Column: Real-time Inbox Simulator (45%) */}
            <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-[#123C26] text-lg">Live Inbox Preview</h3>
                  <p className="text-xs text-gray-400">Updates live as you type</p>
                </div>
                
                {/* Device Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewDevice === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewDevice === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              {/* Email Envelope Meta Preview */}
              <div className="bg-gray-50 p-4 rounded-2xl mb-5 border border-gray-200/70 text-xs text-gray-600 space-y-1">
                <p><strong>From:</strong> KisanMitra Updates &lt;km@shamiit.com&gt;</p>
                <p><strong>To:</strong> Subscriber &lt;subscriber@example.com&gt;</p>
                <p className="truncate"><strong>Subject:</strong> {formData.subject || 'Subject preview will appear here...'}</p>
              </div>

              {/* Rendered Email Layout Container */}
              <div className="flex justify-center bg-gray-100 p-4 rounded-2xl overflow-y-auto max-h-[620px]">
                <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                  previewDevice === 'desktop' ? 'w-full max-w-[560px]' : 'w-[360px]'
                }`}>
                  
                  {/* Email Header */}
                  <div className="bg-gradient-to-r from-[#0A2213] to-[#123C26] p-6 text-center text-white">
                    <span className="inline-block bg-[#B0D939]/20 border border-[#B0D939]/40 text-[#B0D939] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {formData.category || 'Announcement'}
                    </span>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">KisanMitra</h2>
                    <p className="text-xs text-emerald-200 mt-0.5">Smart Agriculture • Advisory • Community</p>
                  </div>

                  {/* Banner Image Preview */}
                  {formData.imageUrl && (
                    <div className="w-full max-h-56 overflow-hidden bg-gray-100">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-auto max-h-56 object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-[#123C26] mb-3 leading-snug">
                      {formData.heading || formData.subject || 'Your Announcement Headline'}
                    </h3>

                    <div className="text-gray-700 text-sm leading-relaxed space-y-3 whitespace-pre-line">
                      {formData.message || 'Write your message content on the left to see it rendered in this email simulation in real-time.'}
                    </div>

                    {/* CTA Button */}
                    {formData.ctaText && (
                      <div className="text-center my-6">
                        <span className="inline-block bg-[#2C8C44] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm">
                          {formData.ctaText} →
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email Footer */}
                  <div className="bg-[#FAFCFA] border-t border-gray-100 p-4 text-center text-[11px] text-gray-400">
                    <p className="mb-1">Sent to subscribed members of the KisanMitra community.</p>
                    <p>SHAMIIT LLP • Dayanatpur Jewar, Greater Noida, UP - 203135, India</p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: BROADCAST HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xs animate-fade-in">
            <h2 className="text-2xl font-bold text-[#123C26] mb-6">Past Broadcast Dispatches</h2>
            
            {recentBroadcasts.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <p className="text-gray-500 font-bold text-base">No manual broadcasts sent yet.</p>
                <p className="text-gray-400 text-sm mt-1">When you broadcast announcements to subscribers, records will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4">Subject</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-center">Recipients</th>
                      <th className="p-4 text-center">Delivered</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {recentBroadcasts.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="p-4 font-bold text-gray-900">{log.subject}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                            {log.category}
                          </span>
                        </td>
                        <td className="p-4 text-center font-semibold">{log.recipientCount}</td>
                        <td className="p-4 text-center text-emerald-700 font-semibold">{log.sentCount}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            log.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-gray-500 text-xs">
                          {new Date(log.sentAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#EAF7ED] text-[#2C8C44] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </div>
            
            <h3 className="text-2xl font-black text-[#123C26] mb-2">Confirm Email Broadcast</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You are about to broadcast this email to all <strong className="text-gray-900">{subscriberCount} verified subscriber(s)</strong> via <strong className="text-gray-900">mail.shamiit.com</strong>.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl text-left text-xs mb-6 border border-gray-200/80 space-y-1">
              <p className="font-bold text-gray-800 truncate">Subject: {formData.subject}</p>
              <p className="text-gray-500">Category: {formData.category}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isBroadcasting}
                className="w-1/2 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBroadcast}
                disabled={isBroadcasting}
                className="w-1/2 py-3.5 bg-[#123C26] hover:bg-[#1b5034] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isBroadcasting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Broadcast</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEST PREVIEW MODAL */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-[#123C26] mb-2">Send Test Preview Email</h3>
            <p className="text-gray-500 text-xs mb-6">
              Dispatch a test copy to your personal email to review layout and formatting before broadcasting to subscribers.
            </p>

            {testStatus.message && (
              <div className={`mb-5 p-4 rounded-xl text-xs font-bold border ${
                testStatus.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {testStatus.message}
              </div>
            )}

            <form onSubmit={handleSendTestEmail} className="space-y-5">
              <div>
                <label className={labelClasses}>Recipient Test Email</label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className={inputClasses}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSendingTest || !testEmail.trim()}
                  className="w-1/2 py-3 bg-[#2C8C44] hover:bg-[#1f6631] disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSendingTest ? 'Sending...' : 'Send Test Copy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
