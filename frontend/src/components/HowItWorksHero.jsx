import { motion } from "framer-motion";
import features_background from "../assets/features_background.png";
import { showComingSoon } from "../utils/comingSoon";

export default function HowItWorksHero() {
  const stats = [
    {
      value: "50,000+",
      label: "Farmers in Focus",
      icon: (
        <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0Zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0Z" />
        </svg>
      )
    },
    {
      value: "250+",
      label: "Target Districts",
      icon: (
        <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0Z" />
        </svg>
      )
    },
    {
      value: "100+",
      label: "Crops Supported",
      icon: (
        <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8 8 0 0 1 8-8h2v2a8 8 0 0 1-8 8h-2z M12 13a8 8 0 0 0-8-8H2v2a8 8 0 0 0 8 8h2z" />
        </svg>
      )
    },
    {
      value: "30% Avg",
      label: "Projected Yield Lift",
      icon: (
        <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center bg-white overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="How It Works Mobile Background"
          className="w-full h-full object-cover lg:hidden opacity-25"
        />
        <img
          src={features_background}
          alt="How It Works Background"
          className="hidden lg:block w-full lg:w-[62%] h-full object-cover object-left"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:from-white lg:via-white/90 lg:to-transparent z-10 w-full lg:w-[72%]"></div>

      {/* Content Container */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 w-full relative z-20">
        <div className="max-w-[56rem] pt-8 pb-8 md:pt-10 md:pb-10">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-4"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#134629] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              End-To-End Precision Farming Workflow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[58px] font-black text-gray-900 leading-[1.1] mb-4 tracking-tight"
          >
            How <span className="text-[#2C8C44]">Kisan Mitra</span> Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 text-lg sm:text-xl mb-7 max-w-2xl leading-relaxed font-normal"
          >
            A seamless 5-phase journey that turns complex satellite imagery, soil chemistry, and mandi price fluctuations into simple daily actions for Indian farmers.
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
                const el = document.getElementById("five-step-workflow");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 bg-gradient-to-r from-[#123C26] to-[#2C8C44] hover:from-[#0e2f1e] hover:to-[#227237] text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-900/20 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>See the 5-Step Process</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => showComingSoon('demo')}
              className="px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-base rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
              </svg>
              <span>Watch 2-Min Demo</span>
            </button>
          </motion.div>

          <div className="w-16 h-1.5 bg-[#2C8C44] mb-8 rounded-full"></div>

          {/* Stats Row Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/95 backdrop-blur-sm border border-emerald-100/90 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-2.5">
                  {stat.icon}
                </div>
                <span className="text-xl sm:text-2xl lg:text-[26px] font-black text-gray-900 leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-gray-600 uppercase tracking-wide mt-1">
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

