import React, { useState, useEffect } from 'react';

/**
 * Utility helper to trigger the Coming Soon modal from anywhere in the app
 * @param {'app' | 'demo'} type 
 * @param {string} [customTitle]
 * @param {string} [customSubtitle]
 */
export const showComingSoon = (type = 'app', customTitle = '', customSubtitle = '', source = '') => {
  window.dispatchEvent(
    new CustomEvent('km:open-coming-soon', {
      detail: { type, customTitle, customSubtitle, source }
    })
  );
};

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('app'); // 'app' | 'demo'
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [modalSource, setModalSource] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'alreadySubscribed', message: '', email: '' }
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const handleOpen = (e) => {
      const { type = 'app', customTitle = '', customSubtitle = '', source = '' } = e.detail || {};
      setModalType(type);
      setCustomTitle(customTitle);
      setCustomSubtitle(customSubtitle);
      setModalSource(source || (type === 'app' ? 'app_launch_waitlist' : 'video_demo_waitlist'));
      setFeedback(null);
      setErrorMessage('');
      setEmail('');
      setIsOpen(true);
    };

    window.addEventListener('km:open-coming-soon', handleOpen);
    return () => window.removeEventListener('km:open-coming-soon', handleOpen);
  }, []);

  // Lock scroll position when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Custom Senior Designer validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email address to receive early access updates.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email format (e.g. farmer@kisanmitra.com).');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const resolvedSource = modalSource || (modalType === 'app' ? 'app_launch_waitlist' : 'video_demo_waitlist');
      const resolvedSourceLabel = customTitle || (modalType === 'app' ? 'Mobile App Early Access Waitlist' : 'Video Masterclass Waitlist');

      const res = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          source: resolvedSource,
          sourceLabel: resolvedSourceLabel
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.alreadySubscribed) {
          setFeedback({
            type: 'alreadySubscribed',
            message: data.message || 'You are already subscribed! This email is registered across all KisanMitra updates.',
            email: trimmedEmail
          });
        } else {
          setFeedback({
            type: 'success',
            message: data.message || "You're on the VIP list! A confirmation email has been dispatched to your inbox.",
            email: trimmedEmail
          });
        }
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Could not register email. Please try again.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 450);
      }
    } catch (err) {
      setErrorMessage('Network connection issue. Please check your connection and try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isApp = modalType === 'app';

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden transform transition-all duration-300 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Background Banner */}
        <div className={`p-6 sm:p-8 text-white relative overflow-hidden ${
          isApp 
            ? 'bg-gradient-to-br from-[#0F392B] via-[#123C26] to-[#2C8C44]' 
            : 'bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900'
        }`}>
          {/* Ambient circles */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lime-400/15 rounded-full blur-xl pointer-events-none"></div>

          {/* Close Button */}
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-emerald-200 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {isApp ? '🚀 Launching Soon' : '🎬 Coming Soon'}
          </div>

          <div className="flex items-center gap-3.5 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              {isApp ? (
                <img src="/favicon.png" alt="KM" className="w-7 h-7 object-contain rounded-full bg-white p-0.5" />
              ) : (
                <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {customTitle || (isApp ? 'KisanMitra Mobile App' : 'Video Tutorial & Demo')}
              </h3>
              <p className="text-xs text-emerald-200 font-medium">
                {isApp ? 'Native Android & iOS Release' : '4K Interactive Agricultural Masterclass'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            {customSubtitle || (isApp 
              ? 'Our engineering team is putting the finishing touches on the KisanMitra Mobile App. Get ready for real-time AI leaf diagnostics, offline Doppler weather radar, and personalized daily mandi SMS alerts.'
              : 'A comprehensive video walkthrough demonstrating step-by-step crop disease diagnostics, weather radar forecasting, and APMC mandi price discovery is currently in production.')}
          </p>

          {/* Notification / Waitlist Form States */}
          {feedback?.type === 'alreadySubscribed' ? (
            <div className="bg-gradient-to-br from-amber-50 via-rose-50/50 to-amber-50/70 border border-amber-200/90 rounded-2xl p-5 shadow-sm space-y-3 animate-fade-in text-left">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-300/60 text-amber-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-950 text-sm">Already Subscribed!</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-800 text-[10px] font-bold uppercase tracking-wider">Active</span>
                  </div>
                  <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                    <strong className="font-semibold text-amber-950">{feedback.email}</strong> is already registered across all KisanMitra announcements, app launch alerts, and agronomy updates.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                <span className="text-amber-800/80 font-medium">No need to sign up again — you're fully covered!</span>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="font-bold text-amber-900 hover:text-amber-950 underline cursor-pointer"
                >
                  Check another email
                </button>
              </div>
            </div>
          ) : feedback?.type === 'success' ? (
            <div className="bg-gradient-to-br from-emerald-50 via-emerald-50/90 to-teal-50 border border-emerald-200/90 rounded-2xl p-5 shadow-sm space-y-3 animate-fade-in text-left">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#123C26] text-[#80D939] flex items-center justify-center shrink-0 font-extrabold shadow-sm">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#123C26] text-sm">Welcome to VIP Early Access!</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                  </div>
                  <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                    A welcome confirmation email has been dispatched to <strong className="font-semibold text-emerald-950">{feedback.email}</strong>. We will notify you the moment it goes live.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-medium">Please check your inbox or spam folder.</span>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="font-bold text-[#123C26] hover:text-emerald-700 underline cursor-pointer"
                >
                  Register another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate className="space-y-3">
              <label htmlFor="early-access-email" className="block text-xs font-bold text-slate-700">
                Get notified on launch day (Zero Spam):
              </label>

              <div className={`flex flex-col sm:flex-row gap-2.5 ${isShaking ? 'animate-shake' : ''}`}>
                {/* Custom Input with Icon */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg 
                      className={`w-4 h-4 transition-colors ${errorMessage ? 'text-rose-400' : 'text-slate-400'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input 
                    id="early-access-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none ${
                      errorMessage
                        ? 'bg-rose-50/40 border-2 border-rose-400 text-rose-950 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15'
                    }`}
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#123C26] hover:bg-[#0a2316] active:scale-[0.98] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </div>

              {/* Senior Designer Styled Warning / Error Badge */}
              {errorMessage && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50/60 border border-rose-200/90 text-rose-800 text-xs font-medium shadow-sm transition-all duration-200">
                  <div className="w-5 h-5 rounded-full bg-rose-500/15 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}
            </form>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Got it, Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
