import features_background from "../assets/features_background.png";

export default function FeaturesHero() {
  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-white overflow-hidden">
      {/* 
        Background Image
        Positioned on the right side.
      */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
        {/* Mobile Background */}
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Features Mobile Background"
          className="w-full h-full object-cover lg:hidden opacity-30"
        />
        {/* Desktop Background */}
        <img
          src={features_background}
          alt="Features Hero Background"
          className="hidden lg:block w-full lg:w-[63%] h-full object-cover object-left"
        />
      </div>

      {/* 
        Gradient Overlay
        Aligned perfectly: using via-white ensures it stays solid white until the halfway point of this div,
        which is exactly where the image starts, creating a seamless fade.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent lg:from-white lg:via-white lg:to-transparent z-10 w-full lg:w-[75%]"></div>

      {/* Content Container */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20">
        <div className="max-w-[45rem] pt-16 pb-16">
          <p className="text-[#2C8C44] font-bold text-xs tracking-[0.2em] uppercase mb-5">
            FEATURES
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.15] mb-6">
            Powerful AI Features
            <br />
            <span className="text-[#2C8C44]">for Every Farmer</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-[19px] mb-8 max-w-lg leading-relaxed">
            Kisan Mitra combines advanced AI technology with agriculture
            expertise to deliver smart solutions for every farming need.
          </p>

          <div className="w-12 h-1 bg-[#2C8C44] mb-12 rounded-full"></div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-10 items-center">
            {/* Stat 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <svg
                  className="w-5 h-5 text-[#2C8C44]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                <span className="text-[22px] font-bold text-gray-900 leading-none">
                  50,000+
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Farmers Trust Us
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <svg
                  className="w-5 h-5 text-[#2C8C44]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span className="text-[22px] font-bold text-gray-900 leading-none">
                  250+
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Districts Covered
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <svg
                  className="w-5 h-5 text-[#2C8C44]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8m0 0a8 8 0 0 1 8-8h2v2a8 8 0 0 1-8 8h-2z M12 13a8 8 0 0 0-8-8H2v2a8 8 0 0 0 8 8h2z"
                  />
                </svg>
                <span className="text-[22px] font-bold text-gray-900 leading-none">
                  100+
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Crops Supported
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <svg
                  className="w-5 h-5 text-[#2C8C44]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="text-[22px] font-bold text-gray-900 leading-none">
                  98%
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Farmer Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
