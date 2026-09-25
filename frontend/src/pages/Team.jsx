import { useState } from 'react';
import { Link } from 'react-router-dom';
import ppf from '../assets/ppf.jpeg';
import vup from '../assets/avatar_v.jpg';

export default function Team() {
  // Avatars can easily be customized with image URLs or fallback to stylish initials
  const [avatars] = useState({
    raghav: ppf,
    vinay: vup
  });

  const coreLeads = [
    {
      id: 'raghav',
      name: 'Raghav Aggarwal',
      role: 'Lead Full-Stack Web Engineer & Platform Architect',
      focusArea: 'Web Architecture & Cloud Infrastructure',
      badge: 'Platform Lead',
      avatarUrl: avatars.raghav,
      initials: 'RA',
      avatarBg: 'bg-gradient-to-br from-[#123C26] to-[#2C8C44]',
      bio: 'Architected and engineered the entire Kisan Mitra web platform ecosystem from the ground up. Spearheaded the real-time Indian Government Agmarknet Mandi price ingestion engine, interactive geospatial weather maps, high-performance responsive UI, and enterprise-grade SEO architecture designed to empower farmers and agribusinesses across India.',
      skills: [
        'React & Vite SPA',
        'Node.js & Express REST APIs',
        'Real-time Mandi Engine',
        'Geospatial Weather & GIS',
        'Responsive Web UX',
        'Enterprise SEO'
      ],
      contributions: [
        'Engineered 22-state live APMC Mandi database and dynamic charting engine',
        'Built full-stack blog publishing system with instant XML sitemap generator',
        'Designed pixel-perfect responsive web application with zero-latency caching'
      ],
      socials: {
        github: 'https://github.com/Raghavaggarwal2',
        linkedin: 'https://linkedin.com/in/raghav-aggarwal-d',
        email: 'mailto:raghav05.work@gmail.com'
      }
    },
    {
      id: 'vinay',
      name: 'Vinay Upadhyay',
      role: 'Lead Mobile Engineer & App Architect',
      focusArea: 'Mobile Ecosystem & Edge AI Diagnostics',
      badge: 'Mobile Lead',
      avatarUrl: avatars.vinay,
      initials: 'VU',
      avatarBg: 'bg-gradient-to-br from-[#0F3820] to-[#3B9E56]',
      bio: 'Leading the native mobile experience for Kisan Mitra on Android and iOS. Specializes in offline-first sync architectures, on-device Edge AI vision pipelines for instant crop disease detection, voice-guided regional advisory, and lightweight mobile telemetry engineered for seamless performance in low-connectivity rural fields.',
      skills: [
        'Mobile App Architecture',
        'Edge AI & Computer Vision',
        'Offline-First Data Sync',
        'Android & iOS Ecosystems',
        'Multilingual Voice UX',
        'Low-Bandwidth Telemetry'
      ],
      contributions: [
        'Spearheading mobile app architecture with instant camera crop diagnostics',
        'Engineered offline SQLite sync protocol for uninterrupted field usage',
        'Designed multilingual, high-contrast farmer-centric mobile interface'
      ],
      socials: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:support@kisanmitra.com'
      }
    }
  ];

  const extendedDomains = [
    {
      title: 'Agronomy & Crop Science Specialists',
      desc: 'Formulating scientific ICAR package of practices, seasonal soil health matrices, and precise N-P-K fertilizer schedules tailored to Indian agro-climatic zones.',
      icon: (
        <svg className="w-7 h-7 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8 8 0 018-8h2v2a8 8 0 01-8 8h-2zM12 13a8 8 0 00-8-8H2v2a8 8 0 008 8h2z" />
        </svg>
      ),
      count: '3 Agronomists'
    },
    {
      title: 'AI & Computer Vision Researchers',
      desc: 'Training custom convolutional neural networks on 50,000+ localized field imagery datasets for rapid, accurate leaf blight, pest, and nutrient deficiency identification.',
      icon: (
        <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
      count: '2 AI Researchers'
    },
    {
      title: 'Field Operations & Rural Ambassadors',
      desc: 'Connecting directly with farmers, FPOs, and APMC mandis across UP, Punjab, Haryana, and Maharashtra for ground-truth validation and real-world pilot feedback.',
      icon: (
        <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      count: '4 Field Coordinators'
    },
    {
      title: 'Cloud Infrastructure & Security',
      desc: 'Maintaining 99.9% uptime, automated rate-limit protections, end-to-end data encryption, and resilient microservices handling millions of API requests daily.',
      icon: (
        <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.7 5.1a3 3 0 012.4-1.35h7.8a3 3 0 012.4 1.35l1.05 3.45a4.5 4.5 0 01.9 2.7" />
        </svg>
      ),
      count: '2 Cloud Specialists'
    }
  ];

  const values = [
    {
      title: 'Farmer-First Engineering',
      desc: 'We build technology designed for actual field conditions: bright sunlight, regional languages, and spotty 2G/3G network connections.',
      badge: 'Field Pragmatism'
    },
    {
      title: 'Verified Authenticity',
      desc: 'Zero speculation. All market rates and agronomy advisory are tied directly to official APMC mandis and accredited agricultural universities.',
      badge: 'Data Integrity'
    },
    {
      title: 'Edge-Ready AI',
      desc: 'Deploying high-speed neural models directly onto mobile hardware so diagnosis works instantly without burning mobile data.',
      badge: 'Modern Technology'
    },
    {
      title: 'Democratized Knowledge',
      desc: 'Bridging the information gap between corporate agribusinesses and marginal smallholder farmers with transparent, accessible digital tools.',
      badge: 'Inclusive Growth'
    }
  ];

  return (
    <div className="w-full bg-[#FAFCF8] min-h-screen text-gray-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 overflow-hidden bg-gradient-to-b from-[#EBF5EE] via-[#F4FAF5] to-[#FAFCF8] border-b border-gray-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(#2C8C44_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
            <Link to="/" className="hover:text-[#2C8C44] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/about" className="hover:text-[#2C8C44] transition-colors">About Us</Link>
            <span>/</span>
            <span className="text-[#2C8C44] font-bold">Meet Our Team</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-[#123C26] text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C8C44] animate-pulse" />
              The People Behind Kisan Mitra
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-gray-900 tracking-tight leading-[1.15] mb-4">
              Engineering Technology for <span className="text-[#2C8C44]">India&apos;s Farmers</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-normal">
              We are a dedicated group of full-stack engineers, mobile developers, agronomists, and data researchers building intelligent digital infrastructure for 140+ million Indian farmers.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              <div className="bg-white/90 backdrop-blur-sm border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-sm">
                <strong className="text-3xl sm:text-4xl font-black text-[#123C26] block">2</strong>
                <span className="text-sm text-gray-600 font-semibold mt-0.5 block">Platforms (Web &amp; App)</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-sm">
                <strong className="text-3xl sm:text-4xl font-black text-[#123C26] block">22+</strong>
                <span className="text-sm text-gray-600 font-semibold mt-0.5 block">States Live Data</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-sm">
                <strong className="text-3xl sm:text-4xl font-black text-[#123C26] block">100%</strong>
                <span className="text-sm text-gray-600 font-semibold mt-0.5 block">In-House R&amp;D</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-sm">
                <strong className="text-3xl sm:text-4xl font-black text-[#123C26] block">10+</strong>
                <span className="text-sm text-gray-600 font-semibold mt-0.5 block">Team Contributors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE LEADERSHIP & DEVELOPERS */}
      <section className="py-8 sm:py-10 md:py-12 max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-extrabold text-[#2C8C44] uppercase tracking-widest mb-2">CORE ENGINEERING LEADS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-gray-900 mb-3">
            Meet the Builders Behind the Code
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Driving the architectural design, algorithmic intelligence, and cross-platform user experience across both our web portal and mobile ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {coreLeads.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-[2rem] border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-7 sm:p-9 md:p-10">
                {/* Header with Avatar & Title */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 pb-6 border-b border-gray-100">
                  <div className="relative flex-shrink-0 my-1">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#2C8C44] shadow-md bg-emerald-50 ring-4 ring-emerald-50/60">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className={`w-full h-full object-cover ${member.id === 'raghav' ? 'object-top' : 'object-top'}`}
                          style={{ objectPosition: member.id === 'raghav' ? 'center 20%' : 'center 15%' }}
                        />
                      ) : (
                        <div className={`w-full h-full ${member.avatarBg} flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-inner`}>
                          {member.initials}
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black text-[#123C26] border border-emerald-200 shadow-md whitespace-nowrap z-10 tracking-tight">
                      {member.badge}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-gray-900 group-hover:text-[#2C8C44] transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-emerald-800 mb-1">
                      {member.role}
                    </p>
                    <span className="inline-block text-xs sm:text-sm text-gray-500 font-semibold">
                      {member.focusArea}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="pt-5 pb-5">
                  <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Key Contributions */}
                <div className="mb-6 bg-[#F8FAF7] rounded-2xl p-4 sm:p-5 border border-gray-100">
                  <h4 className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2C8C44]" />
                    Key Platform Contributions
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    {member.contributions.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[#2C8C44] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Tech Stack &amp; Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-50 text-emerald-950 border border-emerald-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Social Links */}
              <div className="px-7 sm:px-9 md:px-10 py-4 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-gray-500">Core Contributor</span>
                <div className="flex items-center gap-3">
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 flex items-center justify-center transition-colors shadow-sm"
                    aria-label={`${member.name} GitHub`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors shadow-sm"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a
                    href={member.socials.email}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#2C8C44] hover:border-emerald-400 flex items-center justify-center transition-colors shadow-sm"
                    aria-label={`Email ${member.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AND OUR EXTENDED SPECIALIST TEAM */}
      <section className="py-8 sm:py-10 md:py-12 bg-[#F4FAF5] border-y border-emerald-100">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#2C8C44] uppercase tracking-widest mb-2">OUR EXTENDED SPECIALIST SQUAD</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-gray-900">
                And 8+ Domain Experts in the Field
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 max-w-lg leading-relaxed">
              A multidisciplinary network of agronomists, ML researchers, and rural ambassadors working hand-in-hand to validate digital models with ground truth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
            {extendedDomains.map((dom, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[1.75rem] p-6 sm:p-7 border border-emerald-100/90 shadow-sm hover:border-[#2C8C44] transition-all group"
              >
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {dom.icon}
                </div>
                <span className="text-xs font-black text-[#2C8C44] bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-100">
                  {dom.count}
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">{dom.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{dom.desc}</p>
              </div>
            ))}
          </div>

          {/* Collaborative Callout Banner */}
          <div className="bg-white rounded-[2rem] border border-emerald-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#123C26] text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                🌾
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900 mb-0.5">Powered by Grassroots Farmer Feedback</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Backed by 50+ beta farmer testers across Uttar Pradesh, Haryana, Punjab, and Maharashtra who field-test every algorithm update.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#123C26] text-white hover:bg-[#1a5234] transition-colors whitespace-nowrap shadow-sm"
            >
              Collaborate With Us
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OUR ENGINEERING VALUES */}
      <section className="py-8 sm:py-10 md:py-12 max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-extrabold text-[#2C8C44] uppercase tracking-widest mb-2">HOW WE BUILD</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-gray-900 mb-3">
            Our Core Product &amp; Engineering Values
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Every feature, database query, and interface element is designed with the farmer at the center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[1.75rem] p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider block mb-2.5">
                  {val.badge}
                </span>
                <h3 className="text-lg font-black text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAREERS & JOIN US CTA */}
      <section className="py-8 sm:py-10 md:py-12 bg-[#123C26] text-white">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">Want to Build the Future of Indian Agriculture?</h2>
            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto mb-7 leading-relaxed">
              We are always looking for passionate engineers, machine learning specialists, agronomists, and rural product designers to join our mission.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/careers"
                className="px-7 py-3.5 rounded-xl text-sm font-bold bg-[#2C8C44] text-white hover:bg-[#38A169] transition-all shadow-lg"
              >
                Explore Open Positions
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
