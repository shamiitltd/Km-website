import React, { useState } from 'react';

export default function AdminBlog() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Blog Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Crop Management',
    author: 'Kisan Mitra Team',
    readTime: '5 min read',
    imageUrl: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this should be validated securely on the backend.
    // For now, we are checking a hardcoded value or env variable.
    if (password === 'admin123') { // Simple fallback password
      setIsAuthenticated(true);
    } else {
      setStatus({ type: 'error', message: 'Incorrect password' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}` // Send password as simple auth for backend
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Blog post created successfully!' });
        setFormData({
          title: '',
          content: '',
          category: 'Crop Management',
          author: 'Kisan Mitra Team',
          readTime: '5 min read',
          imageUrl: ''
        });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'Failed to create blog post' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Network error. Make sure the backend is running on port 5000.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#123C26] mb-6">Admin Login</h2>
          {status.message && (
            <div className={`mb-4 p-3 rounded text-sm ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {status.message}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C8C44] focus:border-[#2C8C44] outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#123C26] text-white py-2 rounded-lg font-bold hover:bg-[#0F392B] transition-colors">
              Access Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[#123C26]">Create New Blog Post</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Post Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none"
              placeholder="e.g. Top 7 Tips for High Yield in Wheat"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none cursor-pointer"
              >
                <option value="Crop Management">Crop Management</option>
                <option value="Soil Health">Soil Health</option>
                <option value="AI in Agriculture">AI in Agriculture</option>
                <option value="Market Insights">Market Insights</option>
                <option value="Weather">Weather</option>
                <option value="Success Stories">Success Stories</option>
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Read Time</label>
              <input 
                type="text" 
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none"
                placeholder="e.g. 5 min read"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Author</label>
              <input 
                type="text" 
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image URL</label>
              <input 
                type="url" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none"
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Content Snippet / Description</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2C8C44] outline-none resize-y"
              placeholder="Write a brief snippet or the full content here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-8 py-3 bg-[#2C8C44] text-white rounded-lg font-bold shadow-md transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#237036] hover:shadow-lg transform hover:-translate-y-0.5'}`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
