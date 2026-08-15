import React from 'react';
import cta_plant from '../assets/cta_plant.png';

export default function PricingCTA() {
  return (
    <section className="w-full pb-4 px-6 md:px-12 lg:px-16 xl:px-24 bg-white flex justify-center mt-8">
      <div className="max-w-[85rem] w-full bg-[#123C26] rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-5 md:py-12 shadow-xl">
        
        {/* Left Side: Plant Image and Text */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10 w-full md:w-auto">
          {/* Plant Image */}
          <div className="flex justify-center md:justify-start shrink-0">
            <img src={cta_plant} alt="Grow Smarter" className="w-[160px] md:w-[180px] h-auto object-contain relative -mb-4 md:-mb-6 md:-mt-6" />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-white text-[26px] md:text-[30px] font-bold mb-3 leading-tight tracking-wide">
              Ready to Grow Smarter?
            </h2>
            <p className="text-gray-200 text-[16px] md:text-[17px] leading-relaxed">
              Join thousands of farmers who are already increasing their yield and income with Kisan Mitra.
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="mt-10 md:mt-0 flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10">
          <button className="w-full sm:w-auto bg-[#59B23E] hover:bg-[#4d9c35] text-white font-bold text-[17px] py-3.5 px-7 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
            Download App
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/5 border border-gray-400 text-gray-100 font-semibold text-[17px] py-3.5 px-7 rounded-xl transition-colors flex items-center justify-center gap-2">
            Watch Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          </button>
        </div>
        
        {/* Decorative background shape to make it feel premium */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-0"></div>
      </div>
    </section>
  );
}
