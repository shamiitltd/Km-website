import { motion } from "framer-motion";
import profile_one from "../assets/profile_one.png";
import { showComingSoon } from "../utils/comingSoon";


export default function WhyFarmersLove() {
  const comparison = [
    {
      metric: "Disease Diagnostics",
      traditional: "Wait 4–7 days for visiting officer",
      kisanMitra: "1.4s Instant Leaf AI with 98.4% accuracy",
      impact: "Zero crop devastation"
    },
    {
      metric: "Chemical & Fertilizer Usage",
      traditional: "Over-application, 40% nutrient wash-off",
      kisanMitra: "staged NPK split-dosing & Zinc remediation",
      impact: "25% Input cost saved"
    },
    {
      metric: "Mandi Produce Sales",
      traditional: "Village middlemen taking 8–15% cut",
      kisanMitra: "Live trader bids across 250+ mandals",
      impact: "+₹75–₹150/qtl Higher return"
    },
    {
      metric: "Government Schemes & Subsidies",
      traditional: "Unaware of eligibility & complex paperwork",
      kisanMitra: "Interactive scheme directory with document checklist",
      impact: "Up to 60% farm capital grant"
    }
  ];

  return (
    <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[96rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3"
          >
            Projected Agronomy ROI
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-tight"
          >
            Why Farmers Value Kisan Mitra
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg mt-2 leading-relaxed"
          >
            Projected performance benchmarks between conventional guesswork farming and AI-guided precision agriculture.
          </motion.p>
        </div>

        {/* 2-Column: Video Banner + ROI Comparison Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Left: Video Showcase Banner with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onClick={() => showComingSoon('demo', 'KisanMitra in Action Walkthrough', 'A comprehensive video walkthrough demonstrating step-by-step smart farming workflows.', 'video_demo_waitlist')}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gray-900 group cursor-pointer shadow-lg flex flex-col justify-between min-h-[400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
              alt="Lush green agriculture farm field - Kisan Mitra in Action"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

            <div className="relative z-10 p-6 sm:p-8 flex justify-between items-center">
              <span className="px-3.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-white font-mono text-xs sm:text-sm border border-white/20">
                HD Walkthrough · 2:15 Min
              </span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <div className="relative z-10 p-6 sm:p-8 text-left">
              <div className="w-14 h-14 bg-white text-[#123C26] rounded-2xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 group-hover:bg-[#D4AF37] transition-all">
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Watch Kisan Mitra in Action
              </h3>
              <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                See how a wheat farmer can save up to ₹18,000 per acre with daily spray alerts and direct mandi bidding.
              </p>
            </div>
          </motion.div>

          {/* Right: Traditional vs. Kisan Mitra Comparison Table with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#F9FAF9] border border-gray-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4 text-left">
                <h4 className="text-lg sm:text-xl font-black text-gray-900">
                  Conventional Guesswork vs. Precision AI Farming
                </h4>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
                  Impact Matrix
                </span>
              </div>

              <div className="space-y-3 text-left">
                {comparison.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wide">
                        {item.metric}
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                        {item.impact}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
                      <div className="text-gray-500 line-through">
                        <span className="font-bold text-gray-400">Conventional:</span> {item.traditional}
                      </div>
                      <div className="text-emerald-950 font-bold">
                        <span className="text-emerald-700 font-black">Kisan Mitra:</span> {item.kisanMitra}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote Pill */}
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center gap-4 text-left">
              <img
                src={profile_one}
                alt="Ram Prasad Yadav"
                className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-emerald-950 italic font-medium leading-snug">
                  &ldquo;Kisan Mitra ka vision kheti ko saral aur labhkari banana hai. Sahi samay par sahi salah aur sidha mandi connection.&rdquo;
                </p>
                <span className="text-xs sm:text-sm font-bold text-emerald-900 mt-1 block">
                  — Pilot Field Advisory Feedback (Kanpur, UP · 4.2 Acres)
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

