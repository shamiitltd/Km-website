import React from "react";
import ai_engine from "../assets/ai_engine.png";

export default function FiveStepProcess() {
  const steps = [
    {
      title: "Download & Sign Up",
      desc: "Download the Kisan Mitra app and create your profile in just a minute.",
      icon: (
        <svg
          className="w-14 h-14 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM8.25 18.75a3.75 3.75 0 117.5 0"
          />
        </svg>
      ),
    },
    {
      title: "Add Farm Details",
      desc: "Enter your farm location, soil type, crops, and current farming details.",
      icon: (
        <svg
          className="w-14 h-14 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Zm0 0H6.75"
          />
        </svg>
      ),
    },
    {
      title: "AI Analyzes Data",
      desc: "Our AI engine analyzes data from multiple sources to generate smart insights.",
      icon: (
        <svg
          className="w-14 h-14 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Get Recommendations",
      desc: "Receive personalized advice on crops, irrigation, fertilizers, and more.",
      icon: (
        <svg
          className="w-14 h-14 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      ),
    },
    {
      title: "Take Action & Grow",
      desc: "Implement suggestions, track results and increase your yield and profit.",
      icon: (
        <svg
          className="w-14 h-14 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
    },
  ];

  const dataSources = [
    {
      title: "Satellite Imagery",
      desc: "Real-time field monitoring",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      ),
    },
    {
      title: "Weather Stations",
      desc: "Live weather & forecast updates",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
      ),
    },
    {
      title: "Government Data",
      desc: "Schemes, subsidies & alerts",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21V3m-5.25 7.5h10.5M3.375 21h17.25M6 21v-6.75M18 21v-6.75"
          />
        </svg>
      ),
    },
    {
      title: "Market Sources",
      desc: "Live prices & market trends",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v7.5m-12 0v-5.25m0 0a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v5.25m-6 0v-3a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v3"
          />
        </svg>
      ),
    },
    {
      title: "Research & Experts",
      desc: "Agricultural research & knowledge",
      icon: (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
  ];

  const smartInsights = [
    {
      title: "Crop Advisory",
      desc: "Best crop for your soil & season",
      icon: (
        <svg
          className="w-5 h-5 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8m0 0a8 8 0 0 1 8-8h2v2a8 8 0 0 1-8 8h-2z M12 13a8 8 0 0 0-8-8H2v2a8 8 0 0 0 8 8h2z"
          />
        </svg>
      ),
    },
    {
      title: "Disease Alerts",
      desc: "Early detection & prevention",
      icon: (
        <svg
          className="w-5 h-5 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
    {
      title: "Irrigation Advice",
      desc: "When & how much to irrigate",
      icon: (
        <svg
          className="w-5 h-5 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.5C12 2.5 6.5 7.5 6.5 12A5.5 5.5 0 0 0 17.5 12C17.5 7.5 12 2.5 12 2.5z"
          />
        </svg>
      ),
    },
    {
      title: "Fertilizer Recommendation",
      desc: "Right fertilizer at the right time",
      icon: (
        <svg
          className="w-5 h-5 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
    {
      title: "Profit & Market Insights",
      desc: "Sell at the right time, get more profit",
      icon: (
        <svg
          className="w-5 h-5 text-[#2C8C44]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-10xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#123C26] mb-3">
            Our Simple 5-Step Process
          </h2>
          <p className="text-gray-500 text-[15px] md:text-[17px]">
            From data to better decisions in just a few taps
          </p>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-2 relative w-full px-0 lg:px-8">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Step Card */}
              <div className="flex flex-col items-center text-center w-[220px]">
                {/* Visual Circle Area */}
                <div className="relative mb-6">
                  {/* Outer circle border */}
                  <div className="w-[140px] h-[140px] rounded-full border border-gray-100 shadow-sm bg-white flex items-center justify-center relative z-10">
                    {step.icon}
                  </div>

                  {/* Step Number Badge positioned top center */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#123C26] text-white font-bold flex items-center justify-center text-[15px] z-20 shadow-md">
                    {idx + 1}
                  </div>
                </div>

                {/* Step Text Area */}
                <h3 className="font-bold text-gray-900 text-[16px] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Chevron Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center text-gray-400 mb-20">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* New AI Engine / Data flow section */}
        <div className="mt-4 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
          {/* Left Panel: Real-Time Data */}
          <div className="bg-white  border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full lg:w-[32%]">
            <h3 className="text-[21px] font-bold text-[#123C26] mb-2">
              Powered by Real-Time Data
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
              We collect information from multiple trusted sources to give you
              accurate and timely insights.
            </p>

            <div className="space-y-5">
              {dataSources.map((source, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-[#F2F9F3] p-2.5 rounded-xl flex-shrink-0">
                    {source.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">
                      {source.title}
                    </h4>
                    <p className="text-gray-500 text-[12px] mt-0.5">
                      {source.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Graphic & Arrows */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full lg:w-[32%]">
            <div className="hidden lg:block text-[#2C8C44]">
              <svg
                className="w-14 h-14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>

            {/* The AI Engine Image provided by user */}
            <div className="w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] flex items-center justify-center">
              <img
                src={ai_engine}
                alt="AI Engine Diagram"
                className="w-full h-full object-contain"
                id="ai-engine-img"
              />
            </div>

            <div className="hidden lg:block text-[#2C8C44]">
              <svg
                className="w-14 h-14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>

          {/* Right Panel: Smart Insights */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full lg:w-[32%]">
            <h3 className="text-[21px] font-bold text-[#123C26] mb-2">
              Smart Insights for You
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
              AI processes the data and provides easy to understand
              recommendations.
            </p>

            <div className="space-y-5">
              {smartInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-[#F2F9F3] p-2.5 rounded-xl flex-shrink-0">
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">
                      {insight.title}
                    </h4>
                    <p className="text-gray-500 text-[12px] mt-0.5">
                      {insight.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
