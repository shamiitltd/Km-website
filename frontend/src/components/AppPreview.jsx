export default function AppPreview() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-[45%] mb-16 lg:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#123C26] leading-tight mb-6">
            Kisan Mitra App –<br />
            Smart Farming in Your Pocket
          </h2>
          <p className="text-gray-600 text-[17px] md:text-[19px] mb-10 leading-relaxed max-w-xl">
            From soil health to market price, from weather alerts to government schemes - everything you need for successful farming.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg cursor-pointer">
              <svg viewBox="0 0 512 512" className="w-7 h-7 fill-current">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase leading-none font-semibold mb-1 tracking-wider text-gray-300">GET IT ON</div>
                <div className="text-lg font-bold leading-none">Google Play</div>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg cursor-pointer">
              <svg viewBox="0 0 384 512" className="w-8 h-8 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] leading-none mb-1 text-gray-300">Download on the</div>
                <div className="text-lg font-bold leading-none">App Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Content Area (Phones Layout) */}
        <div className="hidden lg:flex w-full lg:w-[50%] items-center justify-center mt-12 lg:mt-0">
          <div className="relative flex items-center justify-center w-full">
            {/* Replace the src attributes with your actual images when ready */}
            <img src="https://placehold.co/300x600/f8fafc/94a3b8?text=Phone+1" alt="Crop Advisory" className="w-[22%] -mr-[5%] z-10 mt-12 drop-shadow-xl rounded-[1rem] md:rounded-[2rem] border-4 border-gray-100 object-cover" />
            <img src="https://placehold.co/300x600/f8fafc/94a3b8?text=Phone+2" alt="Soil Health" className="w-[28%] z-30 transform scale-110 drop-shadow-2xl rounded-[1.25rem] md:rounded-[2.5rem] border-4 border-white object-cover" />
            <img src="https://placehold.co/300x600/f8fafc/94a3b8?text=Phone+3" alt="Market Prices" className="w-[22%] -ml-[5%] z-20 mt-6 drop-shadow-xl rounded-[1rem] md:rounded-[2rem] border-4 border-gray-100 object-cover" />
            <img src="https://placehold.co/300x600/f8fafc/94a3b8?text=Phone+4" alt="Schemes" className="w-[20%] -ml-[4%] z-10 mt-16 drop-shadow-lg rounded-[1rem] md:rounded-[1.5rem] border-4 border-gray-100 object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}