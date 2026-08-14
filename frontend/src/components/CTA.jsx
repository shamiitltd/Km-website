import cta_background from "../assets/cta_background.png";

export default function CTA() {
  return (
    <section className="relative w-full h-[320px] md:h-[360px] flex items-center bg-[#123C26] overflow-hidden">
      
      <img 
        src={cta_background}
        alt="Join the Revolution" 
        className="absolute inset-0 w-full h-full object-fill object-center z-0" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a1b]/95 md:from-[#0d2a1b]/90 via-[#0d2a1b]/60 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-5 drop-shadow-md">
            Join the Smart Farming Revolution Today!
          </h2>
          
          <p className="text-gray-200 text-[16px] md:text-lg mb-8 max-w-xl leading-relaxed drop-shadow-md">
            Download Kisan Mitra and start your journey towards better farming and higher income.
          </p>
          
          <button className="bg-[#C5E344] cursor-pointer text-[#123C26] font-bold py-3.5 px-7 rounded-lg hover:bg-[#b5d23c] hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
            Download Kisan Mitra App
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}