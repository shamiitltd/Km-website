import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showComingSoon } from "../utils/comingSoon";
import { showAudioToast } from "../utils/toast";


export default function InteractiveWorkflowSimulator() {
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [fertilizerAcres, setFertilizerAcres] = useState(2);
  const [bidAccepted, setBidAccepted] = useState(false);
  const [simStepScan, setSimStepScan] = useState(false);

  const times = [
    {
      id: "morning",
      time: "07:00 AM",
      title: "Morning Routine",
      tag: "Weather & Spray Window",
      emoji: "🌅",
      desc: "Check hyper-local micro-climate conditions and spray windows before heading to the field."
    },
    {
      id: "midday",
      time: "11:30 AM",
      title: "Field Inspection",
      tag: "AI Leaf Vision Scanner",
      emoji: "☀️",
      desc: "Point camera at any suspicious crop leaf or insect for sub-second diagnosis and cure."
    },
    {
      id: "afternoon",
      time: "03:00 PM",
      title: "Nutrient Care",
      tag: "NPK Split Calculator",
      emoji: "🌤️",
      desc: "Calculate exact staged fertilizer quantities to prevent nitrogen loss and save 25% on costs."
    },
    {
      id: "evening",
      time: "06:30 PM",
      title: "Trading & Logistics",
      tag: "Mandi Bids & Transport",
      emoji: "🌆",
      desc: "Review live trader bids, accept peak offers (+₹75/qtl premium), and book farm-gate transport."
    }
  ];


  return (
    <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F8FAF8] border-t border-b border-gray-200/80">
      <div className="max-w-[96rem] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            Live Routine Simulator
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-tight"
          >
            A Day in the Life with Kisan Mitra
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg mt-3 leading-relaxed"
          >
            Follow Gajodhar Ji through a typical day. Click each time slot to see how AI transforms farm operations from dawn till dusk.
          </motion.p>
        </div>

        {/* 4 Time Slots Horizontal Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          {times.map((t) => {
            const isSelected = timeOfDay === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTimeOfDay(t.id);
                  setSimStepScan(false);
                }}
                className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#123C26] text-white border-[#123C26] shadow-lg shadow-emerald-950/20 -translate-y-1"
                    : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-2xl sm:text-3xl">{t.emoji}</span>
                    <span className={`text-xs sm:text-[13px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {t.time}
                    </span>
                  </div>
                  <h4 className="font-bold text-base sm:text-[17px] mb-0.5">{t.title}</h4>
                  <span className={`text-xs sm:text-[13px] font-semibold block ${isSelected ? "text-emerald-200" : "text-emerald-700"}`}>
                    {t.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Simulator Screen Window */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden min-h-[480px]">
          <AnimatePresence mode="wait">
            
            {/* 🌅 MORNING ROUTINE */}
            {timeOfDay === "morning" && (
              <motion.div
                key="morning"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Weather Card Simulation matching mockup */}
                  <div className="lg:col-span-6 bg-gray-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-gray-800 shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xs sm:text-sm text-gray-400 font-mono">Meerut, UP · 07:00 AM</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl sm:text-5xl font-black">28°</span>
                          <span className="text-base sm:text-lg text-emerald-400 font-bold">Partly Cloudy ⛅</span>
                        </div>
                      </div>
                      <div className="text-right text-xs sm:text-sm space-y-1 font-mono text-gray-300">
                        <div>💧 Humidity: <strong>54%</strong></div>
                        <div>💨 Wind: <strong>12 km/h (Safe)</strong></div>
                        <div>👁️ Visibility: <strong>8 km</strong></div>
                      </div>
                    </div>

                    {/* Kisan Summary Highlight */}
                    <div className="p-4 sm:p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/60 mb-5 text-xs sm:text-sm text-emerald-200 space-y-2">
                      <strong className="text-emerald-300 uppercase tracking-wider block text-xs sm:text-sm">
                        ⚡ Today's AI Spray &amp; Irrigation Verdict
                      </strong>
                      <p>✅ <strong>Safe Spray Window:</strong> 07:00 AM – 09:00 AM (Spray in morning)</p>
                      <p>⚠️ <strong>Evening Notice:</strong> Humidity will increase past 05:00 PM</p>
                      <p>💧 <strong>Irrigation Window:</strong> 6 cm flood irrigation scheduled today for Wheat</p>
                    </div>

                    {/* Voice Mitra Tip */}
                    <div className="p-3.5 sm:p-4 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-[#D4AF37] text-gray-950 flex items-center justify-center font-bold text-base">
                          🔊
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-white block">Mitra Audio Tip</span>
                          <span className="text-xs text-gray-400">Hindi Audio Note (45 seconds)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => showAudioToast("आज गेहूं की 2री सिंचाई का सही समय है। Crown root stage — 6 cm flood irrigation करें। शाम को spray न करें...", "Mitra Audio Tip (Hindi)")}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm hover:scale-105 transition-all"
                      >
                        Play Audio
                      </button>
                    </div>
                  </div>

                  {/* Right: Explanatory Context */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm rounded-full uppercase tracking-wider">
                      Phase 1: 07:00 AM Routine
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 leading-tight">
                      Never Waste an Expensive Chemical Spray
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                      Farmers lose millions when sudden rains wash away freshly applied pesticides. Kisan Mitra calculates wind drift vectors, ambient humidity, and Doppler precipitation radar so you only spray when the active ingredient will absorb 100% effectively.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-4 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-sm font-bold text-gray-900 block mb-0.5">🌦️ Micro-Climate Accuracy</strong>
                        <span className="text-xs text-gray-600">Doppler radar mapped to your exact GPS acre.</span>
                      </div>
                      <div className="p-4 bg-[#F9FAF9] rounded-2xl border border-gray-200">
                        <strong className="text-sm font-bold text-gray-900 block mb-0.5">🗣️ Voice-Guided Alert</strong>
                        <span className="text-xs text-gray-600">Audio playback for easy comprehension in field.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ☀️ MIDDAY ROUTINE */}
            {timeOfDay === "midday" && (
              <motion.div
                key="midday"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Interactive Camera Simulation */}
                  <div className="lg:col-span-6 bg-gray-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-gray-800 shadow-xl text-center">
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600"
                        alt="Wheat Leaf Inspection"
                        className="w-full h-full object-cover"
                      />
                      
                      {simStepScan && (
                        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4">
                          <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider mb-1">
                            Diagnostic Complete (1.4s)
                          </span>
                          <strong className="text-lg sm:text-xl text-white font-black">Yellow Rust (Puccinia striiformis)</strong>
                          <span className="text-xs sm:text-sm text-red-400 font-bold mt-1">⚠️ Action Required within 48 Hours</span>
                          <div className="mt-3 text-xs sm:text-sm bg-black/70 p-3 rounded-xl border border-emerald-500/30">
                            Prescription: <strong>Propiconazole 25% EC @ 1ml/L</strong>
                          </div>
                        </div>
                      )}

                      {!simStepScan && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                          <span className="text-sm font-bold text-white mb-2">Tap below to scan this infected wheat leaf</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSimStepScan(!simStepScan)}
                      className="w-full py-3.5 bg-[#10B981] hover:bg-[#059669] text-gray-950 font-black text-sm rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      {simStepScan ? "↺ Reset Scanner Simulation" : "📷 Point & Diagnose Leaf"}
                    </button>
                  </div>

                  {/* Right: Explanatory Context */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm rounded-full uppercase tracking-wider">
                      Phase 2: 11:30 AM Routine
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 leading-tight">
                      Diagnose Crop Infection in 1.5 Seconds
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                      Walking the field, you notice yellow powder on wheat leaves. With Kisan Mitra, you don't need to wait days for a field officer. Our YOLOv10 model detects fungal pustules on the spot, specifies safety intervals, and alerts you to nearby stock.
                    </p>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5 text-xs sm:text-sm">
                      <strong className="text-emerald-950 font-bold block">Nearest Local Input Store Found:</strong>
                      <p className="text-emerald-800 leading-relaxed">
                        📍 <strong>Kisan Seva Kendra (Meerut)</strong> · 1.2 km away · Propiconazole 25EC (500ml) in stock at ₹420.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 🌤️ AFTERNOON ROUTINE */}
            {timeOfDay === "afternoon" && (
              <motion.div
                key="afternoon"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Fertilizer Calculator Sandbox */}
                  <div className="lg:col-span-6 bg-[#F9FAF9] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
                      <h4 className="font-bold text-sm sm:text-base text-gray-900">NPK Split-Dose Calculator</h4>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">Wheat (Rabi)</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm sm:text-base font-bold text-gray-800 block mb-1.5">
                          Select Field Size: <strong className="text-emerald-800">{fertilizerAcres} Acres</strong>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={fertilizerAcres}
                          onChange={(e) => setFertilizerAcres(Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                          <span>1 Acre</span>
                          <span>5 Acres</span>
                          <span>10 Acres</span>
                        </div>
                      </div>

                      {/* Output Bags calculated live */}
                      <div className="grid grid-cols-3 gap-3 text-center pt-2">
                        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                          <strong className="text-2xl sm:text-3xl font-black text-gray-900 block">{fertilizerAcres * 45} kg</strong>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">Urea (46% N)</span>
                          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Split in 3 doses</span>
                        </div>

                        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                          <strong className="text-2xl sm:text-3xl font-black text-gray-900 block">{fertilizerAcres * 25} kg</strong>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">DAP (Phosphorus)</span>
                          <span className="text-[11px] text-emerald-700 font-bold block mt-1">100% Basal</span>
                        </div>

                        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                          <strong className="text-2xl sm:text-3xl font-black text-gray-900 block">{fertilizerAcres * 10} kg</strong>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">MOP (Potash)</span>
                          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Basal Dose</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Explanatory Context */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm rounded-full uppercase tracking-wider">
                      Phase 3: 03:00 PM Routine
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 leading-tight">
                      Precision Nutrition, Zero Waste
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                      Applying all nitrogen at once causes 40% of it to leach into groundwater or evaporate into the air. Kisan Mitra calculates optimal split stages (Basal, Crown Root, Tillering) so plants absorb 90%+ of applied nutrients.
                    </p>

                    <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                      💡 <strong>Agronomist Rule:</strong> Apply Urea in the late evening when the soil has balanced moisture from morning irrigation. Never apply under intense afternoon sunshine.
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 🌆 EVENING ROUTINE */}
            {timeOfDay === "evening" && (
              <motion.div
                key="evening"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 lg:p-10 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Mandi Sale & Instant Payout Card */}
                  <div className="lg:col-span-6 bg-[#F9FAF9] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs flex justify-between items-center">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-gray-900 block">🌾 Wheat Lot #4592 (45 Quintals)</span>
                        <span className="text-xs sm:text-sm text-gray-600">Meerut Mandi · High Bidder: <strong>Ramesh Traders</strong></span>
                      </div>
                      <span className="text-lg sm:text-xl font-black text-emerald-700">₹2,290/qtl</span>
                    </div>

                    <div className="p-4 sm:p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-emerald-950 block">Total Sale Gross: ₹1,03,050</span>
                        <span className="text-xs sm:text-sm text-emerald-700 font-medium">Includes Bolero transport pickup</span>
                      </div>
                      <button
                        onClick={() => setBidAccepted(true)}
                        className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                          bidAccepted ? "bg-gray-300 text-gray-700" : "bg-[#123C26] text-white shadow-xs hover:bg-[#0e2f1e]"
                        }`}
                      >
                        {bidAccepted ? "✓ Bidded & Booked" : "Accept ₹1,03,050"}
                      </button>
                    </div>

                    {bidAccepted && (
                      <div className="p-4 bg-green-100 rounded-2xl border border-green-300 text-xs sm:text-sm text-green-900 font-bold animate-pulse">
                        🎉 ₹1,03,050 bid accepted! Farm-gate transport truck booked for Meerut Mandi.
                      </div>
                    )}
                  </div>

                  {/* Right: Explanatory Context */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm rounded-full uppercase tracking-wider">
                      Phase 4: 06:30 PM Routine
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 leading-tight">
                      Direct Trader Bids with Farm-Gate Transport Pickup
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                      Cut out village middlemen who take 8–15% commissions. Receive competing bids from verified APMC traders and book farm-gate transport trucks directly from your field to the wholesale yard.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => showComingSoon('app')}
                        className="px-7 py-3.5 bg-[#123C26] hover:bg-[#0e2f1e] text-white font-bold text-sm sm:text-base rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.02]"
                      >
                        Start Selling on Kisan Mitra
                      </button>
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
