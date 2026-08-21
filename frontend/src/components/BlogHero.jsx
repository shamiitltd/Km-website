import React from 'react';
import features_background from "../assets/features_background.png"; // Placeholder for the farmer background

export default function BlogHero() {
  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-[#FAFCFA] overflow-hidden pt-12 md:pt-0 border-b border-gray-100">
      {/* Background Image on Right */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
        {/* Mobile Background */}
        <img
          src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Blog Mobile Background"
          className="w-full h-full object-cover lg:hidden opacity-30"
        />
        {/* Desktop Background */}
        <img
          src={features_background}
          alt="Farmer Background"
          className="hidden lg:block w-full lg:w-[68%] h-full object-cover object-center opacity-90"
        />
      </div>

      {/* Gradient Overlay to blend left text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAFCFA]/40 via-[#FAFCFA]/10 to-transparent lg:from-[#FAFCFA] lg:via-[#FAFCFA] lg:to-transparent z-10 w-full lg:w-[75%]"></div>

      {/* Main Content Container */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 w-full relative z-20 flex flex-col lg:flex-row items-center justify-between pb-16 lg:pb-0">
        
        {/* Left Content */}
        <div className="w-full lg:w-[65%] pt-8 lg:pt-24 pb-8 lg:pb-24">
          <p className="text-[#2C8C44] font-bold text-[13px] md:text-[14px] tracking-wider uppercase mb-5">
            Kisan Mitra Blog
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-gray-900 leading-[1.15] mb-6 tracking-tight">
            Knowledge. Insights.<br />
            <span className="text-[#2C8C44]">Better Farming.</span>
          </h1>

          <p className="text-gray-600 text-[16px] md:text-[17px] mb-12 max-w-[32rem] leading-relaxed">
            Expert insights, farming tips, success stories and updates on the latest in agri-tech and AI to help you grow more.
          </p>

          {/* Icon Features Row */}
          <div className="flex flex-wrap gap-10 md:gap-14 items-start">
            
            {/* Feature 1: Practical Farming Tips */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a4.5 4.5 0 004.5-4.5V6H12a4.5 4.5 0 00-4.5 4.5v2.5M12 13a4.5 4.5 0 01-4.5 4.5h-2.5V15a4.5 4.5 0 014.5-4.5" />
                 </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Practical<br/>Farming Tips
              </span>
            </div>

            {/* Feature 2: Agri Market Insights */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 17.25l7.5-7.5 4.5 4.5 7.5-7.5" />
                 </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Agri Market<br/>Insights
              </span>
            </div>

            {/* Feature 3: Weather & Crop Updates */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v1.5m6.364.386l-1.06 1.06M21 12h-1.5m-.386 6.364l-1.06-1.06M12 19.5v1.5m-6.364-1.886l1.06-1.06M4.5 12H3m1.886-6.364l1.06 1.06" />
                </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Weather & Crop<br/>Updates
              </span>
            </div>

            {/* Feature 4: Expert Guidance */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                 </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Expert<br/>Guidance
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
