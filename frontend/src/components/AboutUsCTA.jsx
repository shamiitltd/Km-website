import React from "react";
import cta_plant from "../assets/cta_plant.png";

export default function AboutUsCTA() {
  return (
    <section className="w-full py-4 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[85rem] mx-auto bg-[#0F392B] rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
        
        {/* Left Side: Logo & Text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 text-center md:text-left">
          
          {/* Logo Placeholder */}
          <div className="w-[80px] h-[100px] md:w-[100px] md:h-[90px] flex-shrink-0 flex items-center justify-center">
             {/* Replace this src with the imported logo when ready */}
             <img 
               src={cta_plant} 
               alt="About Us CTA Logo" 
               className="w-full h-full object-contain" 
             />
          </div>

          <div className="flex flex-col justify-center mt-1">
            <h2 className="text-white text-[22px] md:text-[26px] lg:text-[28px] font-bold mb-2">
              Together, Let's Build a Smarter Tomorrow
            </h2>
            <p className="text-gray-300 text-[14px] md:text-[15px] max-w-xl leading-relaxed">
              Join us in our journey to empower farmers and transform agriculture with the power of AI and innovation.
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0">
          {/* Download App Button */}
          <button className="w-full sm:w-auto bg-[#6CB937] hover:bg-[#5ca62b] text-white px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg">
            Download App
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>
          
          {/* Watch Demo Button */}
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors">
            Watch Demo
            <svg className="w-6 h-6 opacity-90" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
