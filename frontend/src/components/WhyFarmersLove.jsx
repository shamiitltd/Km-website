import profile_one from "../assets/profile_one.png";
export default function WhyFarmersLove() {
  const benefits = [
    "Easy to use in local language",
    "Accurate & reliable AI recommendations",
    "Saves time, reduces cost",
    "Increases productivity & income",
    "All in one farming companion",
  ];

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[98rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Video Placeholder */}
        <div className="relative w-[95%] lg:col-span-6 h-[280px] lg:h-[360px] rounded-[2rem] overflow-hidden bg-gray-200 group cursor-pointer shadow-sm">
          {/* User can add their video or image thumbnail here */}
          <img
            src="https://placehold.co/800x600/e2e8f0/94a3b8?text=Video+Placeholder"
            alt="Video Placeholder"
            className="w-full h-full object-cover"
          />

          {/* Overlay with Play Button */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center">
            <div className="w-[75px] h-[75px] bg-white rounded-full flex items-center justify-center mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-[#123C26] ml-1.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <p className="text-white font-semibold text-[16px] drop-shadow-md">
              See Kisan Mitra in Action
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-[#F9FBF9] border border-gray-100 rounded-[2rem] p-6 lg:p-8 shadow-sm flex flex-col justify-between lg:col-span-6 w-full">
          <div>
            <h2 className="text-[20px] md:text-[26px] font-bold text-[#123C26] mb-6 lg:mb-8">
              Why Farmers Love Kisan Mitra
            </h2>

            <div className="flex flex-col xl:flex-row gap-8 xl:gap-6 items-start">
              {/* Bullet Points */}
              <ul className="space-y-3.5 xl:space-y-4 flex-1 pr-0 xl:pr-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-[20px] h-[20px] bg-[#2C8C44] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-[13px] md:text-[14px] font-medium leading-snug">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Testimonial Card */}
              <div className="bg-[#EBF5EE] rounded-2xl p-5 lg:p-6 relative w-full xl:w-[320px] shadow-sm mb-4 xl:mb-0">
                <div className="text-[#2C8C44] font-serif text-4xl leading-none absolute top-3 left-5 opacity-40">
                  "
                </div>
                <p className="text-gray-800 text-[13.5px] italic mb-5 leading-relaxed relative z-10 pt-4">
                  Kisan Mitra ne meri kheti ka tarika badal diya. Ab sahi salah
                  milti hai, sahi samay par.
                </p>
                <div className="mb-2">
                  <p className="text-gray-900 font-bold text-[13px]">
                    - Ram Prasad Yadav
                  </p>
                  <p className="text-gray-500 text-[11px]">Kanpur, UP</p>
                </div>

                {/* Overlapping Avatar Placeholder */}
                {/* The user will replace the placeholder URL with their 'profile' image */}
                <div className="absolute -bottom-5 -right-3 w-[70px] h-[70px] rounded-full border-[3px] border-[#F9FBF9] overflow-hidden shadow-md bg-white">
                  <img
                    src={profile_one}
                    alt="Ram Prasad Yadav"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-10 xl:mt-auto">
            <div className="w-2 h-2 rounded-full bg-[#2C8C44]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
