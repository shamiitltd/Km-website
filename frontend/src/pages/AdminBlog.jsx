import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

export default function AdminBlog() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'manage'
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [editId, setEditId] = useState(null);

  const editor = useRef(null);
  
  const initialFormState = {
    title: '',
    content: '',
    category: 'Crop Management',
    author: 'Kisan Mitra Team',
    readTime: '5 min read',
    imageUrl: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start writing your amazing blog post...',
    height: 450,
    enableDragAndDropFileToEditor: true,
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'video', 'file', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', 'symbol', 'fullsize', 'print'
    ],
    style: {
      background: 'transparent',
    }
  }), []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setIsAuthenticated(true);
    } else {
      setStatus({ type: 'error', message: 'Incorrect credentials' });
    }
  };

  // Fetch blogs when manage tab is active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') {
      fetchBlogs();
    }
  }, [isAuthenticated, activeTab]);

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${apiUrl}/blogs/${editId}` : `${apiUrl}/blogs`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: editId ? 'Blog post updated successfully! ✨' : 'Blog post published successfully! ✨' });
        setFormData(initialFormState);
        setEditId(null);
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'Failed to save blog post' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Network error. Ensure backend is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      imageUrl: blog.imageUrl
    });
    setEditId(blog.id);
    setActiveTab('write');
    setStatus({ type: '', message: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Post deleted successfully.' });
        fetchBlogs(); // Refresh the list
      } else {
        setStatus({ type: 'error', message: 'Failed to delete post.' });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setStatus({ type: 'error', message: 'Network error during deletion.' });
    }
  };

  const cancelEdit = () => {
    setFormData(initialFormState);
    setEditId(null);
  };

  const inputClasses = "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/50 focus:border-[#2C8C44] outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm";
  const labelClasses = "block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-gray-50 to-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-green-900/5 border border-white p-10 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#123C26] to-[#2C8C44] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] to-[#2C8C44] mb-2 tracking-tight">Kisan Workspace</h2>
          <p className="text-center text-gray-500 text-sm mb-8 font-medium">Secure Admin Access</p>
          
          {status.message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${status.type === 'error' ? 'bg-red-50/80 border-red-100 text-red-600' : 'bg-green-50/80 border-green-100 text-green-600'}`}>
              {status.message}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/50 focus:border-[#2C8C44] outline-none transition-all text-center tracking-[0.25em] font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#123C26] to-[#2C8C44] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transform hover:-translate-y-1 transition-all duration-300">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50/50 via-gray-50 to-[#FAFCFA] py-16 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-5xl mx-auto">
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#123C26] to-[#2C8C44] tracking-tight mb-2">CMS Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage and publish content for your agricultural community.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('write')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'write' ? 'bg-[#2C8C44] text-white' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                {editId ? 'Edit Post' : 'Write Post'}
              </button>
              <button 
                onClick={() => { setActiveTab('manage'); cancelEdit(); }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'manage' ? 'bg-[#2C8C44] text-white' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                Manage Posts
              </button>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 shadow-sm transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {status.message && (
          <div className={`mb-8 p-5 rounded-2xl font-medium flex items-center gap-3 border shadow-sm ${status.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-[#E8F5EA] text-[#123C26] border-[#A6CDB3]/30'}`}>
            {status.type === 'success' && <svg className="w-5 h-5 text-[#2C8C44]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
            {status.message}
          </div>
        )}

        {/* WRITE / EDIT TAB */}
        {activeTab === 'write' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-green-900/5 border border-white/60 p-8 md:p-12 animate-fade-in">
            {editId && (
              <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl font-medium">
                <span>Currently editing an existing post.</span>
                <button onClick={cancelEdit} className="text-sm underline hover:text-blue-900">Cancel Edit</button>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div>
                <label className={labelClasses}>Article Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`${inputClasses} text-lg md:text-xl font-medium`}
                  placeholder="Enter a captivating headline..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category */}
                <div>
                  <label className={labelClasses}>Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="Crop Management">Crop Management</option>
                      <option value="Soil Health">Soil Health</option>
                      <option value="AI in Agriculture">AI in Agriculture</option>
                      <option value="Market Insights">Market Insights</option>
                      <option value="Weather">Weather</option>
                      <option value="Success Stories">Success Stories</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Read Time */}
                <div>
                  <label className={labelClasses}>Estimated Read Time</label>
                  <input 
                    type="text" 
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="e.g. 5 min read"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Author */}
                <div>
                  <label className={labelClasses}>Author Name</label>
                  <input 
                    type="text" 
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className={labelClasses}>Hero Image URL</label>
                  <input 
                    type="url" 
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
              </div>

              {/* Content (Jodit WYSIWYG) */}
              <div className="pt-2">
                <label className={labelClasses}>Article Body</label>
                <div className="border border-gray-200/80 rounded-2xl overflow-hidden shadow-inner bg-white/50">
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    config={config}
                    onBlur={handleContentChange}
                    onChange={() => {}}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
                {editId && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="px-8 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`px-10 py-4 bg-gradient-to-r from-[#2C8C44] to-[#1f6631] text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all duration-300 flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-green-900/40 hover:-translate-y-1'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      {editId ? 'Update Article' : 'Publish Article'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* MANAGE POSTS TAB */}
        {activeTab === 'manage' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-green-900/5 border border-white/60 p-8 animate-fade-in">
            <h2 className="text-xl font-bold text-[#123C26] mb-6">Published Posts</h2>
            
            {isLoadingBlogs ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-[#2C8C44]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No posts found. Start writing!</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[13px] uppercase tracking-wider">
                      <th className="p-4 font-bold">Article</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Published Date</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={blog.imageUrl} 
                              alt={blog.title} 
                              className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }}
                            />
                            <div>
                              <h3 className="font-bold text-gray-800 line-clamp-1">{blog.title}</h3>
                              <p className="text-sm text-gray-500">{blog.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-600">
                          <span className="bg-[#E8F5EA] text-[#2C8C44] px-3 py-1 rounded-full text-xs font-bold">
                            {blog.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
