import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
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
                    source: 'pricing',
                    sourceLabel: 'Pricing Launch Priority List'
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
            console.error('Pricing subscription error:', err);
            setFeedback({
                type: 'error',
                message: 'Unable to connect to the server. Please check your connection and try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-[85vh] flex items-center justify-center bg-[#FAFCFA] relative overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 py-20 lg:py-28">
            {/* Decorative Ambient Orbs */}
            <div className="absolute top-[8%] left-[12%] w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-slow pointer-events-none"></div>
            <div className="absolute bottom-[8%] right-[12%] w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-delayed pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto text-center flex flex-col items-center">
                
                {/* Coming Soon Badge */}
                <div className="bg-[#E8F5EA] text-[#2C8C44] px-6 py-2 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest mb-8 border border-[#A6CDB3]/40 shadow-xs inline-flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2C8C44] animate-pulse"></span>
                    Fair Pricing • Launching Soon
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] via-[#2C8C44] to-[#54B435] tracking-tight leading-[1.08] mb-6">
                    We're preparing something special.
                </h1>

                <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-12">
                    Kisan Mitra's transparent subscription plans and affordable farmer packages are currently being finalized. We are engineering the highest value tools to ensure maximum returns for your fields.
                </p>

                {/* Notify Input Widget */}
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
                            <div className="bg-[#EAF7ED] border border-[#2C8C44]/40 text-[#123C26] px-8 py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3.5 shadow-xs animate-fade-in">
                                <svg className="w-7 h-7 text-[#2C8C44] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-center sm:text-left">
                                    <p className="text-base font-bold text-[#123C26]">{feedback.message}</p>
                                    <p className="text-xs text-[#2C8C44] mt-0.5 font-medium">Check your inbox for your welcome confirmation.</p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="w-full">
                            <form
                                onSubmit={handleSubscribe}
                                className="w-full bg-white p-2 sm:p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-[#2C8C44]/50 focus-within:border-[#2C8C44] transition-all"
                            >
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (feedback) setFeedback(null);
                                    }}
                                    placeholder="Enter your email to get notified" 
                                    className="w-full sm:flex-grow bg-transparent px-5 py-3.5 outline-none text-gray-800 placeholder-gray-400 text-base text-center sm:text-left"
                                />
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full sm:w-auto bg-gradient-to-r from-[#2C8C44] to-[#123C26] text-white px-8 py-3.5 rounded-xl font-bold text-base whitespace-nowrap hover:shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
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

                <div className="text-sm sm:text-base font-medium text-gray-500">
                    In the meantime, explore our <Link to="/features" className="text-[#2C8C44] font-bold hover:underline">features</Link> or read our <Link to="/blog" className="text-[#2C8C44] font-bold hover:underline">blog</Link>.
                </div>

            </div>
        </main>
    )
}