export default function Features() {
  const features = [
    {
      title: "AI Crop Advisory",
      description:
        "Get personalized crop recommendations based on soil, weather & location.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
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
      title: "AI Disease Detection",
      description:
        "Detect crop diseases early using AI-powered image recognition.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3 3 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M17.47 9c1.93-.2 3.53-1.9 3.53-3.9M6.53 15H3M17.47 15h3.53M9 22c0-1.8-1.5-3.3-3.3-3.3M15 22c0-1.8 1.5-3.3 3.3-3.3"
          />
        </svg>
      ),
    },
    {
      title: "Weather & Alerts",
      description:
        "Real-time weather updates and smart alerts to protect your crops.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v2m-7.07 2.93 1.41 1.41M20 12h2m-2.93-7.07-1.41 1.41M15.947 12.65a4 4 0 0 0-5.925-4.128M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
          />
        </svg>
      ),
    },
    {
      title: "Market Prices",
      description:
        "Daily market prices, trends & insights to sell at the right time.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v18h18M18 17V12M13 17V8M8 17v-4M21 3l-6 6-4-4-5 5M21 3v4M21 3h-4"
          />
        </svg>
      ),
    },
    {
      title: "Schemes & Subsidies",
      description:
        "Find and apply for the latest government schemes and subsidies easily.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 0 0 0 4h4v-4Z"
          />
        </svg>
      ),
    },
    {
      title: "Farm Management",
      description:
        "Manage your field, expenses, irrigation, and yields in one place.",
      icon: (
        <svg
          className="w-12 h-12 text-[#123C26]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM9 12h6M9 16h6"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-10xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#123C26]">
            Powerful Features for Smart Farming
          </h2>
          <div className="w-16 h-1 bg-[#2C8C44] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
            >
              <div className="mb-5 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-[15px] leading-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
