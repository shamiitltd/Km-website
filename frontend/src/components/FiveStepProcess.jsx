import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ai_engine from "../assets/ai_engine.png";


export default function FiveStepProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: "01",
      phase: "Phase 1: Setup & Geo-Fencing",
      title: "Quick Onboarding & Multi-Farm Profiling",
      headline: "Set up multiple fields in 60 seconds with 8-language voice localization",
      desc: "Register with a mobile number and select your primary dialect (Hindi, Punjabi, Tamil, Telugu, Bengali, Gujarati, Marathi, or English). Map multiple land holdings (e.g. 'Ghar Wali' 4.2 Acres & 'Nanke Ka' 2.5 Acres) with soil classification, irrigation type, and crop varieties.",
      highlights: [
        "GPS field boundary geofencing",
        "Soil type tagging (Loam, Sandy, Clay, Alluvial)",
        "8 Indian regional language switcher",
        "Multi-crop portfolio tracking (Wheat, Potato, Mustard)"
      ],
      mockBadge: "60s Setup Flow",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM8.25 18.75a3.75 3.75 0 117.5 0" />
        </svg>
      )
    },
    {
      stepNumber: "02",
      phase: "Phase 2: Daily AI Surveillance",
      title: "Real-Time Radar & Contextual Agronomy Tips",
      headline: "Hyper-local weather radar, optimal spray windows & daily crop actions",
      desc: "Every morning, our AI evaluates Doppler weather radar, temperature rise curves, and root-zone soil moisture. You receive actionable advice (e.g., 'Spray window 7–9 AM before humidity rises' or 'Crown Root stage: apply 6cm flood irrigation today') so you never miss critical crop windows.",
      highlights: [
        "Safe spray window predictor (7–9 AM)",
        "Mitra AI tip tailored to current growth stage",
        "Doppler unseasonal rain & hail warnings",
        "Soil moisture % remote sensor telemetry"
      ],
      mockBadge: "Morning Advisory 07:00 AM",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      stepNumber: "03",
      phase: "Phase 3: Point-&-Shoot AI Doctor",
      title: "Instant Disease Vision Scan & Localized Cure",
      headline: "98.4% diagnostic accuracy from a single smartphone camera photo",
      desc: "Point your camera at yellowing leaves, stem lesions, or fungal rusts. In less than 1.5 seconds, our YOLOv10 neural network diagnoses the exact pathogen (e.g. Yellow Rust, Late Blight) and provides precise chemical dosages, organic bio-remedies, and live inventory checks at nearby stores.",
      highlights: [
        "Sub-second AI leaf image classification",
        "Exact chemical dosage (Propiconazole @ 1ml/L)",
        "Pre-Harvest Interval (PHI) safety countdown",
        "Nearest fertilizer store stock check (1.2 km away)"
      ],
      mockBadge: "1.4s Vision Diagnostic",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    {
      stepNumber: "04",
      phase: "Phase 4: Nutrition & Growth Roadmap",
      title: "Soil Zinc Testing & NPK Split-Dose Optimization",
      headline: "Save up to 25% on input costs while boosting crop tiller density",
      desc: "Our agronomy engine maps your field's nutrient matrix (N, P, K, Zinc, Iron, pH). It schedules precision split-doses of Urea and DAP (Basal, 30 days, 60 days) to prevent fertilizer leaching, tracks your Soil Index score (74/100), and charts growth milestones right through to harvest maturity.",
      highlights: [
        "Soil Health Index gauge & Zinc remediation",
        "Split-dose fertilizer calculator (saves 25%)",
        "NDVI multi-spectral growth curve tracking",
        "Photo verification & crop timeline ledger"
      ],
      mockBadge: "Dynamic NPK Calibrator",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      stepNumber: "05",
      phase: "Phase 5: Harvest, Trading & Logistics",
      title: "1-Tap Mandi Listing, Trader Bidding & Logistics",
      headline: "Direct trader bidding, price arbitrage & farm-gate transport pickup",
      desc: "When harvest arrives, list produce with AI auto-fill. Compare live Mandi rates across 250+ APMC mandals (+₹75/qtl arbitrage), accept verified trader bids, and book farm-gate transport trucks directly from your field to the wholesale yard.",
      highlights: [
        "AI auto-filled produce listing with ICAR badge",
        "Direct trader bidding with transparent pricing",
        "Farm-gate transport pickup (Bolero / Tractor)",
        "Real-time APMC Mandi price discovery & arbitrage"
      ],
      mockBadge: "Verified Mandi Dispatch",
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v9.375c0 .621.504 1.125 1.125 1.125h.375" />
        </svg>
      )
    }
  ];

  const dataSources = [
    {
      title: "ESA Sentinel-2 Multi-Spectral Satellites",
      desc: "10-meter resolution passes every 5 days compute NDVI vegetation vigor & moisture indices.",
      badge: "Satellite Telemetry",
      icon: (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      )
    },
    {
      title: "Hyper-Local Weather Doppler Stations",
      desc: "Real-time rainfall radar, wind drift vectors, and morning spray window predictions.",
      badge: "Doppler Feeds",
      icon: (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      title: "Government DBT & Scheme Portals",
      desc: "Live APIs for PM-KISAN, PMFBY insurance claims, KCC credit, and SMAM subsidies.",
      badge: "Govt. API Gateway",
      icon: (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m-5.25 7.5h10.5M3.375 21h17.25M6 21v-6.75M18 21v-6.75" />
        </svg>
      )
    },
    {
      title: "Agmarknet APMC Mandi Price Tickers",
      desc: "Live arrivals, modal trading rates, and historical price volatility across 250+ mandis.",
      badge: "Mandi Trading Feeds",
      icon: (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v7.5m-12 0v-5.25m0 0a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v5.25m-6 0v-3a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v3" />
        </svg>
      )
    },
    {
      title: "ICAR & State Agri University Models",
      desc: "Crop variety protocols (DBW-187, Kufri Bahar), pest thresholds, and bio-remedy databases.",
      badge: "Scientific Research",
      icon: (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  return (
    <section id="five-step-workflow" className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[96rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3"
          >
            End-To-End Operational Lifecycle
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-tight"
          >
            Our Simple 5-Phase Precision Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg mt-3 leading-relaxed"
          >
            From field setup and real-time surveillance to disease diagnosis, nutrient management, and direct Mandi logistics dispatch.
          </motion.p>
        </div>

        {/* 5-Step Process Interactive Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <motion.button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-5 sm:p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-[#123C26] text-white border-[#123C26] shadow-xl shadow-emerald-950/20 -translate-y-1"
                    : "bg-[#F9FAF9] text-gray-800 border-gray-200 hover:border-emerald-300 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-black font-mono px-3 py-1 rounded-full ${
                      isSelected ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {step.stepNumber}
                    </span>
                    <div className={`p-2 rounded-xl ${isSelected ? "bg-emerald-800/80 text-white" : "bg-white text-[#2C8C44] shadow-2xs"}`}>
                      {step.icon}
                    </div>
                  </div>
                  <span className={`text-xs font-bold block uppercase tracking-wider mb-1.5 ${isSelected ? "text-emerald-200" : "text-emerald-700"}`}>
                    {step.phase}
                  </span>
                  <h4 className="font-black text-sm sm:text-base leading-snug">
                    {step.title}
                  </h4>
                </div>
                
                <div className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                  isSelected ? "border-emerald-700/60 text-emerald-200" : "border-gray-200 text-gray-500"
                }`}>
                  <span>{isSelected ? "Active View" : "Click to Inspect"}</span>
                  <span>→</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Deep Step Detail Inspector Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#F8FAF8] border border-gray-200/90 shadow-sm text-left mb-10"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
              
              {/* Left Detail Description */}
              <div className="w-full lg:w-[58%] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#123C26] font-bold text-xs sm:text-sm uppercase tracking-wider">
                    {steps[activeStep].phase}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-gray-500 font-bold">
                    Phase {steps[activeStep].stepNumber} of 05
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                  {steps[activeStep].headline}
                </h3>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  {steps[activeStep].desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {steps[activeStep].highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">✓</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-800">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Mock Visual Card */}
              <div className="w-full lg:w-[38%] bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2C8C44]">
                      {steps[activeStep].icon}
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-gray-900 block">{steps[activeStep].title}</strong>
                      <span className="text-xs text-gray-400 font-mono">Real-Time Mobile Simulation</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {steps[activeStep].mockBadge}
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Telemetry Status</span>
                    <strong className="text-gray-800">Operational on 50,000+ fields across 250+ Mandals</strong>
                  </div>

                  <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/60">
                    <span className="text-xs text-emerald-800 font-bold uppercase block mb-1">Farmer Benefit</span>
                    <p className="text-emerald-950 font-semibold leading-relaxed">
                      {activeStep === 0 && "Zero onboarding friction with voice-guided regional profiles."}
                      {activeStep === 1 && "Save 100% of chemical sprays from being washed away by rain."}
                      {activeStep === 2 && "Eradicate Yellow Rust & Blight infections within 48 hours."}
                      {activeStep === 3 && "Reduce chemical fertilizer expense by 25% with split dosing."}
                      {activeStep === 4 && "Eliminate middlemen commissions and gain ₹75–₹150 more per quintal."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* =========================================================================
            CENTRAL AI ENGINE / ARCHITECTURAL DATA FLOW
           ========================================================================= */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 mt-4">
          
          {/* Left Panel: Real-Time Data Ingestion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs w-full lg:w-[32%] text-left"
          >
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Input Streams</span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              Multi-Source Data Ingestion
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              Continuous live telemetry streams feed directly into our neural agronomy models.
            </p>

            <div className="space-y-4">
              {dataSources.map((source, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="bg-emerald-50 p-2.5 rounded-xl shrink-0 text-[#2C8C44]">
                    {source.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                        {source.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-[13px] mt-0.5 leading-relaxed">
                      {source.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Graphic & Data Bridge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 w-full lg:w-[32%]"
          >
            <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center relative">
              <img
                src={ai_engine}
                alt="Kisan Mitra AI Engine Architecture"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              Kisan Mitra Neural Core v2.6
            </span>
          </motion.div>

          {/* Right Panel: Smart Agronomy Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs w-full lg:w-[32%] text-left"
          >
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Actionable Intelligence</span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              Actionable Outputs for Farmers
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              Neural models convert complex datasets into single-tap daily actions.
            </p>

            <div className="space-y-4">
              {[
                { title: "Point-&-Shoot Disease Prescription", desc: "98.4% diagnostic accuracy with instant chemical & bio-remedies." },
                { title: "Micro-Climate Spray Window (7–9 AM)", desc: "Prevents pesticide wash-off and chemical evaporation." },
                { title: "Precision NPK Split Schedule", desc: "Saves 25% on fertilizer cost while maximizing grain filling." },
                { title: "Live Mandi Arbitrage (+₹75/qtl)", desc: "Connects harvest directly to verified APMC trader bids." },
                { title: "Farm-Gate Transport Dispatch", desc: "Book verified local transport to mandis directly from the app." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-[13px] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

