import React from 'react';

export default function AboutStatus() {
  return (
    <section className="w-full py-6 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[95rem] mx-auto bg-[#F9FBF9] border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm flex flex-col lg:flex-row gap-10 lg:gap-0">
        
        {/* Left Side: MVP Phase */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:border-r border-gray-200 pr-0 lg:pr-16">
           <div className="flex items-start gap-4 mb-5">
             <div className="w-14 h-14 rounded-full bg-[#EBF5EE] flex items-center justify-center shrink-0">
                {/* Plant Sprouting Icon */}
                <svg className="w-7 h-7 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-7m0 0a8 8 0 018-8h2v2a8 8 0 01-8 8h-2zm0 0a8 8 0 00-8-8H2v2a8 8 0 008 8h2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
                </svg>
             </div>
             <div className="mt-2.5">
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#123C26] leading-tight">
                  MVP (Minimum Viable Product)
                </h3>
             </div>
           </div>
           
           <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-6">
             We are currently in the MVP phase, building the core features of Kisan Mitra with a focus on simplicity, accuracy and real farmer needs.
           </p>
           
           <ul className="space-y-3">
             {["Core AI Advisory Engine", "Weather & Market Insights", "Farm Management Tools", "Localized for Indian Farmers"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <svg className="w-[18px] h-[18px] text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-800 text-[14.5px] font-medium">{item}</span>
                </li>
             ))}
           </ul>
        </div>

        {/* Right Side: Launch Info */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pl-0 lg:pl-16 mt-8 lg:mt-0">
           <div className="flex items-start gap-4 mb-5">
             <div className="w-14 h-14 rounded-full bg-[#EBF5EE] flex items-center justify-center shrink-0">
                {/* Calendar Icon */}
                <svg className="w-7 h-7 text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 13h4M7 17h8" />
                </svg>
             </div>
             <div className="mt-1">
                <p className="text-[16px] md:text-[18px] font-bold text-[#123C26] mb-0.5">First Launch</p>
                <h3 className="text-[24px] md:text-[28px] font-bold text-[#2C8C44] leading-tight">
                  December 2026
                </h3>
             </div>
           </div>
           
           <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-5 mt-1">
             We are excited to launch the first version of Kisan Mitra in December 2026.
           </p>
           
           <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
             Our mission is to make advanced technology affordable, accessible and useful for every farmer.
           </p>
        </div>

      </div>
    </section>
  );
}
