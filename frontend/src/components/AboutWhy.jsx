import React from 'react';

export default function AboutWhy() {
  const reasons = [
    {
      title: "Built for Indian Farmers",
      desc: "Localized in language, needs & conditions.",
      icon: (
        <svg className="w-[22px] h-[22px] text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    },
    {
      title: "AI-Powered Accuracy",
      desc: "Smart recommendations you can trust",
      icon: (
        <svg className="w-[22px] h-[22px] text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      title: "All-in-One Platform",
      desc: "Everything a farmer needs in one app",
      icon: (
        <svg className="w-[22px] h-[22px] text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      title: "Secure & Reliable",
      desc: "Your data is safe with us",
      icon: (
        <svg className="w-[22px] h-[22px] text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      title: "Continuously Improving",
      desc: "We learn, improve and grow with you",
      icon: (
        <svg className="w-[22px] h-[22px] text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-4 px-6 md:px-12 lg:px-24 bg-white mb-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-16">
        <h2 className="text-[26px] md:text-[30px] font-bold text-[#123C26] mb-3 text-center">
          Why Kisan Mitra?
        </h2>
        <div className="w-[45px] h-[3px] bg-[#2C8C44] rounded-full"></div>
      </div>

      <div className="max-w-[95rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-5">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EBF5EE] flex items-center justify-center shrink-0 border border-[#d5eadb] shadow-sm">
                {reason.icon}
              </div>
              <div className="text-left mt-0.5">
                <h3 className="text-[13.5px] font-bold text-gray-900 leading-tight mb-1.5 pr-2">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-[12px] leading-snug">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
