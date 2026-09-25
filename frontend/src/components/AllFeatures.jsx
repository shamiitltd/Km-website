import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { showVoiceToast } from "../utils/toast";

export default function AllFeatures() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "ai", label: "AI & Vision Diagnostics" },
    { id: "market", label: "Marketplace & Logistics" },
    { id: "schemes", label: "Government Schemes & Advisory" },
    { id: "soil-crop", label: "Soil & Crop Management" },
    { id: "community", label: "Community & Agronomy Tools" }
  ];

  const featuresList = [
    {
      category: "ai",
      title: "AI Disease Vision Scanner",
      badge: "YOLOv10 AI",
      desc: "Instantly detect 150+ crop diseases (Yellow Rust, Late Blight, Wilt, Powdery Mildew) from a single photo with 98.4% diagnostic accuracy and exact chemical/organic dosages.",
      path: "/crop-advisory",
      actionLabel: "Launch Disease AI Doctor",
      tags: ["Image Recognition", "Instant Cure", "Pre-Harvest Interval"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    {
      category: "soil-crop",
      title: "Soil Testing & Zinc Deficiencies",
      badge: "Geo-Remedies",
      desc: "Full 6-parameter soil health index (N, P, K, Zinc, Iron, pH) paired with automated recommendations and live inventory checks at verified nearby fertilizer dealers.",
      path: "/crop-advisory",
      actionLabel: "Inspect Soil Parameters",
      tags: ["Soil Score 0-100", "Dealer Stock", "Zinc Sulphate"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      category: "soil-crop",
      title: "Crop Lifecycle & NDVI Roadmap",
      badge: "Sentinel-2",
      desc: "Track every milestone from seedbed sowing and crown root initiation to harvesting. Live NDVI vegetation indices and soil moisture graphs predict your exact harvest yield.",
      path: "/crop-advisory",
      actionLabel: "View Growth Milestones",
      tags: ["Milestone Tracker", "Moisture Analytics", "Photo Verification"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      )
    },
    {
      category: "ai",
      title: "Weather Radar & Spray Windows",
      badge: "High Precision",
      desc: "Hyper-local forecast with agronomist spray windows (e.g., 7–9 AM before evening humidity rises), unseasonal rain warnings, and flood/frost alerts.",
      path: "/weather",
      actionLabel: "Open Weather Radar",
      tags: ["Live Radar", "Spray Suitability", "5-Day Forecast"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      category: "market",
      title: "Live APMC Mandi Rates & Trends",
      badge: "Agmarknet API",
      desc: "Real-time daily mandi rates for Wheat, Mustard, Potato, Onion, Soybean, Tomato, and Cotton across 250+ APMC mandals with price movement trendlines (+₹75/qtl).",
      path: "/market-prices",
      actionLabel: "Explore Mandi Rates",
      tags: ["250+ Mandis", "Price Arbitrage", "Trend Alerts"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      )
    },
    {
      category: "market",
      title: "Sell Produce with AI Auto-Fill",
      badge: "Live Buyer Bids",
      desc: "List your harvest in one tap. AI pulls your farm's acreage, yield history, and pesticide-free status. Receive verified bids from traders with instant accept/decline.",
      path: "/market-prices",
      actionLabel: "List Harvest Lot",
      tags: ["AI Listing", "Trader Bidding", "Escrow Safe"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    },
    {
      category: "market",
      title: "Machinery, Tractor & Drone Rental",
      badge: "Verified Pilots",
      desc: "Hire 35HP tractors, combine harvesters, 5HP solar pumps, and DJI Agras T40 spraying drones with trained pilots by the acre or hour directly to your field gate.",
      path: "/market-prices",
      actionLabel: "Explore Equipment Hub",
      tags: ["Drone Spray", "Tractor Hire", "Solar Pumps"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 0h-4.5m4.5 0v3.75m-4.5 0H5.25A2.25 2.25 0 003 9.75v4.5" />
        </svg>
      )
    },
    {
      category: "market",
      title: "Mandi Logistics & Transport",
      badge: "Farm to Mandi",
      desc: "Book local Bolero pickups (1.5T @ ₹15/km), tractor trolleys (5T), or Tata 407 trucks with real-time GPS load tracking from your field straight to the Mandi auction yard.",
      path: "/market-prices",
      actionLabel: "Book Farm-Gate Transport",
      tags: ["GPS Tracking", "Fixed Rates", "Verified Drivers"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25" />
        </svg>
      )
    },
    {
      category: "schemes",
      title: "Government Scheme Eligibility Finder",
      badge: "16+ Schemes",
      desc: "Instant eligibility estimator for Central & State agriculture schemes including PM-KUSUM 60% solar grants, SMAM 50% farm mechanization, and PMFBY crop insurance.",
      path: "/government-schemes",
      actionLabel: "Check Scheme Eligibility",
      tags: ["Eligibility Check", "Document Checklist", "Official Links"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A48.414 48.414 0 0012 9.75c-2.551 0-5.056.2-7.5.583V21m15 0H3m18 0h.75M3 21h-.75" />
        </svg>
      )
    },
    {
      category: "schemes",
      title: "ICAR Package of Practices (PoP)",
      badge: "ICAR Standards",
      desc: "Official cultivation guidelines for 26+ crops with season-wise sowing calendars, regional seed varieties, water requirements, and integrated pest management.",
      path: "/crop-advisory",
      actionLabel: "Browse 26+ Crop Protocols",
      tags: ["26+ Crops", "ICAR Validated", "Sowing Calendars"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      category: "schemes",
      title: "PM-KUSUM & SMAM Subsidy Guide",
      badge: "Up to 60% Subsidy",
      desc: "Comprehensive application guidance for solar water pumps (PM-KUSUM Component B) and farm machinery subsidies (SMAM) with step-by-step document requirements.",
      path: "/government-schemes",
      actionLabel: "View Subsidy Guidelines",
      tags: ["Solar Pump Grant", "Farm Machinery", "Application Steps"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      category: "ai",
      title: "Multilingual Mitra AI (8 Dialects)",
      badge: "Voice & Speech AI",
      desc: "Talk to Mitra naturally in Hindi, Punjabi, Tamil, Telugu, Bengali, Gujarati, Marathi, or English. Tap the floating mic to ask crop queries without typing complex terms.",
      path: "/crop-advisory",
      actionLabel: "Try Mitra Voice AI",
      isVoice: true,
      tags: ["Voice Assistant", "8 Languages", "Regional Dialects"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 01-3-3V4.5a3 3 0 116 0v7.5a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      category: "community",
      title: "Social Agri-Community & Video Hub",
      badge: "Farmer Stories",
      desc: "Share Instagram-style crop stories, broadcast updates to regional channel groups (e.g. Meerut Wheat 1.2k), and get peer-reviewed answers from verified agronomists.",
      path: "/blog",
      actionLabel: "Visit Farmer Hub",
      tags: ["Story Creator", "Group Broadcasts", "Q&A Forum"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      category: "community",
      title: "Fertilizer NPK Split-Dose Calculator",
      badge: "Agronomy Model",
      desc: "Calculate exact split-doses of Urea (46% N), DAP (18-46-0), and MOP for target yields across Acres, Hectares, or Bighas to prevent over-fertilization and save 25% on costs.",
      path: "/crop-advisory",
      actionLabel: "Calculate NPK Dosage",
      tags: ["Split Schedule", "Bag Counter", "Cost Optimizer"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    },
    {
      category: "soil-crop",
      title: "Interactive Crop Calendar & Tasks",
      badge: "Dynamic Schedule",
      desc: "Month, week, and day views with color-coded irrigation windows, fertilizer split dates, and weed control reminders with hourly task timeline slots.",
      path: "/crop-advisory",
      actionLabel: "Open Crop Calendar",
      tags: ["Month/Week/Day", "Hourly Slots", "Task Reminders"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
        </svg>
      )
    },
    {
      category: "community",
      title: "Agronomy Advisory Library & Encyclopedia",
      badge: "ICAR Knowledge Base",
      desc: "Searchable database covering 100+ Indian cash and cereal crops, pest visual dictionaries, biopesticide preparation methods, and seasonal sowing guides.",
      path: "/blog",
      actionLabel: "Browse Knowledge Base",
      tags: ["Pest Dictionary", "100+ Crops", "Organic Recipes"],
      icon: (
        <svg className="w-8 h-8 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    }
  ];

  const filteredFeatures = activeCategory === "all" 
    ? featuresList 
    : featuresList.filter(f => f.category === activeCategory);

  return (
    <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[96rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-tight mb-3"
          >
            Comprehensive Smart Farming Suite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-gray-700 text-base sm:text-lg leading-relaxed"
          >
            Every tool is engineered with localized Indian agronomy rules, satellite telemetry, and direct mandi trading &amp; government schemes integration.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#123C26] text-white shadow-md shadow-emerald-950/20"
                  : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-[#123C26]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* 16-Card Grid with Staggered Viewport Reveal */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.08 }}
                className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  {/* Top Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-105 transition-all">
                      {feature.icon}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 group-hover:bg-emerald-100 group-hover:text-emerald-900 text-gray-700 text-xs font-bold rounded-full font-mono uppercase tracking-wider transition-colors">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 group-hover:text-[#123C26] transition-colors mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed mb-5">
                    {feature.desc}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 mb-4">
                    {feature.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs bg-gray-50 text-gray-600 font-semibold px-2.5 py-1 rounded-lg border border-gray-200/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link Action */}
                  {feature.isVoice ? (
                    <button
                      type="button"
                      onClick={() => showVoiceToast("Listening in Hindi, Punjabi, Tamil, Telugu, and English... Speak your agricultural query.", "Mitra Multilingual Voice Assistant")}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#2C8C44] group-hover:text-[#123C26] hover:underline cursor-pointer"
                    >
                      <span>{feature.actionLabel}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={feature.path}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#2C8C44] group-hover:text-[#123C26] hover:underline"
                    >
                      <span>{feature.actionLabel}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}


