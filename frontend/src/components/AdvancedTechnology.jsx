import { motion } from "framer-motion";
import advanced_tech from "../assets/advanced_tech.png";


export default function AdvancedTechnology() {
  const benefits = [
    { title: "Bank-Grade Privacy & Encryption", desc: "256-bit SSL encrypted farmer financial and GPS soil records." },
    { title: "Offline-First Edge Inference", desc: "Runs AI leaf diagnostics directly on device without internet connectivity." },
    { title: "8 Indian Regional Dialects", desc: "Full natural speech recognition in Hindi, Punjabi, Tamil, Telugu, and more." },
    { title: "Ultra-Lightweight PWA Architecture", desc: "Installs in seconds under 15MB on budget Android smartphones." }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-24 bg-white">
      <div className="max-w-[95rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Content with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-[38rem] text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#123C26] text-xs font-bold uppercase tracking-wider mb-4">
            Security &amp; Performance
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-gray-900 leading-[1.15] mb-4 tracking-tight">
            Built with 2026 Next-Gen{" "}
            <span className="text-[#2C8C44]">Agri-Technology</span>
          </h2>

          <div className="w-14 h-1 bg-[#2C8C44] mb-6 rounded-full"></div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            Kisan Mitra combines edge neural inference, Sentinel-2 multi-spectral remote sensing, and direct banking integrations to deliver dependable real-time insights even in remote, low-connectivity rural belts.
          </p>

          {/* Bullet Points */}
          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F9FAF9] border border-gray-200/80 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <img
            src={advanced_tech}
            alt="Advanced Technology Architecture"
            className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[540px] object-contain drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}

