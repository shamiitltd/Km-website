import { motion } from "framer-motion";
import cta_plant from "../assets/cta_plant.png";
import { showComingSoon } from "../utils/comingSoon";


export default function FeaturesCTA() {
  return (
    <section className="w-full pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-[96rem] mx-auto bg-gradient-to-r from-[#0D361C] via-[#123C26] to-[#0A2617] rounded-3xl px-7 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl border border-emerald-800/40"
      >
        {/* Left Side (Image & Text) */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left w-full lg:w-auto">
          
          {/* Plant Icon Container */}
          <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
            <img 
              src={cta_plant} 
              alt="Seedling" 
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          
          {/* Text Content */}
          <div className="max-w-2xl text-white text-left">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider border border-emerald-400/30">
              Get Started in Minutes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2.5 mb-2.5 tracking-tight">
              Ready to Upgrade Your Farm with AI?
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed font-normal">
              Built to empower progressive farmers across India with instant disease diagnostics, weather radar alerts, dynamic NPK fertilization, and government subsidies guidance.
            </p>
          </div>

        </div>

        {/* Right Side (Action Buttons) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
          <button 
            onClick={() => showComingSoon('app')}
            className="flex cursor-pointer items-center justify-center gap-2.5 bg-[#54B435] hover:bg-[#439628] text-white px-8 py-4 rounded-xl font-bold text-base transition-all whitespace-nowrap w-full sm:w-auto shadow-lg shadow-emerald-950/40 hover:scale-[1.02]"
          >
            <span>Download Mobile App</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          
          <button 
            onClick={() => showComingSoon('demo')}
            className="flex items-center cursor-pointer justify-center gap-2.5 border border-white/20 text-white hover:bg-white/10 px-7 py-4 rounded-xl font-bold text-base transition-all whitespace-nowrap w-full sm:w-auto hover:scale-[1.02]"
          >
            <span>Watch 2-Min Demo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          </button>
        </div>

      </motion.div>
    </section>
  );
}

