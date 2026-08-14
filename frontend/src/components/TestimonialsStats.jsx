import React, { useState, useEffect } from 'react';
import profile_one from "../assets/profile_one.png";
import profile_two from "../assets/profile_two.png";
import profile_three from "../assets/profile_three.png";

const testimonials = [
  {
    id: 1,
    name: "Ram Prasad Yadav",
    location: "Kanpur, UP",
    text: "Kisan Mitra app ne meri farming badal di. Ab mujhe sahi samay par sahi salah milti hai aur meri income badh gayi hai.",
    image: profile_one
  },
  {
    id: 2,
    name: "Suresh Kumar",
    location: "Pune, MH",
    text: "The weather alerts and disease detection features are incredibly accurate. It saved my entire crop last season!",
    image: profile_two
  },
  {
    id: 3,
    name: "Ramesh Patel",
    location: "Ahmedabad, GJ",
    text: "Getting daily market prices right on my phone ensures I never sell my harvest at a loss. A must-have app.",
    image: profile_three
  }
];

export default function TestimonialsStats() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Card - What Farmers Say */}
        <div className="w-full lg:w-1/2 bg-[#F9FAF9] rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-[320px] md:h-[300px]">
          <h3 className="text-xl md:text-2xl font-bold text-[#123C26] mb-8 z-10">What Farmers Say</h3>
          
          <div className="relative flex-grow">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out flex gap-6 ${
                  index === currentIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-12 pointer-events-none z-0'
                }`}
              >
                {/* Farmer Avatar */}
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0" 
                />
                
                {/* Testimonial Content */}
                <div className="flex flex-col justify-start">
                  <div className="flex">
                    <div className="text-4xl text-[#2C8C44] font-serif leading-none mr-2 mt-[-5px]">"</div>
                    <p className="text-gray-700 italic text-[14px] md:text-[15px] mb-4 leading-relaxed font-medium">
                      {testimonial.text}"
                    </p>
                  </div>
                  <p className="text-gray-900 font-bold text-sm">
                    - {testimonial.name}, <span className="font-normal text-gray-600">{testimonial.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 justify-end mt-4 z-10">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  idx === currentIndex ? 'bg-[#123C26]' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Card - Stats */}
        <div className="w-full lg:w-1/2 bg-[#F9FAF9] rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col h-[320px] md:h-[300px]">
          <h3 className="text-xl md:text-2xl font-bold text-[#123C26] mb-8">Kisan Mitra in Numbers</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center my-auto">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <svg className="w-9 h-9 text-[#123C26] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <div className="text-xl font-bold text-gray-900 mb-1">50,000+</div>
              <div className="text-[11px] text-gray-600 font-medium">Happy Farmers</div>
            </div>
            
            {/* Stat 2 */}
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:h-12 md:after:w-px md:after:bg-gray-200 md:after:-left-3 md:after:top-1/2 md:after:-translate-y-1/2">
              <svg className="w-9 h-9 text-[#123C26] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div className="text-xl font-bold text-gray-900 mb-1">250+</div>
              <div className="text-[11px] text-gray-600 font-medium">Districts Covered</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:h-12 md:after:w-px md:after:bg-gray-200 md:after:-left-3 md:after:top-1/2 md:after:-translate-y-1/2">
              <svg className="w-9 h-9 text-[#123C26] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8 8 0 0 1 8-8h2v2a8 8 0 0 1-8 8h-2z M12 13a8 8 0 0 0-8-8H2v2a8 8 0 0 0 8 8h2z" />
              </svg>
              <div className="text-xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-[11px] text-gray-600 font-medium">Crops Supported</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center relative md:after:content-[''] md:after:absolute md:after:h-12 md:after:w-px md:after:bg-gray-200 md:after:-left-3 md:after:top-1/2 md:after:-translate-y-1/2">
              <svg className="w-9 h-9 text-[#123C26] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <div className="text-xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-[11px] text-gray-600 font-medium">Farmer Satisfaction</div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
