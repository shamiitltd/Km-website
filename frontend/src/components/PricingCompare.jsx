import React from 'react';

export default function PricingCompare() {
  const tableData = [
    { label: "Fields Management", free: "1 Field", basic: "5 Fields", premium: "Unlimited", family: "Unlimited" },
    { label: "AI Crop Advisory", free: "Basic", basic: "Advanced", premium: "Full Access", family: "Full Access" },
    { label: "Weather Forecast", free: "5 Days", basic: "10 Days", premium: "15 Days", family: "15 Days" },
    { label: "Disease Identification", free: "5 / Month", basic: "20 / Month", premium: "Unlimited", family: "Unlimited" },
    { label: "Irrigation Scheduler", free: false, basic: true, premium: true, family: true },
    { label: "Soil Health Analysis", free: false, basic: false, premium: true, family: true },
    { label: "Reports (PDF)", free: false, basic: true, premium: true, family: true },
    { label: "Users", free: "1", basic: "1", premium: "1", family: "Up to 5" },
  ];

  const CheckIcon = () => (
    <div className="flex justify-center w-full">
      <svg className="w-5 h-5 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  );

  const DashIcon = () => (
    <div className="flex justify-center w-full text-gray-300 font-bold">
      -
    </div>
  );

  return (
    <section className="w-full py-4 px-6 md:px-12 lg:px-16 xl:px-24 bg-white overflow-hidden">
      <div className="max-w-[95rem] mx-auto">
        <h2 className="text-[#123C26] text-4xl md:text-4xl font-bold text-center mb-10">
          Compare All Plans
        </h2>

        {/* Table Container with horizontal scroll for mobile */}
        <div className="w-full overflow-x-auto pt-5 -mt-5 pb-2 -mb-2 px-1 -mx-1">
          <div className="min-w-[800px] w-full rounded-xl border border-gray-100 shadow-sm relative bg-white">
            {/* Header Row */}
            <div className="grid grid-cols-5 bg-[#FAFCFA] border-b border-gray-200 rounded-t-xl">
              <div className="p-5 font-bold text-gray-900 text-[18px] flex items-center rounded-tl-xl">
                Features
              </div>
              <div className="p-5 font-bold text-gray-900 text-[18px] text-center flex items-center justify-center">
                Free
              </div>
              <div className="p-5 font-bold text-[#2C8C44] text-[18px] text-center flex items-center justify-center">
                Basic
              </div>
              <div className="p-5 bg-[#F2F9F3] relative text-center flex flex-col items-center justify-center">
                {/* Popular Badge */}
                <div className="absolute -top-3 bg-[#123C26] text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md whitespace-nowrap">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
                  </svg>
                  Most Popular
                </div>
                <span className="font-bold text-[#123C26] text-[18px]">Premium</span>
              </div>
              <div className="p-5 font-bold text-[#1d5b94] text-[18px] text-center flex items-center justify-center">
                Family Plan
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col">
              {tableData.map((row, idx) => (
                <div 
                  key={idx} 
                  className="grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-5 text-gray-700 font-medium text-[15px] flex items-center">
                    {row.label}
                  </div>
                  
                  <div className="p-5 text-gray-600 text-[15px] text-center flex items-center justify-center">
                    {typeof row.free === 'boolean' ? (row.free ? <CheckIcon /> : <DashIcon />) : row.free}
                  </div>
                  
                  <div className="p-5 text-gray-600 text-[15px] text-center flex items-center justify-center">
                    {typeof row.basic === 'boolean' ? (row.basic ? <CheckIcon /> : <DashIcon />) : row.basic}
                  </div>
                  
                  <div className="p-5 bg-[#F2F9F3]/40 text-[#2C8C44] text-[15px] font-medium text-center flex items-center justify-center">
                    {typeof row.premium === 'boolean' ? (row.premium ? <CheckIcon /> : <DashIcon />) : row.premium}
                  </div>
                  
                  <div className="p-5 text-gray-600 text-[15px] text-center flex items-center justify-center">
                    {typeof row.family === 'boolean' ? (row.family ? <CheckIcon /> : <DashIcon />) : row.family}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
