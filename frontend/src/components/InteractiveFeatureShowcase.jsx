import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showComingSoon } from "../utils/comingSoon";
import { showSuccessToast, showInfoToast, showVoiceToast } from "../utils/toast";

export default function InteractiveFeatureShowcase() {
  const [activePillar, setActivePillar] = useState("disease-ai");

  // State for Pillar 1: Disease AI Scanner Simulator
  const [selectedCropScan, setSelectedCropScan] = useState("wheat-rust");


  // State for Pillar 3: Crop Lifecycle Farm Switcher
  const [activeFarm, setActiveFarm] = useState("farm-1");

  // State for Pillar 4: Marketplace Mode
  const [marketplaceTab, setMarketplaceTab] = useState("sell");

  // State for Pillar 5: Government Schemes Explorer
  const [schemeLandCategory, setSchemeLandCategory] = useState("marginal");

  // State for Pillar 6: Mitra AI Language Switcher
  const [mitraLang, setMitraLang] = useState("hi");

  const pillars = [
    {
      id: "disease-ai",
      title: "AI Disease Doctor",
      badge: "Vision AI",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    {
      id: "soil-health",
      title: "Soil & Zinc Lab",
      badge: "Geo-Remedies",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      id: "crop-lifecycle",
      title: "Lifecycle Roadmap",
      badge: "NDVI Telemetry",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      id: "marketplace-hub",
      title: "6-Mode Marketplace",
      badge: "Live Mandi & Bids",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      )
    },
    {
      id: "gov-schemes",
      title: "Govt Schemes Guide",
      badge: "16+ Subsidies",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A48.414 48.414 0 0012 9.75c-2.551 0-5.056.2-7.5.583V21m15 0H3m18 0h.75M3 21h-.75" />
        </svg>
      )
    },
    {
      id: "mitra-companion",
      title: "Mitra AI Companion",
      badge: "8 Dialects Voice",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.84-.84 4.5 4.5 0 00.32-1.35C3.393 17.202 3 14.73 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    }
  ];

  // Scan simulation data
  const scanData = {
    "wheat-rust": {
      crop: "Wheat (गेहूं)",
      disease: "Yellow Rust (Puccinia striiformis)",
      severity: "High (Action within 48h)",
      accuracy: "98.7%",
      chemical: "Propiconazole 25% EC @ 1ml/L water (Foliar spray)",
      phi: "14 Days Pre-Harvest Interval",
      organic: "Neem Oil 5ml/L + Trichoderma viride preventive spray",
      dealerStock: "Available at Kisan Seva Kendra (1.2 km away) · ₹420/bot",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600"
    },
    "potato-blight": {
      crop: "Potato (आलू)",
      disease: "Late Blight (Phytophthora infestans)",
      severity: "Critical (54% farm risk)",
      accuracy: "99.1%",
      chemical: "Mancozeb 64% + Metalaxyl 8% WP @ 2.5g/L water",
      phi: "10 Days Pre-Harvest Interval",
      organic: "Copper Oxychloride 3g/L + Pseudomonas fluorescens",
      dealerStock: "Available at Durga Seeds & Fert (2.4 km away) · ₹380/pkg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600"
    },
    "tomato-blight": {
      crop: "Tomato (टमाटर)",
      disease: "Early Blight (Alternaria solani)",
      severity: "Moderate (Leaves spotted)",
      accuracy: "97.9%",
      chemical: "Chlorothalonil 75% WP @ 2g/L water",
      phi: "7 Days Pre-Harvest Interval",
      organic: "Bio-fungicide Bacillus subtilis foliar drench",
      dealerStock: "Available at Chaudhary Depot (5.0 km away) · ₹290/bot",
      image: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600"
    },
    "mustard-rust": {
      crop: "Mustard (सरसों)",
      disease: "White Rust (Albugo candida)",
      severity: "Early Stage Detected",
      accuracy: "98.2%",
      chemical: "Ridomil MZ @ 2g/L water",
      phi: "21 Days Pre-Harvest Interval",
      organic: "Sulfur 80% WP dust @ 15kg/acre",
      dealerStock: "Available at Hapur Agro Market · ₹310/pkg",
      image: "https://images.unsplash.com/photo-1534080391025-a7f0e91120eb?auto=format&fit=crop&q=80&w=600"
    }
  };

  return (
    <section id="interactive-showcase" className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F8FAF8]">
      <div className="max-w-[96rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            Interactive Live Sandbox
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-tight"
          >
            Experience Kisan Mitra in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg mt-2.5 leading-relaxed"
          >
            Explore our 6 revolutionary smart farming modules. Click through any pillar below to test real-time diagnostic workflows, mandi trading simulations, and agronomist AI tools.
          </motion.p>
        </div>

        {/* 6-Pillar Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-2.5 bg-white rounded-3xl border border-gray-200/80 shadow-xs mb-8"
        >
          {pillars.map((p) => {
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(p.id)}
                className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all cursor-pointer relative ${
                  isActive
                    ? "bg-[#123C26] text-white shadow-md shadow-emerald-950/20"
                    : "text-gray-700 hover:bg-emerald-50/60 hover:text-[#123C26]"
                }`}
              >
                <div className={`p-2.5 rounded-xl mb-2 ${isActive ? "bg-emerald-800 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  {p.icon}
                </div>
                <span className="text-sm sm:text-[15px] font-bold tracking-tight">{p.title}</span>
                <span className={`text-xs mt-1 px-2.5 py-0.5 rounded-full font-semibold ${
                  isActive ? "bg-emerald-700/80 text-emerald-100" : "bg-gray-100 text-gray-600"
                }`}>
                  {p.badge}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Interactive Sandbox Canvas */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-lg overflow-hidden min-h-[520px]">
          <AnimatePresence mode="wait">
            
            {/* =========================================================================
                PILLAR 1: AI DISEASE DOCTOR & SCANNER
               ========================================================================= */}
            {activePillar === "disease-ai" && (
              <motion.div
                key="disease-ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Interactive Simulated Camera Scanner Box */}
                  <div className="w-full lg:w-[48%] flex flex-col items-center">
                    <div className="w-full max-w-sm rounded-3xl bg-gray-950 border-4 border-gray-800 p-4 shadow-2xl relative overflow-hidden">
                      
                      {/* Top Scanner HUD */}
                      <div className="flex justify-between items-center text-xs text-white/90 mb-3 px-1">
                        <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                          YOLOv10 Leaf Vision AI
                        </span>
                        <span className="font-mono text-gray-400">60 FPS · 4K</span>
                      </div>

                      {/* Viewfinder with Reticle Corners */}
                      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={scanData[selectedCropScan].image}
                          alt="Crop scan leaf"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Animated Laser Scanning Line */}
                        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-bounce top-1/2"></div>

                        {/* Scanner Corners */}
                        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-400"></div>
                        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-400"></div>
                        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-emerald-400"></div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-400"></div>

                        <div className="absolute bottom-3 inset-x-3 bg-black/75 backdrop-blur-md rounded-xl p-2.5 text-center text-white text-xs border border-white/10">
                          <span className="text-emerald-400 font-bold">Diagnosed:</span> {scanData[selectedCropScan].disease}
                        </div>
                      </div>

                      {/* Leaf Sample Switcher */}
                      <div className="mt-4 pt-3 border-t border-gray-800">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                          Select Crop Sample to Scan:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(scanData).map(([key, data]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setSelectedCropScan(key)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                                selectedCropScan === key
                                  ? "bg-emerald-500 text-gray-950 font-black shadow-xs"
                                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                              }`}
                            >
                              {data.crop}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Instant Agronomist Treatment Protocol */}
                  <div className="w-full lg:w-[52%] space-y-5 text-left">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-100 text-red-800 font-bold text-xs rounded-full border border-red-200">
                        {scanData[selectedCropScan].severity}
                      </span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200">
                        Confidence: {scanData[selectedCropScan].accuracy}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                        {scanData[selectedCropScan].disease}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mt-1">
                        Crop Target: <strong className="text-gray-800">{scanData[selectedCropScan].crop}</strong> · Verified with ICAR Pathogen Repository
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Chemical Protocol */}
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide mb-1">
                          <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25" />
                          </svg>
                          Recommended Chemical Prescription
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {scanData[selectedCropScan].chemical}
                        </p>
                        <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md mt-2">
                          ⚠️ Safety PHI: {scanData[selectedCropScan].phi}
                        </span>
                      </div>

                      {/* Organic Remedy */}
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-2 text-gray-700 font-bold text-xs uppercase tracking-wide mb-1">
                          🌿 Certified Organic Bio-Remedy
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          {scanData[selectedCropScan].organic}
                        </p>
                      </div>

                      {/* Nearest Dealer Availability */}
                      <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-blue-900 font-medium">
                          <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span>{scanData[selectedCropScan].dealerStock}</span>
                        </div>
                        <button
                          onClick={() => showComingSoon('store')}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shrink-0 cursor-pointer shadow-2xs"
                        >
                          Order Online
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PILLAR 2: SOIL HEALTH & ZINC DEFICIENCY ENGINE
               ========================================================================= */}
            {activePillar === "soil-health" && (
              <motion.div
                key="soil-health"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Gauge & Nutrient Grid */}
                  <div className="lg:col-span-6 bg-[#F9FAF9] p-6 sm:p-8 rounded-3xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                      
                      {/* Circular Gauge SVG */}
                      <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="10"
                            strokeDasharray="314"
                            strokeDashoffset="81.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-3xl font-black text-gray-900 block leading-none">74</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Soil Index</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                          Good Farm Health
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2">Ghar Wali Farm (4.2 Acres)</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Sample tested via Digital Soil Sensor Lab · Meerut Region
                        </p>
                      </div>
                    </div>

                    {/* 6-Parameter Matrix */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-white rounded-2xl border border-gray-200">
                        <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-1">N</div>
                        <span className="text-xs font-bold text-gray-800 block">Nitrogen</span>
                        <span className="text-[11px] font-semibold text-emerald-600">Optimal</span>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-gray-200">
                        <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-1">P</div>
                        <span className="text-xs font-bold text-gray-800 block">Phosphorus</span>
                        <span className="text-[11px] font-semibold text-emerald-600">Optimal</span>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-gray-200">
                        <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-1">K</div>
                        <span className="text-xs font-bold text-gray-800 block">Potassium</span>
                        <span className="text-[11px] font-semibold text-emerald-600">Optimal</span>
                      </div>

                      <div className="p-3 bg-red-50/70 rounded-2xl border border-red-200 animate-pulse">
                        <div className="w-7 h-7 mx-auto rounded-full bg-red-200 text-red-900 font-bold text-xs flex items-center justify-center mb-1">Zn</div>
                        <span className="text-xs font-black text-red-900 block">Zinc (Zn)</span>
                        <span className="text-[11px] font-bold text-red-700">⚠️ Very Low</span>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-gray-200">
                        <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-1">Fe</div>
                        <span className="text-xs font-bold text-gray-800 block">Iron (Fe)</span>
                        <span className="text-[11px] font-semibold text-emerald-600">Optimal</span>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-gray-200">
                        <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-1">pH</div>
                        <span className="text-xs font-bold text-gray-800 block">pH Level</span>
                        <span className="text-[11px] font-semibold text-emerald-600">6.5 Neutral</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Localized Zinc Remedies & Geo-Inventory */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full border border-amber-200 uppercase">
                      Action Needed: Zinc Supplementation
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      Zinc Sulphate Remediation &amp; Local Dealers
                    </h3>
                    
                    <p className="text-sm text-gray-600">
                      Zinc deficiency limits wheat tillering by up to 35%. Apply 5kg Zinc Sulphate 21% or Chelated Zinc 12% at first irrigation stage.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between hover:border-emerald-300 transition-all">
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">Kisan Seva Kendra (Meerut)</h5>
                          <p className="text-xs text-gray-500">Zinc Sulphate 21% (5kg Bag) · 1.2 km away</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-[#123C26]">₹299</span>
                          <span className="block text-[10px] text-emerald-600 font-bold">In Stock</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between hover:border-emerald-300 transition-all">
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">Durga Seeds &amp; Fertilizers</h5>
                          <p className="text-xs text-gray-500">Chelated Zinc 12% (1kg Pack) · 2.4 km away</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-[#123C26]">₹180</span>
                          <span className="block text-[10px] text-emerald-600 font-bold">In Stock</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between opacity-85">
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">Chaudhary Fertilizer Depot</h5>
                          <p className="text-xs text-gray-500">Zinc Sulphate (10kg Commercial) · 5.0 km away</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-[#123C26]">₹550</span>
                          <span className="block text-[10px] text-amber-600 font-bold">Limited Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PILLAR 3: CROP LIFECYCLE ROADMAP & NDVI TELEMETRY
               ========================================================================= */}
            {activePillar === "crop-lifecycle" && (
              <motion.div
                key="crop-lifecycle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Sowing-To-Harvest Lifecycle Management
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                      Ghar Wali Farm · Wheat (DBW-187)
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveFarm("farm-1")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeFarm === "farm-1"
                          ? "bg-[#123C26] text-white shadow-xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Wheat (4.2 Acres · Day 45)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFarm("farm-2")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        activeFarm === "farm-2"
                          ? "bg-[#123C26] text-white shadow-xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Potato (2.5 Acres · Day 60)
                    </button>
                  </div>
                </div>

                {/* Timeline Step Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">✓</span>
                    <h5 className="font-bold text-xs text-emerald-950">1. Sowing (Nov 15)</h5>
                    <p className="text-[11px] text-emerald-800 mt-1">DBW-187 · 45kg/Acre with basal DAP</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">✓</span>
                    <h5 className="font-bold text-xs text-emerald-950">2. Irrigation 1 (Dec 10)</h5>
                    <p className="text-[11px] text-emerald-800 mt-1">Crown root initiation · Flood 6cm</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">✓</span>
                    <h5 className="font-bold text-xs text-emerald-950">3. Weed Spray (Jan 03)</h5>
                    <p className="text-[11px] text-emerald-800 mt-1">Clodinafop 98% weed eradication</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-left animate-pulse">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 font-black text-xs flex items-center justify-center mb-2">4</span>
                    <h5 className="font-black text-xs text-amber-950">4. Irrigation 2 (Today)</h5>
                    <p className="text-[11px] text-amber-800 mt-1">Due today! Follow with 50kg Urea/Acre</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left opacity-75">
                    <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 font-bold text-xs flex items-center justify-center mb-2">5</span>
                    <h5 className="font-bold text-xs text-gray-800">5. Harvest (Apr 05)</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Est. 90 qtl · Grade A Quality</p>
                  </div>
                </div>

                {/* Live Telemetry Ledger */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-gray-900 text-white">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Estimated Production</span>
                    <strong className="text-xl font-bold text-emerald-400">90 Quintals</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Water Consumption</span>
                    <strong className="text-xl font-bold text-sky-400">1.8M Liters</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Quality Index</span>
                    <strong className="text-xl font-bold text-amber-400">Grade A (Verified)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Mandi Forecast</span>
                    <strong className="text-xl font-bold text-emerald-400">₹2,310/qtl (+3.2%)</strong>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PILLAR 4: 6-PILLAR AGRI-MARKETPLACE ECOSYSTEM
               ========================================================================= */}
            {activePillar === "marketplace-hub" && (
              <motion.div
                key="marketplace-hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                {/* Marketplace Mode Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
                  {[
                    { key: "sell", label: "Sell Produce (AI Auto-Fill)" },
                    { key: "buy", label: "Buy Certified Inputs" },
                    { key: "rent", label: "Rent Tractors & Drones" },
                    { key: "rates", label: "Live Mandi Rates" },
                    { key: "transport", label: "Book Mandi Transport" }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setMarketplaceTab(tab.key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        marketplaceTab === tab.key
                          ? "bg-[#123C26] text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub-Panel: Sell Produce */}
                {marketplaceTab === "sell" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-emerald-900 uppercase">⚡ 1-Tap AI Auto-Fill Listing</span>
                          <span className="text-[11px] font-bold text-emerald-700">Pulls Farm History</span>
                        </div>
                        <p className="text-xs text-emerald-800">
                          Pre-populates variety (Wheat DBW-187), harvested quantity (45 qtl), Meerut mandi location, and ICAR pesticide-free certification badge automatically.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-gray-900 block">🌾 Wheat (गेहूं) · 45 Quintals</span>
                            <span className="text-[11px] text-gray-500">Meerut Mandi · Grade A Certified</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-emerald-700">₹2,280/qtl</span>
                            <span className="block text-[10px] font-bold text-red-600">🔴 Live Bids: 2</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-gray-900 block">🥔 Potato (आलू) · 120 Quintals</span>
                            <span className="text-[11px] text-gray-500">Agra Cold Storage · Kufri Bahar</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-emerald-700">₹820/qtl</span>
                            <span className="block text-[10px] font-bold text-amber-600">⏳ Pending Review</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Incoming Trader Bids */}
                    <div className="p-6 bg-[#F9FAF9] rounded-3xl border border-gray-200">
                      <h4 className="font-bold text-base text-gray-900 mb-3">Live Buyer Offers &amp; Bids</h4>
                      <div className="space-y-3">
                        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 flex items-center justify-between">
                          <div>
                            <h5 className="font-bold text-xs text-gray-900">Ramesh Traders (Meerut APMC)</h5>
                            <span className="text-[11px] text-emerald-700 font-bold">Offer: ₹2,290/qtl (Total ₹1,03,050)</span>
                          </div>
                          <button
                            onClick={() => showSuccessToast("Bid accepted for Ramesh Traders at ₹2,290/qtl. Farm-gate transport reserved.", "Bid Accepted & Confirmed")}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-2xs hover:scale-105 transition-all"
                          >
                            Accept Offer
                          </button>
                        </div>

                        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 flex items-center justify-between">
                          <div>
                            <h5 className="font-bold text-xs text-gray-900">Shree Agro Millers</h5>
                            <span className="text-[11px] text-gray-600 font-medium">Offer: ₹2,270/qtl (Total ₹1,02,150)</span>
                          </div>
                          <button
                            onClick={() => showInfoToast("Offer from Shree Agro Millers declined. You can wait for higher bids or relist lot.", "Offer Declined")}
                            className="px-3.5 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Live Mandi Rates */}
                {marketplaceTab === "rates" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { crop: "🌾 Wheat (गेहूं)", market: "Meerut Mandi", price: "₹2,310/qtl", trend: "+₹75 (3.2%)", up: true },
                      { crop: "🌿 Mustard (सरसों)", market: "Hapur Mandi", price: "₹5,680/qtl", trend: "+₹120 (2.1%)", up: true },
                      { crop: "🥔 Potato (आलू)", market: "Agra Market", price: "₹820/qtl", trend: "-₹40 (4.6%)", up: false },
                      { crop: "🧅 Onion (प्याज़)", market: "Nasik Mandi", price: "₹1,450/qtl", trend: "0.0% Stable", up: true },
                      { crop: "🌽 Maize (मक्का)", market: "Ghaziabad", price: "₹1,980/qtl", trend: "+₹30 (1.5%)", up: true },
                      { crop: "🌱 Soybean (सोयाबीन)", market: "Indore APMC", price: "₹4,200/qtl", trend: "-₹60 (1.4%)", up: false },
                      { crop: "🍅 Tomato (टमाटर)", market: "Delhi Azadpur", price: "₹1,200/qtl", trend: "+₹200 (20%)", up: true },
                      { crop: "🫘 Chana Dal (चना)", market: "Kanpur Mandi", price: "₹5,100/qtl", trend: "+₹90 (1.8%)", up: true }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                        <span className="text-xs font-bold text-gray-900 block">{item.crop}</span>
                        <span className="text-[10px] text-gray-400 block">{item.market}</span>
                        <div className="mt-3 flex items-baseline justify-between">
                          <span className="text-base font-black text-gray-900">{item.price}</span>
                          <span className={`text-[10px] font-bold ${item.up ? "text-emerald-600" : "text-red-600"}`}>
                            {item.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-Panel: Machinery & Drones */}
                {(marketplaceTab === "rent" || marketplaceTab === "buy" || marketplaceTab === "transport") && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-5 rounded-2xl bg-[#F9FAF9] border border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] rounded-full uppercase">Rent with Driver</span>
                        <h4 className="font-bold text-base text-gray-900 mt-2">Mahindra Mini Tractor 35HP</h4>
                        <p className="text-xs text-gray-500 mt-1">Available for ploughing, harrowing &amp; rotary tilling in Meerut region.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <strong className="text-base font-black text-gray-900">₹3,500/day</strong>
                        <button onClick={() => showComingSoon('rent')} className="px-3 py-1.5 bg-[#123C26] text-white text-xs font-bold rounded-xl cursor-pointer">Rent Now</button>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F9FAF9] border border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full uppercase">Drone Pilot Included</span>
                        <h4 className="font-bold text-base text-gray-900 mt-2">DJI Agras T40 Spray Drone</h4>
                        <p className="text-xs text-gray-500 mt-1">Ultra-precision foliar pesticide spraying. Covers 1 acre in 6 minutes.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <strong className="text-base font-black text-gray-900">₹1,200/acre</strong>
                        <button onClick={() => showComingSoon('rent')} className="px-3 py-1.5 bg-[#123C26] text-white text-xs font-bold rounded-xl cursor-pointer">Book Drone</button>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F9FAF9] border border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold text-[10px] rounded-full uppercase">Mandi Logistics</span>
                        <h4 className="font-bold text-base text-gray-900 mt-2">Bolero Pickup / Tata 407</h4>
                        <p className="text-xs text-gray-500 mt-1">Farm gate pickup to APMC Mandi. Direct GPS load tracking.</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <strong className="text-base font-black text-gray-900">₹15/km</strong>
                        <button onClick={() => showComingSoon('transport')} className="px-3 py-1.5 bg-[#123C26] text-white text-xs font-bold rounded-xl cursor-pointer">Call Driver</button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            {/* =========================================================================
                PILLAR 5: GOVERNMENT SCHEMES & SUBSIDY EXPLORER
               ========================================================================= */}
            {activePillar === "gov-schemes" && (
              <motion.div
                key="gov-schemes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left: Interactive Eligibility Checker */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2215] to-[#123C26] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <span className="text-xs text-emerald-300/80 font-medium block">Scheme Eligibility Estimator</span>
                          <h4 className="text-xl font-black mt-1">Check Your Subsidies</h4>
                        </div>
                        <span className="text-xs px-2.5 py-1 bg-emerald-700/60 rounded-lg text-emerald-200 font-bold border border-emerald-500/30">
                          16+ Schemes
                        </span>
                      </div>

                      <p className="text-xs text-emerald-200/90 mb-4 leading-relaxed">
                        Select your land holding size to view verified Central &amp; State government subsidies available for your farm:
                      </p>

                      {/* Land Category Switcher */}
                      <div className="space-y-2 mb-6">
                        {[
                          { id: "marginal", label: "Marginal Farmer (< 1 Hectare / 2.5 Acres)", tag: "Max Priority" },
                          { id: "small", label: "Small Farmer (1–2 Hectares / 2.5–5 Acres)", tag: "High Subsidy" },
                          { id: "medium", label: "Medium / Large Farmer (> 2 Hectares)", tag: "Standard" }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSchemeLandCategory(cat.id)}
                            className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
                              schemeLandCategory === cat.id
                                ? "bg-emerald-500/20 text-white border-emerald-400"
                                : "bg-white/5 text-emerald-100/70 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            <span>{cat.label}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300">
                              {cat.tag}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Document Readiness Card */}
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-1.5 mb-6">
                        <span className="font-bold text-emerald-300 block">Required Documentation:</span>
                        <div className="flex items-center gap-2 text-emerald-100/90 text-[11px]">
                          <span>✓ Aadhaar Card</span>
                          <span>·</span>
                          <span>✓ Land Records (Khatauni/Khasra)</span>
                          <span>·</span>
                          <span>✓ Mobile OTP</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showComingSoon('schemes', 'Government Schemes Portal', 'Explore the verified directory of 16+ Central and State agriculture schemes with eligibility calculators.', 'features_schemes_guide')}
                      className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f2b] text-gray-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md text-center block"
                    >
                      🏛️ Explore All 16+ Government Schemes
                    </button>
                  </div>

                  {/* Right: Direct Benefit Schemes Directory */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-gray-900">
                        Verified Central &amp; State Agriculture Schemes
                      </h4>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                        2026 Directory
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900">PM-KISAN Samman Nidhi</span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">Active</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">₹6,000/year direct financial support in 3 equal installments for input procurement</p>
                        </div>
                        <span className="text-sm font-black text-emerald-700">₹6,000/yr</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900">PM-KUSUM Solar Irrigation Subsidy</span>
                            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full">60% Capital Grant</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Solar water pump array installation grant (30% Central + 30% State assistance)</p>
                        </div>
                        <span className="text-sm font-black text-emerald-700">Up to 60%</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900">SMAM Farm Mechanization Scheme</span>
                            <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full">50% Grant</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Subsidies on tractors, rotavators, power tillers, and agricultural spraying drones</p>
                        </div>
                        <span className="text-sm font-black text-emerald-700">40–50%</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900">PMFBY Comprehensive Crop Insurance</span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">1.5% Premium</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">Yield protection against unseasonal rains, drought, flood, hailstorms &amp; pest attacks</p>
                        </div>
                        <span className="text-sm font-black text-gray-900">Full Loss Cover</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PILLAR 6: MULTI-MODAL MITRA AI COMPANION
               ========================================================================= */}
            {activePillar === "mitra-companion" && (
              <motion.div
                key="mitra-companion"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Chat Simulator */}
                  <div className="lg:col-span-6 bg-gray-950 rounded-3xl p-6 border-2 border-gray-800 shadow-xl text-white">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-gray-950 font-black flex items-center justify-center">
                          M
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">Mitra AI Agronomist</h4>
                          <span className="text-[10px] text-emerald-400 font-mono">● Online in 8 Languages</span>
                        </div>
                      </div>

                      {/* Language dialect selector */}
                      <select
                        value={mitraLang}
                        onChange={(e) => setMitraLang(e.target.value)}
                        className="bg-gray-900 border border-gray-700 text-xs rounded-lg px-2.5 py-1 text-gray-200 outline-none"
                      >
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="gu">ગુજરાતી (Gujarati)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    {/* Chat Messages */}
                    <div className="py-5 space-y-3.5 text-xs">
                      <div className="p-3 bg-gray-900 rounded-2xl rounded-tl-xs max-w-[85%] border border-gray-800 text-gray-200">
                        {mitraLang === "hi" && "नमस्ते गजोधर जी! आज आपके गेहूं के खेत में Crown Root स्टेज की सिंचाई का सही समय है।"}
                        {mitraLang === "pa" && "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਗਜੋਧਰ ਜੀ! ਅੱਜ ਕਣਕ ਦੀ ਦੂਜੀ ਸਿੰਚਾਈ ਦਾ ਸਹੀ ਸਮਾਂ ਹੈ।"}
                        {mitraLang === "en" && "Hello Gajodhar Ji! Today is the right time for 2nd irrigation of your wheat crop (Crown Root Stage)."}
                        {mitraLang !== "hi" && mitraLang !== "pa" && mitraLang !== "en" && "नमस्ते! Real-time agronomy advisory available in your chosen dialect."}
                      </div>

                      <div className="p-3 bg-emerald-950 text-emerald-100 rounded-2xl rounded-tr-xs max-w-[85%] ml-auto border border-emerald-800">
                        {mitraLang === "hi" && "सिंचाई के बाद यूरिया कब और कितना डालना चाहिए?"}
                        {mitraLang === "pa" && "ਸਿੰਚਾਈ ਤੋਂ ਬਾਅਦ ਯੂਰੀਆ ਕਦੋਂ ਪਾਈਏ?"}
                        {mitraLang === "en" && "When and how much Urea fertilizer should I apply after watering?"}
                        {mitraLang !== "hi" && mitraLang !== "pa" && mitraLang !== "en" && "When should I apply urea fertilizer?"}
                      </div>

                      <div className="p-3 bg-gray-900 rounded-2xl rounded-tl-xs max-w-[90%] border border-gray-800 text-gray-200 space-y-1.5">
                        <p>
                          {mitraLang === "hi" && "कल शाम को 50 किलो यूरिया प्रति एकड़ डालें। तेज दोपहर में न डालें ताकि नाइट्रोजन हवा में न उड़े।"}
                          {mitraLang === "pa" && "ਕੱਲ੍ਹ ਸ਼ਾਮ ਨੂੰ 50 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ ਯੂਰੀਆ ਪਾਓ। ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਨਾ ਪਾਓ।"}
                          {mitraLang === "en" && "Apply 50kg Urea per acre tomorrow evening when soil has optimal moisture. Avoid hot afternoon sun."}
                          {mitraLang !== "hi" && mitraLang !== "pa" && mitraLang !== "en" && "Apply 50kg Urea per acre in the evening hours."}
                        </p>
                        <span className="inline-block text-[10px] text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded">
                          📦 Subsidized Urea at ₹266/bag in Mandi store
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-800 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ask Mitra via text or tap mic..."
                        className="flex-1 px-3 py-2 bg-gray-900 rounded-xl text-xs text-white border border-gray-700 outline-none"
                        readOnly
                      />
                      <button
                        onClick={() => showVoiceToast("Listening in Hindi, Punjabi, Tamil, Telugu, and English... Speak your agricultural question now.", "Mitra Multilingual Voice Assistant")}
                        className="w-8 h-8 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-gray-950 flex items-center justify-center font-bold cursor-pointer transition-transform hover:scale-110 shadow-sm"
                        title="Voice Mic"
                      >
                        🎤
                      </button>
                    </div>
                  </div>

                  {/* Right: Multi-modal Capabilities */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Empowering Every Farmer Regardless of Literacy
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                      Voice, Camera &amp; Dialect-Native Intelligence
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Farmers don't need to type complicated agricultural terminology. Simply tap the mic, speak naturally in your mother tongue, or point your camera at any diseased plant for an instantaneous, agronomist-verified solution.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-xs font-bold text-gray-900 block mb-1">🗣️ Regional Voice Dialects</strong>
                        <p className="text-[11px] text-gray-500">Natural conversational speech recognition trained on rural accents.</p>
                      </div>

                      <div className="p-3.5 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-xs font-bold text-gray-900 block mb-1">📷 Vision Leaf Diagnosis</strong>
                        <p className="text-[11px] text-gray-500">Instant visual detection of 150+ pests, rusts, blights, and deficiencies.</p>
                      </div>

                      <div className="p-3.5 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-xs font-bold text-gray-900 block mb-1">⚡ Weather &amp; Spray Windows</strong>
                        <p className="text-[11px] text-gray-500">Advises exact morning spray windows (7-9 AM) before humidity spikes.</p>
                      </div>

                      <div className="p-3.5 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-xs font-bold text-gray-900 block mb-1">💰 Mandi &amp; Scheme Guidance</strong>
                        <p className="text-[11px] text-gray-500">Guides through PM-KISAN, KCC, and nearest high-price mandi targets.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
