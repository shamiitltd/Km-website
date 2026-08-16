import React from 'react';

export default function ContactMap() {

  const mapUrl = "https://maps.google.com/maps?q=D-29,%20Sector%2063,%20Noida,%20Uttar%20Pradesh%20-%20201301&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=D-29,+Sector+63,+Noida,+Uttar+Pradesh+201301";

  return (
    <section className="w-full pb-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-[#FAFCFA] flex justify-center">
      <div className="max-w-[85rem] w-full flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Side: Real Map */}
        <div className="w-full lg:w-[65%] min-h-[350px] lg:min-h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-sm border border-gray-100">
          
          {/* Iframe for Google Map */}
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Kisan Mitra Office Location"
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>

          {/* Floating Address Overlay (Centered) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-4 z-10 w-[90%] sm:w-auto pointer-events-none">
            <div className="w-10 h-10 bg-[#123C26] rounded-full flex items-center justify-center shrink-0">
               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
               </svg>
            </div>
            <div>
              <h4 className="text-[#123C26] font-bold text-[15px] mb-0.5">SHAMIIT LLP</h4>
              <p className="text-gray-600 text-[13px] leading-tight">
                D-29, Sector 63, Noida,<br/>
                Uttar Pradesh - 201301
              </p>
            </div>
          </div>
          
        </div>

        {/* Right Side: Visit Us Card */}
        <div className="w-full lg:w-[35%] bg-[#F4FAF5] rounded-3xl p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between border border-[#EBF5EE] shadow-sm min-h-[350px] lg:min-h-[400px]">
          
          <div className="relative z-10">
            <h2 className="text-[#123C26] text-[28px] font-bold mb-4">Visit Us</h2>
            <p className="text-gray-800 font-medium text-[16px] mb-3">
              We'd love to meet you!
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-[250px]">
              Schedule a visit to our office and explore how Kisan Mitra can transform your farming.
            </p>
            
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#123C26] hover:bg-[#0F392B] text-white font-bold text-[15px] py-3.5 px-6 rounded-xl transition-colors shadow-md"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Building Illustration (Using SVG for immediate rendering) */}
          <div className="absolute bottom-0 right-0 w-48 h-auto pointer-events-none opacity-90">
             <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Ground / bushes */}
               <path d="M20 140 C 30 120, 50 120, 60 140 Z" fill="#84C077"/>
               <path d="M140 140 C 150 120, 170 120, 180 140 Z" fill="#84C077"/>
               <path d="M0 140 H 200 V 150 H 0 V 140 Z" fill="#2C3A47"/>
               {/* Main Building */}
               <rect x="40" y="50" width="120" height="90" fill="#E8F1F2" />
               <rect x="85" y="30" width="30" height="110" fill="#B3D4D6" />
               {/* Windows */}
               <rect x="55" y="65" width="15" height="15" fill="#5E9698" opacity="0.6" />
               <rect x="55" y="95" width="15" height="15" fill="#5E9698" opacity="0.6" />
               <rect x="130" y="65" width="15" height="15" fill="#5E9698" opacity="0.6" />
               <rect x="130" y="95" width="15" height="15" fill="#5E9698" opacity="0.6" />
               <rect x="92" y="45" width="16" height="20" fill="#E8F1F2" />
               <rect x="92" y="75" width="16" height="20" fill="#E8F1F2" />
               {/* Door */}
               <rect x="90" y="115" width="20" height="25" fill="#5E9698" />
               {/* Trees foreground */}
               <path d="M30 140 C 20 100, 50 100, 45 140 Z" fill="#4B8C40"/>
               <path d="M170 140 C 160 100, 190 100, 185 140 Z" fill="#4B8C40"/>
             </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
