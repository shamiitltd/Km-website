import { motion } from "framer-motion";
import features_background from "../assets/features_background.png";
import { showComingSoon } from "../utils/comingSoon";

export default function FeaturesHero() {
  const stats = [
    {
      value: "50,000+",
      label: "Target Farmers",
      icon: (
        <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0Zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0Z" />
        </svg>
      )
    },
    {
      value: "250+",
      label: "Mandi Coverage",
      icon: (
        <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0Z" />
        </svg>
      )
    },
    {
      value: "98.4%",
      label: "Diagnostic Accuracy",
      icon: (
        <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      value: "8 Dialects",
      label: "Multilingual Voice AI",
      icon: (
        <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center bg-white overflow-hidden">
      {/* Background Graphic with smooth blend */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Features Mobile Background"
          className="w-full h-full object-cover lg:hidden opacity-25"
        />
        <img
          src={features_background}
          alt="Features Hero Background"
          className="hidden lg:block w-full lg:w-[62%] h-full object-cover object-left"
        />
      </div>

      {/* Gradient Overlay for high-contrast typography */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:from-white lg:via-white/90 lg:to-transparent z-10 w-full lg:w-[72%]"></div>

      {/* Hero Content with Framer Motion */}
      <div className="max-w-[96rem] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-20">
        <div className="max-w-[56rem] pt-8 pb-8 md:pt-10 md:pb-10">
          
          {/* 2026 Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-4"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#134629] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              2026 Smart Agri-Ecosystem · Complete Feature Matrix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[58px] font-black text-gray-900 leading-[1.1] mb-5 tracking-tight"
          >
            Precision AI &amp; Mandi Tech{" "}
            <span className="text-[#2C8C44] block sm:inline">for Modern Farming</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 text-lg sm:text-xl mb-6 max-w-2xl leading-relaxed font-normal"
          >
            From instant AI leaf disease diagnosis and soil nutrient remediation to live mandi price arbitrage, farm machinery rentals, and government schemes guidance—all unified in one powerful ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <button
              onClick={() => {
                const el = document.getElementById("interactive-showcase");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#123C26] to-[#2C8C44] hover:from-[#0e2f1e] hover:to-[#227237] text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/20 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>Explore Interactive Features</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => showComingSoon('app')}
              className="px-7 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold text-base rounded-2xl shadow-2xs transition-all cursor-pointer flex items-center gap-2.5"
            >
              <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Mobile App</span>
            </button>
          </motion.div>

          <div className="w-16 h-1.5 bg-[#2C8C44] mb-6 rounded-full"></div>

          {/* Stats Bar with Stagger Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-3 border-t border-gray-100"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <span className="text-2xl sm:text-[26px] font-black text-gray-900 leading-none">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
