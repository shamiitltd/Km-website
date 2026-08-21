export default function Footer() {
  return (
    <footer className="bg-[#0A2213] text-gray-300 pt-12 pb-6 px-6 md:px-12 lg:px-24 w-full border-t border-[#1a4a2e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-12">
        
        {/* Column 1: Brand & About (Takes up 2 cols on tablet, 1 on large screens) */}
        <div className="sm:col-span-2 lg:col-span-1 pr-0 lg:pr-10">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-8 h-8 text-[#54B435]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c3.47.5 7.64-.17 11.23-3.08C20 15 21.5 11.5 17 8zM9.5 14c2.5-3 6.5-4 10-4-1.5 3-4 5-8.5 5l-1.5-1z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-white leading-none mb-1">KisanMitra</h3>
              <p className="text-[10px] text-gray-400">AI Powered Farming Companion</p>
            </div>
          </div>
          <p className="text-[13px] text-gray-400 mb-4 leading-relaxed">
            Empowering farmers with AI technology to make smarter decisions, increase productivity and build a better future.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 6.186a2.684 2.684 0 0 0-1.884-1.895C17.986 3.84 12 3.84 12 3.84s-5.986 0-7.698.451a2.684 2.684 0 0 0-1.884 1.895C1.967 7.915 2 12 2 12s-.033 4.085.418 5.814a2.684 2.684 0 0 0 1.884 1.895c1.712.451 7.698.451 7.698.451s5.986 0 7.698-.451a2.684 2.684 0 0 0 1.884-1.895C22.033 16.085 22 12 22 12s.033-4.085-.418-5.814zM9.99 15.423V8.577L15.93 12l-5.94 3.423z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-1">
          <h4 className="text-white font-bold mb-2 text-[13px]">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-[12px]">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="lg:col-span-1">
          <h4 className="text-white font-bold mb-2 text-[13px]">Resources</h4>
          <ul className="flex flex-col gap-2 text-[12px]">
            <li><a href="#" className="hover:text-white transition-colors">Crop Advisory</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Weather Updates</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Market Prices</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Government Schemes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Company */}
        <div className="lg:col-span-1">
          <h4 className="text-white font-bold mb-2 text-[13px]">Company</h4>
          <ul className="flex flex-col gap-2 text-[12px]">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div className="lg:col-span-1">
          <h4 className="text-white font-bold mb-2 text-[13px]">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-[12px]">
            <li className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              <span>support@kisanmitra.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.14-3.84-6.736-6.736l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              <span>+91 95484 50539</span>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
              <span className="leading-relaxed">Dayanatpur Jewar,<br/>Greater Noida, UP - 203135</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto border-t border-[#1a4a2e] pt-4 flex justify-center items-center">
        <p className="text-[11px] text-gray-400 text-center">
          © 2026 Kisan Mitra. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}