import { motion } from "framer-motion";
import cta_hiw from "../assets/cta_hiw.png";
import { showComingSoon } from "../utils/comingSoon";

export default function HowItWorksCTA() {
  return (
    <section className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[96rem] mx-auto bg-gradient-to-r from-[#0B2A1E] via-[#0F392B] to-[#144A38] rounded-3xl p-7 sm:p-10 md:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl relative overflow-hidden border border-emerald-500/20"
      >
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#6CB937]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Left Side: Logo & Text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 text-center md:text-left relative z-10">
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner"
          >
             <img 
               src={cta_hiw} 
               alt="Kisan Mitra App" 
               className="w-full h-full object-contain filter drop-shadow-md" 
             />
          </motion.div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-center md:self-start px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Designed for 2.4M+ Farmers
            </div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2.5">
              Ready to Transform Your Farm with AI?
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Experience edge-computed disease diagnostics, live Mandi arbitrage, dynamic NPK calculators, and government schemes guidance in 8 regional languages.
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10 shrink-0">
          {/* Download App Button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => showComingSoon('app')}
            className="w-full sm:w-auto bg-gradient-to-r from-[#6CB937] to-[#5ca62b] hover:from-[#78cb3d] hover:to-[#65b630] text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-950/40 cursor-pointer border border-emerald-300/30"
          >
            <span>Download APK</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </motion.button>
          
          {/* Watch Demo Button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => showComingSoon('demo')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md"
          >
            <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            <span>Interactive Demo</span>
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
}

