import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <nav className="bg-[#123C26] sticky top-0 z-100 text-white px-8 py-4 flex justify-between items-center">
      {/* Logo Area */}
      <div className="font-bold text-xl flex items-center gap-2">
        {/* Icon/Image */}
        <span>KisanMitra</span>
      </div>

      {/* Links Area */}
      <ul className="hidden md:flex space-x-6 text-[1rem] font-semibold">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#80D939]"
                  : "hover:text-[#B0D939] transition-colors"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side: Language & Button */}
      <div className="hidden md:flex items-center space-x-4">
          
          {/* Dropdown Container */}
          <div className="relative">
            {/* The Trigger Button */}
            <span 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-sm border-gray-400 border px-4 py-2 rounded cursor-pointer hover:text-[#B0D939] flex items-center gap-1"
            >
              English
              {/* Simple arrow that flips when open */}
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {/* The Dropdown Menu (only shows if isLangOpen is true) */}
            {isLangOpen && (
              <div className="absolute top-full mt-2 w-full bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hindi</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Marathi</li>
                </ul>
              </div>
            )}
          </div>
          <button className="bg-[#B0D939] text-[#123C26] font-semibold px-4 py-2 rounded hover:bg-[#9cc233] transition-colors">
              Download App
          </button>
      </div>
    </nav>
  );
}
