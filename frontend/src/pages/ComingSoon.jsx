import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ComingSoon({ type: propType }) {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  // Determine page content based on prop or route path
  const currentPath = location.pathname.toLowerCase();
  const isCareers = propType === 'careers' || currentPath.includes('career');
  const isRefund = propType === 'refund' || currentPath.includes('refund');

  const content = isCareers
    ? {
        source: 'careers',
        sourceLabel: 'Careers & Talent Opportunities',
        badge: 'Hiring & Culture • Launching Soon',
        badgeColor: 'text-[#123C26] bg-[#EAF7ED] border-[#A6CDB3]',
        title: 'Building the Future of AgriTech.',
        highlight: 'Join Our Team Soon.',
        description:
          "We are preparing to expand our team with visionary engineers, agronomists, AI researchers, and community field leaders. Our comprehensive careers portal and active openings will go live shortly.",
        inputPlaceholder: 'Enter your email for talent & opening alerts',
        pillars: [
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            ),
            title: 'Real-World Farmer Impact',
            desc: 'Every algorithm and feature you ship directly touches the livelihoods of farming families and rural communities across India.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            title: 'Next-Gen AI & Agronomy',
            desc: 'Develop frontier computer vision, vernacular multi-modal LLMs, and IoT sensor integrations directly in agricultural fields.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ),
            title: 'Flexible & Autonomous',
            desc: 'Thrive in an ambitious, modern startup culture with competitive compensation, equity incentives, and remote-first flexibility.'
          }
        ]
      }
    : isRefund
    ? {
        source: 'refund',
        sourceLabel: 'Refund Policy & Platform Updates',
        badge: 'Customer Assurance • Policy Under Review',
        badgeColor: 'text-[#123C26] bg-[#EAF7ED] border-[#A6CDB3]',
        title: 'Fair, Transparent & Farmer-First.',
        highlight: 'Refund Policy Coming Soon.',
        description:
          "We are finalizing our comprehensive, farmer-centric cancellation and refund framework. Our mission is 100% peace of mind for every subscription, purchase, and advisory service on KisanMitra.",
        inputPlaceholder: 'Enter your email for policy & launch updates',
        pillars: [
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: '100% Transparent Terms',
            desc: 'Simple, straightforward eligibility criteria without hidden conditions, deceptive jargon, or fine-print deductions.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: 'Swift Automated Settlement',
            desc: 'Expedited processing directly credited back to your original payment method, bank account, or verified UPI address.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
            title: 'Dedicated Farmer Support',
            desc: 'Our empathetic regional support team is on standby to assist farmers, review claims, and resolve billing inquiries.'
          }
        ]
      }
    : {
        source: 'general',
        sourceLabel: 'Roadmap & Feature Launch Alerts',
        badge: 'Innovation Roadmap • Coming Soon',
        badgeColor: 'text-[#123C26] bg-[#EAF7ED] border-[#A6CDB3]',
        title: 'Something Exceptional.',
        highlight: 'Currently in Active Development.',
        description:
          "Our engineering and agronomy team is building something transformative for the Indian agricultural ecosystem. Stay tuned as we roll out the next frontier of smart farming.",
        inputPlaceholder: 'Enter your email to receive updates',
        pillars: [
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: 'Fast & Low-Bandwidth',
            desc: 'Specially optimized to load instantaneously even on 2G/3G connections in remote village environments.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ),
            title: 'Mobile-First Experience',
            desc: 'Engineered with large touch targets, intuitive visual workflows, and smooth animations across every device.'
          },
          {
            icon: (
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: 'Field-Tested Intelligence',
            desc: 'Designed and validated alongside real farmers, FPOs, and agricultural scientists across diverse state soils.'
          }
        ]
      };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setFeedback(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          source: content.source,
          sourceLabel: content.sourceLabel
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          alreadySubscribed: data.alreadySubscribed,
          message: data.message || "You're on the priority list! A confirmation email has been dispatched to your inbox."
        });
        setEmail('');
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to register your email. Please try again.'
        });
      }
    } catch (err) {
      console.error('Subscription error in ComingSoon:', err);
      setFeedback({
        type: 'error',
        message: 'Unable to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[88vh] flex items-center justify-center bg-[#F9FAF8] relative overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-20 md:py-28">
      {/* 2026 Ambient Dynamic Glow Orbs */}
      <div className="absolute top-[-10%] left-[8%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-emerald-200/40 rounded-full filter blur-3xl opacity-70 pointer-events-none animate-float-slow"></div>
      <div className="absolute bottom-[-10%] right-[8%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#B0D939]/20 rounded-full filter blur-3xl opacity-70 pointer-events-none animate-float-delayed"></div>
      <div className="absolute top-[40%] right-[30%] w-96 h-96 bg-[#54B435]/15 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

      {/* Main Glassmorphic Container - Expansive on Laptops & Desktops */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Status Pill Badge */}
        <div className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase mb-8 border shadow-xs inline-flex items-center gap-2.5 ${content.badgeColor}`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#54B435] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2C8C44]"></span>
          </span>
          {content.badge}
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0D2618] tracking-tight leading-[1.08] mb-6">
          {content.title} <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C8C44] via-[#54B435] to-[#80D939]">
            {content.highlight}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed mb-14">
          {content.description}
        </p>

        {/* 3 Value Pillars - Generous Card Padding and Typography */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 text-left">
          {content.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 lg:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E3EBE5] shadow-xs hover:shadow-xl hover:border-[#80D939]/60 transition-all duration-300 flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7ED] flex items-center justify-center mb-5 shrink-0">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-[#123C26] text-lg sm:text-xl mb-2.5 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Notification Widget */}
        <div className="w-full max-w-xl mb-12">
          {feedback?.type === 'success' ? (
            feedback.alreadySubscribed ? (
              <div className="bg-red-50 border border-red-200 text-red-900 px-7 py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs animate-fade-in text-left">
                <div className="flex items-center gap-3.5">
                  <svg className="w-7 h-7 text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-base font-bold text-red-900">{feedback.message}</p>
                    <p className="text-xs text-red-700 mt-0.5 font-medium">
                      This email is already covered across all KisanMitra announcements & newsletters.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="text-xs font-bold text-red-700 hover:text-red-950 underline whitespace-nowrap cursor-pointer shrink-0"
                >
                  Check another email
                </button>
              </div>
            ) : (
              <div className="bg-[#EAF7ED] border-2 border-[#2C8C44]/40 text-[#123C26] px-8 py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3.5 shadow-sm animate-fade-in">
                <svg className="w-7 h-7 text-[#2C8C44] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center sm:text-left">
                  <p className="text-base font-bold text-[#123C26]">{feedback.message}</p>
                  <p className="text-xs text-[#2C8C44] mt-0.5 font-medium">Check your email for your confirmation receipt.</p>
                </div>
              </div>
            )
          ) : (
            <div className="w-full">
              <form
                onSubmit={handleSubscribe}
                className="bg-white/95 backdrop-blur-sm p-2 sm:p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-[#2C8C44]/40 focus-within:border-[#2C8C44] transition-all"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (feedback) setFeedback(null);
                  }}
                  placeholder={content.inputPlaceholder}
                  className="w-full sm:flex-grow bg-transparent px-5 py-3 outline-none text-gray-800 placeholder-gray-400 text-base text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto bg-[#123C26] hover:bg-[#1b5034] text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Notify Me</span>
                  )}
                </button>
              </form>

              {feedback?.type === 'error' && (
                <p className="text-red-600 text-sm font-medium mt-3 text-center sm:text-left pl-2">
                  {feedback.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Secondary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-base font-semibold">
          <Link
            to="/"
            className="px-7 py-3.5 rounded-2xl bg-[#123C26] text-white hover:bg-[#1b5034] transition-colors shadow-xs"
          >
            ← Return to Home
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-xs"
          >
            Contact Support
          </Link>
          <Link
            to="/features"
            className="px-7 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-xs"
          >
            Explore Features
          </Link>
        </div>

      </div>
    </main>
  );
}
