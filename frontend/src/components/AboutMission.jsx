import React from 'react';

export default function AboutMission() {
  return (
    <section className="w-full py-6 px-6 md:px-12 lg:px-24 bg-white">
      
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#123C26] mb-3 text-center">
          Our Mission, Vision & Values
        </h2>
        <div className="w-[60px] h-[3px] bg-[#2C8C44] rounded-full"></div>
      </div>

      {/* 3-Column Card */}
      <div className="max-w-[95rem] mx-auto bg-white border border-gray-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0">
          
          {/* Mission */}
          <div className="flex flex-col sm:flex-row items-start gap-5 lg:pr-10 lg:border-r border-gray-100">
             <div className="flex items-center justify-center shrink-0 text-[#2C8C44] mt-1">
                {/* Target/Bullseye Icon */}
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a5 5 0 100-10 5 5 0 000 10z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 13a1 1 0 100-2 1 1 0 000 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l7.5-7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 4.5h4.5V9" />
                </svg>
             </div>
             <div>
                <h3 className="text-[21px] md:text-[24px] font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-[16px] leading-relaxed">
                  To empower every farmer with AI-driven insights, real-time information and smart tools to improve productivity, profitability and sustainability.
                </p>
             </div>
          </div>

          {/* Vision */}
          <div className="flex flex-col sm:flex-row items-start gap-5 lg:px-10 lg:border-r border-gray-100">
             <div className="flex items-center justify-center shrink-0 text-[#2C8C44] mt-1">
                {/* Eye Icon */}
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
             </div>
             <div>
                <h3 className="text-[21px] md:text-[24px] font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 text-[16px] leading-relaxed">
                  To become India's most trusted digital companion for farmers and a global leader in AI-powered agricultural solutions.
                </p>
             </div>
          </div>

          {/* Values */}
          <div className="flex flex-col sm:flex-row items-start gap-5 lg:pl-10">
             <div className="flex items-center justify-center shrink-0 text-[#2C8C44] mt-1">
                {/* Heart & Hands Icon */}
                <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  {/* Heart */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5c-1.5-2-4.5-2-4.5 1 0 2 4.5 5.5 4.5 5.5s4.5-3.5 4.5-5.5c0-3-3-3-4.5-1z" />
                  {/* Hands */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 17.5c-1.5-1-2.5-3-2.5-3s3-1 4.5.5c2 2 3.5 4 4.5 4s2.5-2 4.5-4c1.5-1.5 4.5-.5 4.5-.5s-1 2-2.5 3c-1.5 1-4 3.5-6 3.5s-4.5-2.5-6-3.5z" />
                </svg>
             </div>
             <div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">Our Values</h3>
                <ul className="space-y-1.5">
                  {["Farmer First", "Integrity & Transparency", "Innovation with Purpose", "Impact at Scale"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg className="w-[18px] h-[18px] text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-gray-700 text-[14px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
