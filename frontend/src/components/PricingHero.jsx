import React from 'react';
import features_background from "../assets/features_background.png";
import cta_plant from "../assets/cta_plant.png"; 

export default function PricingHero() {
  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-white overflow-hidden">
      {/* 
        Background Image
        Positioned on the right side.
      */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
        {/* User will replace this src with their specific pricing background image */}
        <img
          src={features_background}
          alt="Pricing Hero Background"
          className="w-full lg:w-[63%] h-full object-cover object-center"
        />
      </div>

      {/* 
        Gradient Overlay
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent z-10 w-full lg:w-[75%]"></div>

      {/* Content Container */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-[55%] pt-16 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-bold text-gray-900 leading-[1.2] mb-6">
            Simple, Affordable Pricing<br />
            for <span className="text-[#2C8C44]">Every Farmer</span>
          </h1>

          <p className="text-gray-600 text-[15px] md:text-[17px] mb-12 max-w-[28rem] leading-relaxed">
            Kisan Mitra is designed to be accessible for everyone. Start free and upgrade anytime as your farm grows.
          </p>

          {/* Features Row */}
          <div className="flex flex-wrap gap-8 md:gap-12 items-start">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-16 h-16 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-gray-800 leading-snug">
                Trusted by<br/>50,000+ Farmers
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-16 h-16 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-gray-800 leading-snug">
                Secure &<br/>Reliable
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-16 h-16 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-gray-800 leading-snug">
                Cancel Anytime,<br/>No Hassle
              </span>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-16 h-16 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C12 2 6 7 6 14C6 17 8 18 8 18H16C16 18 18 17 18 14C18 7 12 2 12 2Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 14C4 14 3 18 3 18H8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 14C20 14 21 18 21 18H16" />
                  <circle cx="12" cy="10" r="2.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 18L12 22L14 18" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-gray-800 leading-snug">
                Made for<br/>Indian Farmers
              </span>
            </div>

          </div>
        </div>

        {/* Right Side Floating Card */}
        {/* <div className="w-full lg:w-[380px] bg-white rounded-[2rem] p-8 shadow-2xl relative z-30 mt-8 lg:mt-0 mr-0 lg:mr-4 border border-gray-50 overflow-hidden">
          <h3 className="text-[#123C26] font-bold text-[22px] mb-6">Why Upgrade?</h3>
          
          <ul className="space-y-4 mb-2">
            {[
              "Advanced AI Insights",
              "Detailed Reports",
              "Priority Support",
              "More Fields & Data",
              "Higher Accuracy"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EBF5EE] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-gray-800 text-[14px] font-medium">{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Sprout Illustration Bottom Right */}
          {/* <div className="absolute bottom-[-10px] right-2 w-20 h-20 opacity-95">
             <img src={cta_plant} alt="Sprout" className="w-full h-full object-contain" />
          </div>
        </div> */}

      </div>
    </section>
  );
}
