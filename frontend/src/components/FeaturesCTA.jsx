import cta_plant from "../assets/cta_plant.png";

export default function FeaturesCTA() {
  return (
    <section className="w-full pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-[95rem] mx-auto bg-[#0D361C] rounded-2xl px-6 py-6 md:px-12 md:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 shadow-xl">
        
        {/* Left Side (Image & Text) */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left w-full lg:w-auto">
          
          {/* Seedling Image Placeholder */}
          <div className="w-32 h-32 md:w-[120px] md:h-[120px] flex-shrink-0 flex items-center justify-center">
            {/* The user will replace this src with their plant image */}
            <img 
              src={cta_plant} 
              alt="Seedling" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
              Smart Features for Higher Yield
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-relaxed">
              Join thousands of farmers using Kisan Mitra to farm smarter every day.
            </p>
          </div>

        </div>

        {/* Right Side (Buttons) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Download Button */}
          <button className="flex cursor-pointer items-center justify-center gap-2 bg-[#54B435] text-white px-7 py-3.5 rounded-xl font-bold text-[14px] md:text-[15px] hover:bg-[#45962b] transition-colors whitespace-nowrap w-full sm:w-auto">
            Download App Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          
          {/* Watch Demo Button */}
          <button className="flex items-center cursor-pointer justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold text-[14px] md:text-[15px] hover:bg-white/10 transition-colors whitespace-nowrap w-full sm:w-auto">
            Watch Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
