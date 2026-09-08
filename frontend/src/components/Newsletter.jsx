import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

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
          source: 'blog',
          sourceLabel: 'Farming Insights & Agronomy Newsletter'
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          alreadySubscribed: data.alreadySubscribed,
          message: data.message || "Thank you for subscribing! A welcome confirmation email has been dispatched to your inbox."
        });
        setEmail('');
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to register your subscription. Please try again.'
        });
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setFeedback({
        type: 'error',
        message: 'Unable to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA] flex justify-center pb-12">
      <div className="max-w-[95rem] w-full">
        <div className="bg-[#F2F9F3] rounded-3xl p-8 md:p-12 border border-[#EBF5EE] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8 w-full lg:w-[58%]">
            
            {/* Envelope Illustration */}
            <div className="shrink-0 relative w-24 h-24 mt-2">
              <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back Flap */}
                <path d="M10 40 L50 15 L90 40" fill="#E0EFE4" />
                {/* Letter */}
                <rect x="22" y="20" width="56" height="45" rx="3" fill="#FFFFFF" stroke="#E6F2EA" strokeWidth="1.5" />
                {/* Letter Lines */}
                <path d="M30 32 H 45 M30 40 H 70 M30 48 H 60" stroke="#B3D4BD" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 32 A 4 4 0 0 1 38 32 A 4 4 0 0 1 30 32" stroke="#B3D4BD" strokeWidth="2.5" fill="none" />
                
                {/* Envelope Body */}
                <path d="M10 40 L50 65 L90 40 L90 80 C90 82.76 87.76 85 85 85 L15 85 C12.24 85 10 82.76 10 80 Z" fill="#ECF4EE" />
                {/* Envelope Front Triangles */}
                <path d="M10 40 L50 70 L90 40 Z" fill="#E6F2EA" />
                <path d="M10 85 L50 55 L90 85 Z" fill="#F4F9F5" />
                
                {/* Leaf Sprout Icon (Bottom Right) */}
                <g transform="translate(65, 55)">
                  <path d="M15 30 Q 15 15 25 5 Q 35 15 25 25 Q 15 25 15 30 Z" fill="#2C8C44" />
                  <path d="M15 30 Q 5 25 5 15 Q 15 10 20 20 Q 20 30 15 30 Z" fill="#2C8C44" />
                  <path d="M15 30 Q 15 40 10 45" stroke="#2C8C44" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>
              </svg>
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col justify-center pt-2">
              <h3 className="text-[#123C26] text-[26px] md:text-[28px] font-bold mb-3">Never Miss an Update!</h3>
              <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed max-w-[480px]">
                Subscribe to our newsletter and get the latest farming insights, seasonal disease tips, and AI updates delivered to your inbox.
              </p>
            </div>
          </div>

          {/* Right Side: Form & Feedback */}
          <div className="w-full lg:w-[42%] flex flex-col sm:items-end">
            {feedback?.type === 'success' ? (
              feedback.alreadySubscribed ? (
                <div className="w-full sm:max-w-md xl:max-w-lg bg-red-50 border border-red-200 text-red-900 p-5 rounded-2xl flex items-start justify-between gap-3 shadow-xs animate-fade-in text-left">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-red-900">{feedback.message}</p>
                      <p className="text-xs text-red-700 mt-1">
                        This email is already registered across all KisanMitra updates.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFeedback(null)}
                    className="text-xs font-bold text-red-700 hover:text-red-950 underline whitespace-nowrap cursor-pointer shrink-0 mt-0.5"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="w-full sm:max-w-md xl:max-w-lg bg-white border border-[#2C8C44]/40 text-[#123C26] p-5 rounded-2xl flex items-start gap-3 shadow-xs animate-fade-in text-left">
                  <svg className="w-6 h-6 text-[#2C8C44] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold">{feedback.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Please check your inbox or spam folder for your confirmation.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <form onSubmit={handleSubscribe} className="w-full sm:max-w-md xl:max-w-lg flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (feedback) setFeedback(null);
                    }}
                    placeholder="Enter your email" 
                    className="w-full bg-white border border-gray-200 text-gray-700 px-5 py-3.5 rounded-xl focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 shadow-xs"
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`bg-[#2C8C44] hover:bg-[#1f6631] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer ${
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
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>

                {feedback?.type === 'error' && (
                  <p className="text-red-600 text-xs font-medium mt-2 pl-1">
                    {feedback.message}
                  </p>
                )}

                <p className="text-gray-400 text-[12.5px] mt-3 pl-1">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
