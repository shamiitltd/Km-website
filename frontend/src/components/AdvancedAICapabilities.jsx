import { motion } from "framer-motion";

export default function AdvancedAICapabilities() {


  const capabilities = [
    {
      title: "Computer Vision & YOLOv10 Leaf AI",
      metric: "98.4% Accuracy",
      desc: "Sub-millimeter fungal spore, rust pustule, and insect pest classification from smartphone camera shots with automated Pre-Harvest Interval (PHI) pesticide calculations.",
      techStack: "PyTorch · TensorRT · ONNX Edge",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    {
      title: "Multilingual Agronomy Voice LLM",
      metric: "8 Indian Dialects",
      desc: "Natural speech recognition and synthesis in Hindi, Punjabi, Tamil, Telugu, Bengali, Gujarati, Marathi, and English with rural vernacular phrasing and zero typing required.",
      techStack: "Whisper-v3 · Custom Agri-LLM · TTS",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 01-3-3V4.5a3 3 0 116 0v7.5a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: "Sentinel-2 Satellite NDVI Telemetry",
      metric: "10m Resolution",
      desc: "Multi-spectral satellite passes calculate Normalized Difference Vegetation Index (NDVI) and root-zone soil moisture every 5 days for automated yield forecasting.",
      techStack: "ESA Sentinel-2 · GeoTIFF · Cloud GIS",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      )
    },
    {
      title: "Mandi Price Arbitrage Predictor",
      metric: "250+ Mandals Live",
      desc: "Time-series forecasting models analyze market arrivals, seasonality, and freight distances to advise farmers when and where to sell for peak profit margins.",
      techStack: "Agmarknet API · LSTM · Prophet",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: "NPK Nutrient & Fertilizer Optimizer",
      metric: "25% Cost Savings",
      desc: "Balances crop nutrient withdrawal curves against soil test levels, splitting Nitrogen into 3 staged doses to prevent leaching and maximize root uptake.",
      techStack: "ICAR Agronomy Rules · Non-Linear Optimization",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      title: "Micro-Climate Spray Window AI",
      metric: "7-9 AM Window",
      desc: "Calculates dew-point, wind drift, and humidity rise curves to identify safe windows for pesticide application without wash-off or drift damage.",
      techStack: "ECMWF Radar · Doppler Telemetry",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5C12 2.5 6.5 7.5 6.5 12A5.5 5.5 0 0017.5 12C17.5 7.5 12 2.5 12 2.5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#F8FAF8]">
      <div className="max-w-[95rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3"
          >
            Proprietary Architecture
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight"
          >
            The Kisan Mitra AI Engine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base mt-2"
          >
            Combining deep neural computer vision, multilingual transformer speech models, and real-time remote satellite sensing.
          </motion.p>
        </div>

        {/* 6 Capabilities Cards with Staggered Viewport Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-7 border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <span className="px-3 py-1 bg-emerald-100/80 text-[#123C26] text-xs font-black rounded-full font-mono">
                    {cap.metric}
                  </span>
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-2 leading-snug">
                  {cap.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-bold text-gray-400">
                  {cap.techStack}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

