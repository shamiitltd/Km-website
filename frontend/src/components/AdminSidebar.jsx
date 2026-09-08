import React, { useState } from 'react';
import farmBgImage from '../assets/farm_bg.jpg';

export default function AdminSidebar({
  activeSection = 'dashboard',
  activeSubSection = 'all',
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
  counts = {}
}) {
  const [isPostsOpen, setIsPostsOpen] = useState(true);

  const handleSectionClick = (section, subSection = null) => {
    if (section === 'posts') {
      if (activeSection === 'posts' && !subSection) {
        setIsPostsOpen(!isPostsOpen);
        return;
      }
      setIsPostsOpen(true);
      if (onNavigate) onNavigate('posts', subSection || activeSubSection || 'all');
      if (onCloseMobile) onCloseMobile();
      return;
    }

    if (onNavigate) onNavigate(section, subSection);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 sm:w-72 bg-[#F7FAF7] border-r border-[#E2EBE2] flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 overflow-hidden select-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* TOP BRANDING & LOGO */}
        <div className="p-6 pb-4 border-b border-[#E8EFE8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Sprout Logo Graphic matching screenshot */}
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
              <svg className="w-6 h-6 text-[#247A46]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79.09.02.18.04.29.04 1.66 0 3-1.34 3-3 0-.11-.02-.2-.04-.29 2.01-.73 4.22-.38 5.86.97.13.11.26.22.38.34 1.48 1.48 2.3 3.5 2.3 5.73 0 2.21-.83 4.23-2.3 5.73-.55.55-1.19.98-1.9 1.25-.26-.03-.53-.05-.8-.05zm2.84-4.24c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41.78.78 1.27 1.76 1.41 2.82.96-.82 1.68-1.9 2.04-3.14-.65-.45-1.36-.83-2.04-1.09z" />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-black text-[#134629] tracking-tight leading-none">
                Kisan Mitra
              </h1>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider mt-1 flex items-center gap-1.5">
                <span>Farmers</span>
                <span className="text-[#247A46]">•</span>
                <span>Nature</span>
                <span className="text-[#247A46]">•</span>
                <span>Together</span>
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* NAVIGATION ITEMS LIST */}
        <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100">
          
          {/* 1. DASHBOARD */}
          <button
            type="button"
            onClick={() => handleSectionClick('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'dashboard'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500 group-hover:text-[#134629]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span>Dashboard</span>
            </div>
          </button>

          {/* 2. POSTS ACCORDION */}
          <div className="space-y-1">
            {/* Posts Primary Header Tab */}
            <button
              type="button"
              onClick={() => handleSectionClick('posts')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                activeSection === 'posts'
                  ? 'bg-[#247A46] text-white shadow-sm'
                  : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className={`w-5 h-5 ${activeSection === 'posts' ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>Posts</span>
              </div>
              
              {/* Accordion Chevron Up/Down */}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isPostsOpen ? 'rotate-180' : 'rotate-0'
                } ${activeSection === 'posts' ? 'text-white' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Posts Sub-Menu Accordion Items */}
            {isPostsOpen && (
              <div className="pt-1 pb-1 space-y-1 pl-4 pr-1">
                {/* All Posts */}
                <button
                  type="button"
                  onClick={() => handleSectionClick('posts', 'all')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSection === 'posts' && activeSubSection === 'all'
                      ? 'bg-[#E1F3E3] text-[#123C26]'
                      : 'text-gray-600 hover:text-[#134629] hover:bg-white/60'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeSection === 'posts' && activeSubSection === 'all' ? 'bg-[#207542]' : 'bg-gray-400'
                  }`} />
                  <span>All Posts</span>
                  {counts.posts !== undefined && (
                    <span className="ml-auto text-[10px] text-gray-400 font-normal">
                      {counts.posts}
                    </span>
                  )}
                </button>

                {/* Write New (styled matching the reference image light green highlight) */}
                <button
                  type="button"
                  onClick={() => handleSectionClick('posts', 'write')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSection === 'posts' && activeSubSection === 'write'
                      ? 'bg-[#E1F3E3] text-[#123C26] shadow-2xs font-black'
                      : 'text-gray-600 hover:text-[#123C26] hover:bg-white/60'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeSection === 'posts' && activeSubSection === 'write' ? 'bg-[#207542]' : 'bg-gray-400'
                  }`} />
                  <span>Write New</span>
                </button>

                {/* Categories */}
                <button
                  type="button"
                  onClick={() => handleSectionClick('posts', 'categories')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSection === 'posts' && activeSubSection === 'categories'
                      ? 'bg-[#E1F3E3] text-[#123C26]'
                      : 'text-gray-600 hover:text-[#134629] hover:bg-white/60'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeSection === 'posts' && activeSubSection === 'categories' ? 'bg-[#207542]' : 'bg-gray-400'
                  }`} />
                  <span>Categories</span>
                </button>

                {/* Tags */}
                <button
                  type="button"
                  onClick={() => handleSectionClick('posts', 'tags')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSection === 'posts' && activeSubSection === 'tags'
                      ? 'bg-[#E1F3E3] text-[#123C26]'
                      : 'text-gray-600 hover:text-[#134629] hover:bg-white/60'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeSection === 'posts' && activeSubSection === 'tags' ? 'bg-[#207542]' : 'bg-gray-400'
                  }`} />
                  <span>Tags</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. MEDIA */}
          <button
            type="button"
            onClick={() => handleSectionClick('media')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'media'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span>Media</span>
            </div>
            {counts.media !== undefined && (
              <span className="text-[11px] text-gray-400 font-mono font-medium">
                {counts.media}
              </span>
            )}
          </button>

          {/* 4. PAGES */}
          <button
            type="button"
            onClick={() => handleSectionClick('pages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'pages'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>Pages</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-mono">
              10
            </span>
          </button>

          {/* 5. NEWSLETTER */}
          <button
            type="button"
            onClick={() => handleSectionClick('newsletter')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'newsletter'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>Newsletter</span>
            </div>
            {counts.subscribers !== undefined && (
              <span className="text-[11px] text-gray-500 font-mono">
                {counts.subscribers}
              </span>
            )}
          </button>

          {/* 6. COMMENTS */}
          <button
            type="button"
            onClick={() => handleSectionClick('comments')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'comments'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.84-.84 4.5 4.5 0 00.32-1.35C3.393 17.202 3 14.73 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <span>Comments</span>
            </div>
            {counts.comments !== undefined && (
              <span className="text-[11px] text-gray-400 font-mono">
                {counts.comments}
              </span>
            )}
          </button>

          {/* 7. ANALYTICS */}
          <button
            type="button"
            onClick={() => handleSectionClick('analytics')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'analytics'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <span>Analytics</span>
            </div>
            {counts.liveVisitors !== undefined && counts.liveVisitors > 0 && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {counts.liveVisitors}
              </span>
            )}
          </button>

          {/* 8. SETTINGS */}
          <button
            type="button"
            onClick={() => handleSectionClick('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'settings'
                ? 'bg-[#EAF5EC] text-[#134629] shadow-2xs'
                : 'text-gray-700 hover:text-[#134629] hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </div>
          </button>

        </div>

        {/* BOTTOM SCENIC FARM ARTWORK SECTION (Matching user reference image strictly) */}
        <div className="relative mt-auto h-48 sm:h-56 w-full overflow-hidden shrink-0 border-t border-[#E8EFE8]/80">
          {/* Farm Background Image with rows of green crops */}
          <img
            src={farmBgImage}
            alt="Lush green farm fields"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          
          {/* Gradient Overlay for smooth transition from sidebar background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAF7] via-[#F7FAF7]/70 to-transparent" />

          {/* Inspirational Quote Overlay */}
          <div className="absolute bottom-4 left-0 right-0 px-5 text-left pointer-events-none">
            <div className="flex items-start gap-1">
              <span className="text-[#134629] font-serif text-xl sm:text-2xl leading-none select-none font-bold">
                “
              </span>
              <p className="font-serif italic text-xs sm:text-[13px] font-bold text-[#0D341E] leading-tight drop-shadow-xs">
                Better Farming<br />
                Brighter Tomorrows”
              </p>
            </div>
            
            {/* Green leaf accent graphic at the bottom right */}
            <div className="flex justify-end -mt-1 pr-1">
              <svg className="w-5 h-5 text-emerald-600 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.38 2.25c-4.42 0-8 3.58-8 8 0 2.22.9 4.23 2.36 5.67-.14-.54-.23-1.11-.23-1.7 0-3.86 3.14-7 7-7 .59 0 1.16.09 1.7.23C14.77 4.15 13.68 2.25 12.38 2.25zM17.75 8.5c-3.87 0-7 3.13-7 7 0 .59.09 1.16.23 1.7 1.44-1.46 2.34-3.48 2.34-5.7 0-.58-.09-1.15-.24-1.69 1.25.75 2.17 2.05 2.47 3.59.13-.61.2-1.25.2-1.9 0-1.66-1.34-3-3-3z"/>
              </svg>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
