import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFCFA] px-6 py-24 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] to-[#2C8C44] drop-shadow-sm mb-4">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">Looks like this field is empty.</h2>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to familiar grounds.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-8 py-4 bg-[#2C8C44] hover:bg-[#1f6631] text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:-translate-y-1"
          >
            Return to Homepage
          </Link>
          <Link 
            to="/blog" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:border-[#2C8C44] hover:text-[#2C8C44] rounded-xl font-bold transition-all shadow-sm"
          >
            Read our latest blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
