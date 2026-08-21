import React from 'react';
import features_background from "../assets/features_background.png"; // Placeholder for the farmer background
import cta_plant from "../assets/cta_plant.png"; // Sprout image for the card

export default function ContactHero() {
  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-[#FAFCFA] overflow-hidden pt-12 md:pt-0 border-b border-gray-100">
      {/* Background Image on Right */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
        {/* Mobile Background */}
        <img
          src="https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Contact Mobile Background"
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
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 w-full relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 pb-16 lg:pb-0">
        
        {/* Left Content */}
        <div className="w-full lg:w-[58%] pt-8 lg:pt-20 pb-8 lg:pb-20">
          <p className="text-[#2C8C44] font-bold text-[13px] md:text-[14px] tracking-wider uppercase mb-5">
            Contact Us
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-gray-900 leading-[1.15] mb-6 tracking-tight">
            We're Here to Help You<br />
            <span className="text-[#2C8C44]">Grow Better.</span>
          </h1>

          <p className="text-gray-600 text-[16px] md:text-[17px] mb-12 max-w-[28rem] leading-relaxed">
            Have questions, feedback or partnership ideas?<br />
            Our team is always ready to assist you.
          </p>

          {/* Icon Features Row */}
          <div className="flex flex-wrap gap-10 md:gap-14 items-start">
            
            {/* Feature 1: Quick Support */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Quick<br/>Support
              </span>
            </div>

            {/* Feature 2: Expert Team */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Expert<br/>Team
              </span>
            </div>

            {/* Feature 3: Trusted by Farmers */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Trusted by<br/>Farmers
              </span>
            </div>

            {/* Feature 4: Made for Indian Farmers */}
            <div className="flex flex-col items-center justify-center text-center w-[75px]">
              <div className="w-10 h-10 mb-3 text-[#2C8C44] flex items-center justify-center">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 8.25m0 0l4.5-4.5M18 14.25l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5l-1.5-1.5m1.5 1.5l1.5 1.5" />
                 </svg>
              </div>
              <span className="text-[13.5px] font-bold text-gray-800 leading-tight">
                Made for<br/>Indian Farmers
              </span>
            </div>

          </div>
        </div>

        {/* Right Side Floating Card */}
        {/* <div className="w-full lg:w-[320px] xl:w-[340px] bg-white rounded-3xl p-8 shadow-2xl relative z-30 mt-8 lg:mt-0 lg:mr-4 border border-gray-100 overflow-hidden min-h-[380px] flex flex-col justify-between">
          
          <div> */}
            {/* Top Icon */}
            {/* <div className="w-12 h-12 bg-[#F2F9F3] rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div> */}
            
            {/* Card Text */}
            {/* <h3 className="text-[24px] font-bold text-gray-900 leading-[1.35] tracking-tight">
              Together, let's<br/>
              build a <span className="text-[#2C8C44]">smarter<br/>
              agriculture future.</span>
            </h3> */}
            
            {/* Small horizontal green divider line */}
            {/* <div className="w-8 h-[3px] bg-[#2C8C44] rounded-full mt-6 opacity-70"></div>
          </div> */}

          {/* Plant Illustration at bottom */}
          {/* <div className="absolute bottom-[-15px] left-0 right-0 w-full flex justify-center opacity-95">
             <img src={cta_plant} alt="Sprout" className="w-[150px] h-auto object-contain" />
          </div> */}

        {/* </div> */}

      </div>
    </section>
  );
}
