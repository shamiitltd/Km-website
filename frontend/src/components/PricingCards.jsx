import React, { useState } from 'react';

export default function PricingCards() {
  const [activeTab, setActiveTab] = useState('farmers');

  const plans = [
    {
      name: "Free",
      tagline: "For small & beginner farmers",
      price: "₹0",
      period: "Forever",
      yearly: null,
      desc: "Essential farming tools to get you started.",
      buttonText: "Get Started",
      buttonStyle: "outline-green",
      featuresTitle: "Includes:",
      features: [
        "1 Field Management",
        "Basic Crop Advisory",
        "Weather Updates (5 Days)",
        "Market Prices (Daily)",
        "Disease Identification (5/Month)",
        "Basic Expert Tips",
        "Community Access"
      ],
      footerBadge: {
        text: "Perfect to explore Kisan Mitra and improve your farming."
      }
    },
    {
      name: "Basic",
      tagline: "For growing farmers",
      price: "₹149",
      period: "/month",
      yearly: "₹1,499 /year",
      savings: "Save 16%",
      desc: "More insights for better decisions.",
      buttonText: "Choose Basic",
      buttonStyle: "outline-green",
      featuresTitle: "Everything in Free, plus:",
      features: [
        "5 Fields Management",
        "AI Crop Advisory (Advanced)",
        "Weather Updates (10 Days)",
        "Market Trends & Alerts",
        "Disease Identification (20/Month)",
        "Irrigation Scheduler",
        "Fertilizer Recommendation",
        "Export Reports (PDF)",
        "Priority Community Support"
      ]
    },
    {
      name: "Premium",
      tagline: "For advanced farmers",
      price: "₹299",
      period: "/month",
      yearly: "₹2,999 /year",
      savings: "Save 17%",
      desc: "Advanced AI tools for higher yield & profit.",
      buttonText: "Choose Premium",
      buttonStyle: "solid-green",
      featuresTitle: "Everything in Basic, plus:",
      popular: true,
      features: [
        "Unlimited Fields",
        "AI Advisory Engine (Full Access)",
        "Weather Updates (15 Days)",
        "Real-time Market Alerts",
        "Disease Identification (Unlimited)",
        "Advanced Irrigation Planner",
        "Soil Health Analysis",
        "Profitability Dashboard",
        "Custom Reports",
        "Priority Support (Chat + Call)"
      ]
    },
    {
      name: "Family Plan",
      tagline: "For families & shared farms",
      price: "₹499",
      period: "/month",
      yearly: "₹4,999 /year",
      savings: "Save 17%",
      desc: "Manage more, together.",
      buttonText: "Choose Family Plan",
      buttonStyle: "outline-blue",
      featuresTitle: "Everything in Premium, plus:",
      features: [
        "Up to 5 Users (Family)",
        "Shared Field Access",
        "Role-based Permissions",
        "Family Expense Tracker",
        "Share Reports & Insights",
        "Priority Support (Call)"
      ]
    }
  ];

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA]">
      <div className="max-w-[95rem] mx-auto">
        
        {/* Top Toggle & Subtext */}
        <div className="flex flex-col items-center justify-center mb-10">
          
          <div className="flex items-center bg-white border border-gray-200 rounded-full p-1.5 mb-5 shadow-sm">
            <button 
              onClick={() => setActiveTab('farmers')}
              className={`px-8 cursor-pointer py-2.5 rounded-full text-[16px] font-semibold transition-all ${activeTab === 'farmers' ? 'bg-[#F2F9F3] text-[#2C8C44] border border-[#d5eadb]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Farmers
            </button>
            <button 
              onClick={() => setActiveTab('agri')}
              className={`px-8 cursor-pointer py-2.5 rounded-full text-[16px] font-semibold transition-all ${activeTab === 'agri' ? 'bg-[#F2F9F3] text-[#2C8C44] border border-[#d5eadb]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Agri Businesses
            </button>
          </div>

          <p className="text-gray-600 text-[16px] font-medium flex items-center gap-2">
            All plans are in INR (₹) 
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> 
            Save up to 20% with yearly plans
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white rounded-2xl flex flex-col h-full border ${plan.popular ? 'border-[#2C8C44] shadow-xl xl:scale-105 xl:z-10 -mt-2' : 'border-gray-200 shadow-sm'} overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="bg-[#123C26] text-white text-[14px] font-bold text-center py-2 w-full flex items-center justify-center gap-1.5 absolute top-0 left-0 right-0 z-10">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
                  </svg>
                  Most Popular
                </div>
              )}

              <div className={`p-6 xl:p-8 flex flex-col flex-grow ${plan.popular ? 'pt-12 xl:pt-14' : ''}`}>
                
                {/* Header Info */}
                <h3 className={`text-[24px] font-bold mb-1 ${plan.name === 'Family Plan' ? 'text-[#1d5b94]' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-[15px] mb-6 min-h-[22px]">{plan.tagline}</p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[42px] font-extrabold text-gray-900 leading-none tracking-tight">{plan.price}</span>
                  {plan.period !== 'Forever' && <span className="text-gray-500 text-[16px] font-medium pb-1.5">{plan.period}</span>}
                </div>

                {/* Yearly Price / Savings */}
                <div className="h-[28px] flex items-center gap-2 mb-4">
                  {plan.period === 'Forever' ? (
                    <span className="text-gray-600 text-[16px] font-medium">Forever</span>
                  ) : (
                    <>
                      <span className="text-gray-600 text-[16px] font-medium">{plan.yearly}</span>
                      {plan.savings && (
                        <span className="text-[#2C8C44] bg-[#EBF5EE] px-2.5 py-1 rounded text-[13px] font-bold flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                          </svg>
                          {plan.savings}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="text-gray-600 text-[16px] mb-8 min-h-[48px] leading-relaxed">
                  {plan.desc}
                </p>

                {/* Call to Action Button */}
                <button className={`w-full cursor-pointer py-3 rounded-xl font-bold text-[17px] transition-colors mb-8 shadow-sm
                  ${plan.buttonStyle === 'outline-green' ? 'border-2 border-[#2C8C44] text-[#2C8C44] hover:bg-[#F2F9F3]' : ''}
                  ${plan.buttonStyle === 'solid-green' ? 'bg-[#123C26] text-white hover:bg-[#0F392B] border-2 border-[#123C26] shadow-md' : ''}
                  ${plan.buttonStyle === 'outline-blue' ? 'border-2 border-[#1d5b94] text-[#1d5b94] hover:bg-blue-50' : ''}
                `}>
                  {plan.buttonText}
                </button>

                {/* Features List */}
                <div className="flex-grow">
                  <h4 className="text-[15px] font-bold text-gray-900 mb-4">{plan.featuresTitle}</h4>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-[15px] text-gray-700">
                        <svg className="w-5 h-5 text-[#2C8C44] mt-[2px] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Footer Badge */}
                {plan.footerBadge && (
                  <div className="mt-8 bg-[#F5FAF6] rounded-xl p-4 flex items-start gap-3 border border-[#d5eadb]">
                    <svg className="w-6 h-6 text-[#2C8C44] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12.983 2.127C12.35 2.052 11.667 2 11 2c-5.523 0-10 4.477-10 10 0 2.228.729 4.288 1.954 5.938L2 22l4.062-.954A9.957 9.957 0 0011 22c5.523 0 10-4.477 10-10 0-2.858-1.2-5.44-3.125-7.27l-4.892-2.603z" opacity="0.2"/>
                       <path d="M11 2c5.523 0 10 4.477 10 10 0 2.858-1.2 5.44-3.125 7.27l-.608-2.604a4 4 0 00-2.585-2.906L11 12V2zm0 20c-5.523 0-10-4.477-10-10 0-2.228.729-4.288 1.954-5.938l1.644 1.643a6.002 6.002 0 007.478 8.79l1.644 1.645A9.957 9.957 0 0111 22zm-3-8a3 3 0 110-6 3 3 0 010 6z" />
                    </svg>
                    <p className="text-[#2C8C44] text-[14px] font-medium leading-snug">
                      {plan.footerBadge.text}
                    </p>
                  </div>
                )}
                
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-[#F9FBF9] border border-[#EBF5EE] rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
          
          {/* Trial Info */}
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#123C26] rounded-xl flex items-center justify-center shrink-0">
               <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
               </svg>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold text-[17px] mb-1">7-Day Free Trial on Paid Plans</h4>
              <p className="text-gray-600 text-[15px] leading-snug">Try all Premium features risk-free for 7 days.<br/>Cancel anytime.</p>
            </div>
          </div>

          {/* Payments Info */}
          <div className="flex flex-col items-center">
            <h4 className="text-gray-800 font-bold text-[18px] mb-4">Secure Payments</h4>
            <div className="flex items-center gap-3.5">
              {/* Payment Icons Placholders (styled text/shapes since SVGs for logos are complex) */}
              <div className="h-8 px-3 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-[#0a2f5b] text-[18px] font-extrabold italic">UPI</span>
              </div>
              <div className="h-8 px-3 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-[#1A1F71] text-[18px] font-extrabold italic">VISA</span>
              </div>
              <div className="h-8 px-3 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm gap-[-2px]">
                 <div className="w-4 h-4 bg-[#EB001B] rounded-full mix-blend-multiply opacity-90"></div>
                 <div className="w-4 h-4 bg-[#F79E1B] rounded-full mix-blend-multiply opacity-90 -ml-1"></div>
              </div>
              <div className="h-8 px-3 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-[#038373] text-[18px] font-bold">RuPay</span>
              </div>
            </div>
          </div>

          {/* Guarantee Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
               <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold text-[16px] leading-tight">100% Satisfaction<br/>Guaranteed</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
