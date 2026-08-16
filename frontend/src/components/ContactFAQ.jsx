import React, { useState } from 'react';

export default function ContactFAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const faqs = [
    {
      id: 1,
      question: "How can Kisan Mitra help me?",
      answer: "Kisan Mitra provides AI-driven crop advisory, real-time weather forecasts, and disease identification to help you maximize your yield and increase your income. Our tools are tailored specifically for the Indian agricultural landscape.",
      icon: (
         <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
         </svg>
      )
    },
    {
      id: 2,
      question: "How do I get technical support?",
      answer: "You can reach out to our dedicated support team via the contact form above, or by calling our toll-free number. We also offer in-app chat support during working hours to quickly resolve any technical issues you might face.",
      icon: (
         <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
           {/* Custom Headset Icon */}
           <path strokeLinecap="round" strokeLinejoin="round" d="M3 14c0-5.5 4.5-10 10-10s10 4.5 10 10v4a2 2 0 01-2 2h-2v-8h4m-14 6H5a2 2 0 01-2-2v-4m10 6v2" />
         </svg>
      )
    },
    {
      id: 3,
      question: "Is Kisan Mitra free for farmers?",
      answer: "Yes, we offer a Free plan with essential features like basic crop advisory and a 5-day weather forecast. For advanced tools like disease identification and irrigation scheduling, we offer affordable premium plans.",
      icon: (
         <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a4.5 4.5 0 004.5-4.5V6H12a4.5 4.5 0 00-4.5 4.5v2.5M12 13a4.5 4.5 0 01-4.5 4.5h-2.5V15a4.5 4.5 0 014.5-4.5" />
         </svg>
      )
    },
    {
      id: 4,
      question: "How can I partner with Kisan Mitra?",
      answer: "We are always looking to collaborate with NGOs, agri-businesses, and government bodies. Please use the contact form to send us your partnership ideas, and our team will get in touch to discuss potential synergies.",
      icon: (
         <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
         </svg>
      )
    }
  ];

  return (
    <section className="w-full pb-6 px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA] flex justify-center">
      <div className="max-w-[85rem] w-full">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <h2 className="text-[#123C26] text-3xl md:text-[32px] font-bold mb-2">Common Questions</h2>
          <div className="w-10 h-[3px] bg-[#2C8C44] rounded-full opacity-70"></div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-12">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden ${openId === faq.id ? 'ring-1 ring-[#2C8C44]/30' : ''}`}
            >
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 bg-[#F2F9F3] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#E8F5EA] transition-colors">
                    {faq.icon}
                  </div>
                  <span className="font-bold text-gray-900 text-[15.5px] pr-4">{faq.question}</span>
                </div>
                
                <div className="shrink-0 text-gray-400">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-[#2C8C44]' : 'text-gray-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>
              
              {/* Answer Box (Accordion Body) */}
              <div 
                className={`transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-1 ml-[64px] border-t border-gray-50 text-gray-600 text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center flex items-center justify-center gap-2">
          <span className="text-gray-600 text-[15px]">Still have questions? Check our</span>
          <a href="#" className="text-[#2C8C44] font-bold text-[15px] hover:underline flex items-center gap-1">
            Help Center
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
