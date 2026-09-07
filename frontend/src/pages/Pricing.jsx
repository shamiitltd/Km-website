import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
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

                {/* Notify Input */}
                <div className="w-full max-w-xl mb-12">
                    {subscribed ? (
                        <div className="bg-[#EAF7ED] border border-[#2C8C44]/40 text-[#123C26] px-8 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xs">
                            <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-base font-bold">
                                You're on the priority list! We'll notify you when plans go live.
                            </span>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="w-full bg-white p-2 sm:p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-[#2C8C44]/50 focus-within:border-[#2C8C44] transition-all"
                        >
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email to get notified" 
                                className="w-full sm:flex-grow bg-transparent px-5 py-3.5 outline-none text-gray-800 placeholder-gray-400 text-base text-center sm:text-left"
                            />
                            <button 
                                type="submit"
                                className="w-full sm:w-auto bg-gradient-to-r from-[#2C8C44] to-[#123C26] text-white px-8 py-3.5 rounded-xl font-bold text-base whitespace-nowrap hover:shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                                Notify Me
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-sm sm:text-base font-medium text-gray-500">
                    In the meantime, explore our <Link to="/features" className="text-[#2C8C44] font-bold hover:underline">features</Link> or read our <Link to="/blog" className="text-[#2C8C44] font-bold hover:underline">blog</Link>.
                </div>

            </div>
        </main>
    )
}