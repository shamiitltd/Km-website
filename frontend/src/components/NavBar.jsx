import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <nav className="bg-[#123C26] sticky top-0 z-50 text-white px-4 md:px-8 py-4 w-full">
      <div className="flex justify-between items-center w-full">
        {/* Logo Area */}
        <div className="font-bold text-xl flex items-center gap-2">
          <span>KisanMitra</span>
        </div>

        {/* Desktop Links Area */}
        <ul className="hidden lg:flex space-x-6 xl:space-x-8 text-[1rem] font-semibold">
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

        {/* Right Side: Language & Button (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
            
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
              {/* The Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50">
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

        {/* Mobile Hamburger Menu Button */}
        <button 
          className="lg:hidden p-2 text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-6 h-6">
            {/* Hamburger Icon */}
            <svg 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close (X) Icon */}
            <svg 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden flex flex-col bg-[#0d2a1a] shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100 mt-4 p-4 rounded-lg" : "max-h-0 opacity-0 p-0 m-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 font-semibold">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#80D939] block"
                    : "text-white hover:text-[#B0D939] block transition-colors"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-4 border-t border-[#1a4a2e] pt-4">
          <button className="w-full text-left text-sm border-gray-400 border px-4 py-2 rounded text-white flex justify-between items-center">
            English
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="w-full bg-[#B0D939] text-[#123C26] font-semibold px-4 py-3 rounded hover:bg-[#9cc233] transition-colors">
              Download App
          </button>
        </div>
      </div>
    </nav>
  );
}
