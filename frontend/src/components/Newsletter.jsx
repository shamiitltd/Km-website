import React from 'react';

export default function Newsletter() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA] flex justify-center pb-12">
      <div className="max-w-[95rem] w-full">
        <div className="bg-[#F2F9F3] rounded-2xl p-8 md:p-12 border border-[#EBF5EE] flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8 w-full lg:w-[60%]">
            
            {/* Envelope Illustration */}
            <div className="shrink-0 relative w-24 h-24 mt-2">
              <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back Flap */}
                <path d="M10 40 L50 15 L90 40" fill="#E0EFE4" />
                {/* Letter */}
                <rect x="22" y="20" width="56" height="45" rx="3" fill="#FFFFFF" stroke="#E6F2EA" strokeWidth="1.5" />
                {/* Letter Lines */}
                <path d="M30 32 H 45 M30 40 H 70 M30 48 H 60" stroke="#B3D4BD" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 32 A 4 4 0 0 1 38 32 A 4 4 0 0 1 30 32" stroke="#B3D4BD" strokeWidth="2.5" fill="none" /> {/* tiny icon representation */}
                
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
              <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed max-w-[450px]">
                Subscribe to our newsletter and get the latest farming insights, tips and updates delivered to your inbox.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-[40%] flex flex-col sm:items-end">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:max-w-md xl:max-w-lg">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white border border-gray-200 text-gray-700 px-5 py-3.5 rounded-lg focus:outline-none focus:border-[#2C8C44] focus:ring-1 focus:ring-[#2C8C44] shadow-sm"
                required
              />
              <button 
                type="button" 
                className="bg-[#2C8C44] hover:bg-[#1f6631] text-white font-bold py-3.5 px-8 rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-[12.5px] mt-3 w-full sm:max-w-md xl:max-w-lg text-left pl-1">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
