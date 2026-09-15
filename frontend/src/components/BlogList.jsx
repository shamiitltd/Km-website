import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/imageUrlHelper';
import { showComingSoon } from './ComingSoonModal';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    "All Posts", "Crop Management", "Soil Health", "AI in Agriculture", "Market Insights", "Weather", "Success Stories"
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

  useEffect(() => {
    // Attempt to fetch from backend API
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs([]); // No placeholder data, truly real-time
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Backend not reachable", err);
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  // Compute real-time category counts case-insensitively
  const categoryCounts = blogs.reduce((acc, blog) => {
    if (blog.category) {
      const normalizedCat = blog.category.trim().toLowerCase();
      acc[normalizedCat] = (acc[normalizedCat] || 0) + 1;
    }
    return acc;
  }, {});

  const realCategories = [
    { name: 'Crop Management', count: categoryCounts['crop management'] || 0 },
    { name: 'Soil Health', count: categoryCounts['soil health'] || 0 },
    { name: 'AI in Agriculture', count: categoryCounts['ai in agriculture'] || 0 },
    { name: 'Market Insights', count: categoryCounts['market insights'] || 0 },
    { name: 'Weather', count: categoryCounts['weather'] || 0 },
    { name: 'Success Stories', count: categoryCounts['success stories'] || 0 },
  ];

  // Compute popular posts (using first 5 from real DB for now)
  const popularPosts = blogs.slice(0, 5);

  // Filter logic for both Category and Search Query
  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = activeCategory === 'All Posts' || (b.category && b.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getExcerpt = (htmlContent, length = 120) => {
    if (!htmlContent) return '';
    const plainText = htmlContent.replace(/<[^>]+>/g, '');
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length).trim() + '...';
  };

  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA] flex justify-center overflow-x-hidden">
      <div className="max-w-[95rem] w-full">
        
        {/* Top Header / Categories & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Categories Scrollable (Scrollbar fully hidden) */}
          <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-[15px] font-bold transition-colors border ${
                  activeCategory === cat 
                    ? 'bg-[#123C26] text-white border-[#123C26]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#2C8C44] hover:text-[#2C8C44]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[320px] shrink-0">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 bg-white border border-gray-200 rounded-full text-[15px] focus:outline-none focus:border-[#2C8C44]"
            />
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2C8C44]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column (Blog Posts) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8">
            {loading ? (
              <p className="text-gray-500 text-center text-lg py-10">Loading articles...</p>
            ) : filteredBlogs.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center">
                 <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
                 <p className="text-gray-500 text-[16px]">It looks like there aren't any blog posts matching your criteria.</p>
              </div>
            ) : (
              filteredBlogs.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow group cursor-pointer block">
                  {/* Image */}
                  <div className="w-full md:w-[320px] shrink-0 overflow-hidden h-[240px] md:h-auto relative">
                    <img 
                      src={resolveImageUrl(post.imageUrl)} 
                      onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center w-full">
                    <h3 className="text-[26px] md:text-[28px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-[#2C8C44] transition-colors w-full">{post.title}</h3>
                    <p className="text-gray-700 text-[15px] mb-6 line-clamp-3 leading-relaxed">
                      <strong>A Kisan Mitra Research Brief — {new Date().getFullYear()}</strong> <em className="text-gray-500">Category: {post.category}</em> Abstract: {getExcerpt(post.content, 120)}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#E8F5EA] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#2C8C44]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <span className="text-[14.5px] font-bold text-gray-700">{post.author}</span>
                      </div>
                      <div className="text-[14px] text-gray-500 font-medium">{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      <div className="flex items-center gap-1.5 text-[14px] text-gray-500 font-medium">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}

            {/* Load More */}
            {filteredBlogs.length > 0 && (
              <div className="flex justify-center mt-8">
                <button className="flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 rounded-full text-gray-700 font-bold text-[16px] hover:bg-gray-50 transition-colors shadow-sm">
                  Load More Articles
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10">
            
            {/* Popular Posts */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-[#123C26] text-[22px] font-bold mb-8">Popular Posts</h3>
              <div className="flex flex-col gap-8">
                {popularPosts.length > 0 ? popularPosts.map((post, idx) => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="flex items-center gap-5 group cursor-pointer block">
                    {/* Parent is relative but NOT overflow-hidden, preventing cutoff */}
                    <div className="relative shrink-0 w-24 h-24">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img 
                          src={resolveImageUrl(post.imageUrl)} 
                          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="absolute -top-2 -left-2 bg-[#2C8C44] text-white text-[13px] font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[16px] font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#2C8C44] transition-colors line-clamp-2">{post.title}</h4>
                      <p className="text-[13.5px] text-gray-500 font-medium">{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </Link>
                )) : (
                  <p className="text-gray-500 text-[15px]">No posts available.</p>
                )}
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-[#123C26] text-[22px] font-bold mb-5">Categories</h3>
              <div className="flex flex-col">
                {realCategories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 cursor-pointer group">
                    <span className="text-[16px] font-medium text-gray-700 group-hover:text-[#2C8C44] transition-colors">{cat.name}</span>
                    <span className="text-[14px] font-bold text-[#2C8C44] bg-[#F2F9F3] px-2.5 py-1 rounded-md">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-[#F2F9F3] rounded-2xl p-6 sm:p-7 border border-[#EBF5EE] relative overflow-hidden min-h-[350px] flex flex-col justify-between">
              <div className="relative z-10 w-full max-w-[50%] sm:max-w-[52%]">
                <h3 className="text-[#123C26] text-[20px] font-bold mb-2.5 leading-tight">Try Kisan Mitra App</h3>
                <p className="text-gray-700 text-[13.5px] leading-relaxed mb-5">
                  Get AI-powered recommendations, real-time alerts and much more.
                </p>
                <button 
                  onClick={() => showComingSoon('app', 'KisanMitra Mobile App', 'Get AI-powered agronomy recommendations, real-time alerts and much more.', 'blog_app')}
                  className="bg-[#2C8C44] hover:bg-[#1f6631] text-white font-bold text-[13.5px] py-2.5 px-5 rounded-xl transition-colors shadow-md w-max mb-3 cursor-pointer"
                >
                  Download Now
                </button>
                <div className="flex flex-col gap-1.5">
                   <div 
                     onClick={() => showComingSoon('app', 'KisanMitra on Google Play', 'Get direct Android APK and Google Play early access.', 'blog_app')}
                     className="bg-black text-white text-[10px] font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded cursor-pointer w-max hover:bg-gray-800 transition-colors"
                   >
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3.6 20.4l13.8-9L3.6 2.4v18zm14.4-9.6L22.2 12l-4.2 1.2-4.2-2.4 4.2-2.4zm-4.8 3L8.4 17.4l4.8-3.6zM8.4 6.6l4.8-3.6-4.8 3.6z"/></svg> 
                     Google Play
                   </div>
                   <div 
                     onClick={() => showComingSoon('app', 'KisanMitra on App Store', 'Get direct Apple iOS App Store testflight & release early access.', 'blog_app')}
                     className="bg-black text-white text-[10px] font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded cursor-pointer w-max hover:bg-gray-800 transition-colors"
                   >
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.1 14.1c-.8.4-1.7.5-2.6.5-3 0-5.5-2.4-5.5-5.5s2.4-5.5 5.5-5.5c.8 0 1.6.2 2.3.5-.2.6-.3 1.2-.3 1.8 0 2.2 1.3 4 3.1 5.1-.3 1.3-1.1 2.3-2.5 3.1z"/></svg> 
                     App Store
                   </div>
                </div>
              </div>
              
              {/* Phone Mockup Illustration with realistic App UI */}
              <div className="hidden lg:flex absolute -right-3 -bottom-8 w-52 xl:w-56 h-[330px] bg-slate-950 rounded-[2.5rem] shadow-2xl border-[6px] border-slate-900 flex-col overflow-hidden rotate-[-4deg] select-none pointer-events-none">
                 {/* Top Dynamic Island & Status Bar */}
                 <div className="bg-[#123C26] text-white h-11 w-full flex items-center justify-between px-3.5 shrink-0 border-b border-emerald-800/40 text-[9px]">
                    <div className="flex items-center gap-1.5 font-bold tracking-tight text-emerald-100">
                      <img src="/favicon.png" alt="KM" className="w-3.5 h-3.5 rounded-full bg-white p-0.5 object-contain" />
                      <span>KisanMitra</span>
                    </div>
                    <div className="w-11 h-3 bg-black rounded-full shadow-inner"></div>
                    <div className="flex items-center gap-1 text-[8px] text-emerald-200">
                      <span>28°C</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                 </div>

                 {/* In-App Live Content Screen */}
                 <div className="p-3 space-y-2.5 flex-grow bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 text-slate-800 overflow-hidden font-sans">
                    {/* Live Crop Advisory Card */}
                    <div className="bg-gradient-to-r from-[#123C26] to-[#2C8C44] text-white p-2.5 rounded-xl shadow-md">
                      <div className="flex justify-between items-center text-[8px] opacity-85 mb-0.5">
                        <span className="font-semibold uppercase tracking-wider">🌾 Crop Advisory</span>
                        <span className="bg-emerald-400/25 px-1.5 py-0.5 rounded text-[7px] font-bold">Rabi Season</span>
                      </div>
                      <div className="font-extrabold text-[11px] leading-tight">Wheat (HD-2967)</div>
                      <div className="text-[8px] text-emerald-100 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                        Optimal Irrigation Window Active
                      </div>
                    </div>

                    {/* AI Disease Scanner Quick Action */}
                    <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">📷</div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-800">AI Leaf Diagnostics</div>
                          <div className="text-[7.5px] text-slate-500">Scan & detect 40+ pests</div>
                        </div>
                      </div>
                      <span className="bg-emerald-600 text-white text-[8px] font-bold px-2 py-1 rounded-md shadow-sm">Scan</span>
                    </div>

                    {/* Live Mandi Rate Ticker */}
                    <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-100 shadow-sm">
                      <div className="flex justify-between items-center text-[7.5px] text-amber-800 font-bold mb-1">
                        <span>📊 Live Mandi Bhav</span>
                        <span className="text-emerald-700 font-extrabold">APMC Live</span>
                      </div>
                      <div className="flex justify-between items-center text-[8.5px]">
                        <span className="font-medium text-slate-700">Gehu (Wheat)</span>
                        <span className="font-extrabold text-emerald-800">₹2,450 <span className="text-[7px] text-emerald-600">▲ +₹45</span></span>
                      </div>
                      <div className="flex justify-between items-center text-[8.5px] mt-0.5">
                        <span className="font-medium text-slate-700">Sarson (Mustard)</span>
                        <span className="font-extrabold text-emerald-800">₹5,680 <span className="text-[7px] text-emerald-600">▲ +₹120</span></span>
                      </div>
                    </div>

                    {/* Mini Tab Bar */}
                    <div className="pt-1 flex justify-around text-[7.5px] text-slate-400 font-bold border-t border-slate-100">
                      <span className="text-emerald-700 font-extrabold">● Home</span>
                      <span>🌾 Crops</span>
                      <span>🌦️ Weather</span>
                      <span>📈 Mandi</span>
                    </div>
                 </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
