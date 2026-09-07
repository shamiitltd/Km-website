import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    agreedToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (feedback) setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      setFeedback({
        type: 'error',
        text: 'Please agree to the Privacy Policy and Terms & Conditions to proceed.'
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFeedback({
          type: 'success',
          text: data.message || 'Thank you! Your message has been sent successfully. Our team will get back to you promptly.'
        });
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          subject: '',
          message: '',
          agreedToTerms: false
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Failed to submit your message. Please check your information and try again.'
        });
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setFeedback({
        type: 'error',
        text: 'Unable to connect to the server. Please check your connection or contact us directly at support@kisanmitra.com.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-10 md:py-16 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 bg-[#FAFCFA] flex justify-center">
      <div className="max-w-[92rem] w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Form Card - Expansive & Screen Optimized */}
        <div className="w-full lg:w-[63%] bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-100">
          <h2 className="text-[#123C26] text-3xl sm:text-4xl font-extrabold mb-2.5">Send Us a Message</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
            Fill out the form below and our dedicated agricultural support team will get back to you promptly.
          </p>

          {/* Feedback Banner */}
          {feedback && (
            <div
              className={`p-5 rounded-2xl mb-6 text-sm sm:text-base flex items-start gap-3.5 transition-all animate-fade-in ${
                feedback.type === 'success'
                  ? 'bg-[#EAF7ED] text-[#123C26] border border-[#2C8C44]/40 shadow-xs'
                  : 'bg-red-50 text-red-900 border border-red-200 shadow-xs'
              }`}
            >
              {feedback.type === 'success' ? (
                <svg className="w-6 h-6 text-[#2C8C44] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <span className="font-semibold leading-relaxed">{feedback.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 transition-all text-gray-800"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 transition-all text-gray-800"
              />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number (Optional)"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 transition-all text-gray-800"
              />
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 transition-all text-gray-800"
              />
            </div>

            {/* Message Area */}
            <textarea
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message (describe your farm query, crop issue, or feedback)..."
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#2C8C44] focus:ring-2 focus:ring-[#2C8C44]/20 transition-all resize-none text-gray-800"
            ></textarea>

            {/* Checkbox */}
            <div className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                id="terms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="w-5 h-5 accent-[#123C26] cursor-pointer rounded shrink-0"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm sm:text-base font-medium cursor-pointer">
                I agree to the <Link to="/terms" className="text-[#2C8C44] font-semibold hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-[#2C8C44] font-semibold hover:underline">Terms & Conditions</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#123C26] hover:bg-[#1b5034] text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-xs hover:shadow-md ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 -mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info Card */}
        <div className="w-full lg:w-[37%] bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-gray-100 flex flex-col h-full">
          <h2 className="text-[#123C26] text-2xl sm:text-3xl font-extrabold mb-3">Contact Information</h2>
          <div className="w-10 h-1 bg-[#2C8C44] rounded-full mb-8"></div>

          <div className="space-y-8 flex-grow">
            
            {/* Item 1: Office */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F9F3] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base mb-1">Our Office</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  SHAMIIT LLP<br/>
                  Dayanatpur Jewar, Greater Noida,<br/>
                  Uttar Pradesh - 203135, India
                </p>
              </div>
            </div>

            {/* Item 2: Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F9F3] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.869l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base mb-1">Call Us</p>
                <a href="tel:+919548450539" className="text-gray-600 hover:text-[#2C8C44] text-sm sm:text-base transition-colors font-medium">+91 95484 50539</a>
              </div>
            </div>

            {/* Item 3: Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F9F3] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base mb-1">Email Us</p>
                <a href="mailto:support@kisanmitra.com" className="text-gray-600 hover:text-[#2C8C44] text-sm sm:text-base transition-colors font-medium">support@kisanmitra.com</a>
              </div>
            </div>

            {/* Item 4: Working Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F9F3] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base mb-1">Working Hours</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Monday - Saturday<br/>
                  9:00 AM - 6:00 PM (IST)
                </p>
              </div>
            </div>

            {/* Item 5: Follow Us */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F9F3] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
