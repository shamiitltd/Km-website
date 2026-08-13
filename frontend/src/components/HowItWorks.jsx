import farmBg from "../assets/farm_bg.jpg";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Download App",
      description: "Install Kisan Mitra from Play Store or App Store.",
      icon: (
        <svg className="w-12 h-12 text-[#688A36]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-4.2-5.78v-4.5h-1.6v4.5H9l3 3.3 3-3.3h-2.2z" />
        </svg>
      ),
    },
    {
      title: "2. Create Profile",
      description: "Add your farm details, location & crop info.",
      icon: (
        <svg className="w-12 h-12 text-[#688A36]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      title: "3. Get AI Insights",
      description: "Our AI analyzes data and provides best advice.",
      icon: (
        <svg className="w-12 h-12 text-[#688A36]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3a8 8 0 0 1 8 8 8 8 0 0 1-4 6.93V21h-6v-3.07A8 8 0 0 1 3 11a8 8 0 0 1 8-8zm-1 0v18m-5-9h5m-5 4h5m1-8h5m-5 4h5m-5 4h5" />
        </svg>
      ),
    },
    {
      title: "4. Take Action",
      description: "Follow recommendations and improve productivity.",
      icon: (
        <svg className="w-12 h-12 text-[#688A36]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c3.47.5 7.64-.17 11.23-3.08C20 15 21.5 11.5 17 8zM9.5 14c2.5-3 6.5-4 10-4-1.5 3-4 5-8.5 5l-1.5-1z" />
        </svg>
      ),
    },
    {
      title: "5. Increase Profit",
      description: "Maximize yield and increase your income.",
      icon: (
        <svg className="w-12 h-12 text-[#688A36]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3v18h18v-2H5V3H3zm13.59 7.41L12.5 14.5l-4.5-4.5-5 5L4.41 16 8 12.41l4.5 4.5 5.5-5.5V14h2V8h-6v2.41z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-12 px-6 md:px-12 lg:px-24 text-white overflow-hidden border-y border-[#2C8C44]/20">
      
      {/* Farm Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${farmBg})` }}
      ></div>
      
      {/* Deep Green Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#123C26]/95 via-[#123C26]/90 to-[#0A2616]/95 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-10xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-bold">
            How Kisan Mitra Works
          </h2>
          <div className="w-12 h-1 bg-[#2C8C44] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#2C8C44]/40 z-0"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-[#123C26] relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  {step.icon}
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[13px] text-gray-300 leading-relaxed lg:px-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}