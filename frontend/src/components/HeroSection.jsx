import heroBg from "../assets/hero.png";

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 lg:py-0 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center lg:h-[calc(100vh-4.75rem)] min-h-[600px] lg:max-h-[750px] bg-[#FAFCFA]">
      {/* Background Image for Mobile (Simple Farm) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-[center_bottom] bg-no-repeat lg:hidden opacity-30"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` }}
      ></div>

      {/* Background Image for Desktop (Original Hero) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-[center_15%] bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between mt-0">
        
        {/* Left Content Area - Wrapped with a localized gradient glow */}
        <div className="w-full lg:w-[55%] mb-12 lg:mb-0 relative">
          
          {/* 2026 Technique: Localized soft backdrop glow exactly conforming to the text boundaries */}
          <div className="absolute -inset-y-12 -inset-x-12 md:-inset-x-24 z-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent lg:from-white lg:via-white/85 lg:to-transparent blur-2xl opacity-95"></div>

          <div className="relative z-10 pr-0 lg:pr-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              Your <span className="text-[#2C8C44]">AI-Powered</span>
              <br />
              Farming Companion
            </h1>

            <p className="text-gray-800 font-medium text-lg mb-8 max-w-xl">
              Kisan Mitra uses the power of Artificial Intelligence to help
              farmers make smarter decisions, increase productivity and improve
              income.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 mb-10">
              {[
                "Smart Crop Advisory",
                "Real-time Weather Alerts",
                "AI Disease Detection",
                "Market Price & Insights",
                "Personalized Recommendations",
                "Government Schemes",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-[#2C8C44] rounded-full p-1 flex-shrink-0 shadow-md">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-900 font-bold text-[15px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto flex items-center cursor-pointer justify-center space-x-2 bg-[#123C26] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#0d2a1a] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                <span>Download App</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
              <button className="w-full sm:w-auto flex items-center cursor-pointer justify-center space-x-2 bg-white text-[#123C26] border-2 border-[#2C8C44]/20 px-8 py-3.5 rounded-lg font-bold hover:border-[#2C8C44] hover:bg-gray-50 transition-all shadow-md hover:shadow-lg">
                <svg
                  className="w-5 h-5 text-[#2C8C44]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area (Image is now in background, keeping the Trusted Badge) */}
        <div className="w-full lg:w-[50%] relative flex justify-center lg:justify-start items-center lg:h-full lg:min-h-[300px] mt-8 lg:mt-0">
          {/* Trusted Badge (Floating on desktop, relative on mobile) */}
          <div className="relative lg:absolute lg:bottom-[10%] lg:-left-20 z-30 bg-[#123C26]/85 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-[#2C8C44]/30 hover:scale-105 transition-transform cursor-pointer">
            <div className="text-white">
              <p className="text-xs text-gray-300">Trusted by</p>
              <p className="font-bold text-sm whitespace-nowrap">
                50,000+ Farmers
              </p>
              <p className="text-xs text-gray-300">across India</p>
            </div>
            <div className="flex -space-x-3">
              <img
                className="w-9 h-9 rounded-full border-2 border-[#123C26] bg-gray-300 object-cover"
                src="https://i.pravatar.cc/100?img=11"
                alt="avatar"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-[#123C26] bg-gray-300 object-cover"
                src="https://i.pravatar.cc/100?img=12"
                alt="avatar"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-[#123C26] bg-gray-300 object-cover"
                src="https://i.pravatar.cc/100?img=13"
                alt="avatar"
              />
              <div className="w-9 h-9 rounded-full border-2 border-[#123C26] bg-[#2C8C44] text-white flex items-center justify-center text-sm font-bold z-10 shadow-inner">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
