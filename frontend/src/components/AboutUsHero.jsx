import React from 'react';
import features_background from "../assets/features_background.png";

export default function AboutUsHero() {
  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-white overflow-hidden">
      
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
        {/* Placeholder for the About Us Hero Image (Farmer with Phone) */}
        <img
          src={features_background}
          alt="About Us Hero"
          className="w-full lg:w-[63%] h-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent z-10 w-full lg:w-[75%]"></div>

      {/* Content Container */}
      <div className="max-w-[95rem] mx-auto px-10 md:px-12 lg:px-24 w-full relative z-20">
        <div className="max-w-[45rem] pt-8 pb-8">
          <p className="text-[#2C8C44] font-bold text-[11px] tracking-[0.2em] uppercase mb-4">
            ABOUT US
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-bold text-gray-900 leading-[1.2] mb-10">
            Empowering Farmers.<br />
            Building a <span className="text-[#2C8C44]">Smarter Future.</span>
          </h1>

          <p className="text-gray-600 text-[15px] md:text-[17px] mb-12 max-w-lg leading-relaxed">
            Kisan Mitra is an AI-powered digital platform built to solve real farming challenges and help farmers make smarter decisions every day.
          </p>

          {/* Features Row */}
          <div className="flex flex-wrap gap-8 md:gap-14 items-start">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 8.25l1.5-1.5m0 0l1.5 1.5m-1.5-1.5v6" />
                </svg>
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">
                Data Driven<br/>Insights
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8 8 0 018-8h2v2a8 8 0 01-8 8h-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 13a8 8 0 00-8-8H2v2a8 8 0 008 8h2z" />
                </svg>
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">
                AI Powered<br/>Solutions
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-10.374-1.766l-.001-.109a6.375 10.375 0 0111.964-3.07M12 10.375a3.375 3.375 0 11-10.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">
                Farmer First<br/>Approach
              </span>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center justify-center text-center w-[85px]">
              <div className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center mb-3 shadow-[0_2px_10px_rgb(0,0,0,0.06)] text-[#2C8C44]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 10 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-10.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-10.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">
                Trust &<br/>Transparency
              </span>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
