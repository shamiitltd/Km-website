import advanced_tech from '../assets/advanced_tech.png'
export default function AdvancedTechnology() {
  const benefits = [
    "Secure & Private Data",
    "Works Offline",
    "Multi-language Support",
    "Lightweight & Fast"
  ];

  return (
    <section className="w-full py-10 px-6 md:px-10 lg:px-24">
      <div className="max-w-[95rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="max-w-[35rem]">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.2] mb-4">
            Built with Advanced<br />
            <span className="text-[#2C8C44]">Technology</span>
          </h2>
          
          <div className="w-12 h-1 bg-[#2C8C44] mb-8 rounded-full"></div>
          
          <p className="text-gray-600 text-[17px] md:text-[19px] leading-relaxed mb-10">
            Kisan Mitra uses cutting-edge AI and data science to deliver accurate, reliable and actionable insights for farmers.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#2C8C44] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-800 text-[16px] md:text-[17px] font-medium">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image (User will provide this) */}
        <div className="w-full flex justify-center lg:justify-end">
          <img 
            src={advanced_tech}
            alt="Advanced Technology Features" 
            className="w-full max-w-[630px] mr-24 object-contain drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
