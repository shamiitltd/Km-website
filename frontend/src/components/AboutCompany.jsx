import React from 'react';
import logo from "../assets/logo.png"
import shamiit from "../assets/shamiit.png"

export default function AboutCompany() {
  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[95rem] mx-auto bg-white border border-gray-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 md:p-12 flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-0">
        
        {/* Left Side: Logos */}
        <div className="w-full lg:w-[35%] flex flex-col items-center lg:border-r lg:border-gray-200 pr-0 lg:pr-12">
          
          {/* Logo 1 Placeholder */}
          <div className="flex flex-col items-start">
            <img 
              src={logo} 
              alt="Kisan Mitra Logo" 
              className="w-48 md:w-56 lg:w-[320px] object-contain"
            />
          </div>
          
          {/* Logo 2 Placeholder */}
          <div className="flex flex-col relative top-[-30px] items-start">
             <p className="text-gray-500 font-medium text-[21px] relative z-10 top-[45px] left-[50px] tracking-wide">A Product of</p>
            <img 
              src={shamiit}
              alt="SHAMIIT LLP Logo" 
              className="w-48 md:w-56 lg:w-[300px] lg:h-[145px] object-contain"
            />
          </div>

        </div>

        {/* Right Side: Text & Info */}
        <div className="w-full lg:w-[65%] pl-0 lg:pl-12 flex flex-col justify-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-gray-900 mb-4">
            Proudly a Product of <span className="text-[#2C8C44]">SHAMIIT LLP</span>
          </h2>
          
          <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-3xl">
            Kisan Mitra is proudly developed and owned by SHAMIIT LLP (Shami Innovation and Technologies LLP), a registered company committed to using technology and innovation to solve real-world problems in agriculture and create a positive impact.
          </p>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
            
            {/* Info 1 */}
            <div className="flex items-start gap-3">
              <div className="bg-[#F2F9F3] p-1.5 rounded-lg shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Company Registered</p>
                <p className="text-[13px] text-gray-900 font-bold">06 Dec 2022</p>
              </div>
            </div>

            {/* Info 2 */}
            <div className="flex items-start gap-3">
              <div className="bg-[#F2F9F3] p-1.5 rounded-lg shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Startup Recognized by</p>
                <p className="text-[13px] text-gray-900 font-bold">DPIIT, Govt. of India</p>
              </div>
            </div>

            {/* Info 3 */}
            <div className="flex items-start gap-3">
              <div className="bg-[#F2F9F3] p-1.5 rounded-lg shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Focus Area</p>
                <p className="text-[13px] text-gray-900 font-bold">AgriTech • AI • Innovation</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
