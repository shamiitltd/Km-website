import weather from "../assets/weather.png";
import disease from "../assets/disease.png";
import marketplace from "../assets/marketplace.png";
import lack_of_knowledge from "../assets/lack_of_knowledge.png";
import documentation from "../assets/documentation.png";

export default function ChallengesSolutions() {
  const cards = [
    {
      image: weather,
      title: "Unpredictable Weather",
      challenge: "Unexpected weather changes can damage crops.",
      solution: "AI-powered weather forecasting & smart alerts keep you prepared."
    },
    {
      image: disease,
      title: "Crop Diseases",
      challenge: "Late detection leads to large losses in yield.",
      solution: "AI disease detection through image analysis & expert advice."
    },
    {
      image: marketplace,
      title: "Market Uncertainty",
      challenge: "Farmers don't get fair prices for their produce.",
      solution: "Real-time market prices & trends to sell at the right time."
    },
    {
      image: lack_of_knowledge,
      title: "Lack of Knowledge",
      challenge: "Right information is not always available at the right time.",
      solution: "AI advisory in local language 24/7 in your pocket."
    },
    {
      image: documentation,
      title: "Complex Documentation",
      challenge: "Applying for schemes and loans is complicated.",
      solution: "Easy access to schemes, subsidies & step-by-step help."
    }
  ];

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
      <div className="max-w-9xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#123C26]">
            Challenges in Farming. Our AI Solutions.
          </h2>
          <div className="w-16 h-1 bg-[#2C8C44] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="w-full h-[180px] overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{card.title}</h3>
                <p className="text-gray-600 text-[13px] mb-6 leading-relaxed">{card.challenge}</p>
                
                {/* Solution Box - pushed to bottom */}
                <div className="mt-auto">
                  <p className="text-[#2C8C44] font-bold text-[13px] mb-1">Our Solution:</p>
                  <p className="text-gray-600 text-[13px] leading-relaxed">{card.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
