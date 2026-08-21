import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    return (
        <main className="w-full min-h-[85vh] flex items-center justify-center bg-[#FAFCFA] relative overflow-hidden px-6 py-20">
            {/* Decorative Orbs */}
            <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
                
                {/* Coming Soon Badge */}
                <div className="bg-[#E8F5EA] text-[#2C8C44] px-5 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-8 border border-[#A6CDB3]/30 shadow-sm inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2C8C44] animate-pulse"></span>
                    Launching Soon
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] to-[#2C8C44] tracking-tight leading-[1.1] mb-6">
                    We're preparing something special.
                </h1>

                <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                    Kisan Mitra's premium features and pricing plans are currently being finalized. We are working hard to bring you the best value for your farming needs. Stay tuned for our upcoming launch!
                </p>

                {/* Notify Input */}
                <div className="w-full max-w-md mx-auto bg-white p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-0 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-[#2C8C44]/50 focus-within:border-[#2C8C44] transition-all">
                    <input 
                        type="email" 
                        placeholder="Enter your email to get notified" 
                        className="w-full sm:flex-grow bg-transparent px-4 py-3 outline-none text-gray-700 placeholder-gray-400 text-center sm:text-left"
                    />
                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#2C8C44] to-[#1f6631] text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-0.5 transition-all">
                        Notify Me
                    </button>
                </div>

                <div className="mt-12 text-sm font-medium text-gray-500">
                    In the meantime, explore our <Link to="/features" className="text-[#2C8C44] hover:underline">features</Link> or read our <Link to="/blog" className="text-[#2C8C44] hover:underline">blog</Link>.
                </div>

            </div>
        </main>
    )
}