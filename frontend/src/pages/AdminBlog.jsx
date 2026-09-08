import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { resolveImageUrl } from '../utils/imageUrlHelper';

export default function AdminBlog({ embedded = false, initialMode = 'write' }) {
  const [password, setPassword] = useState(() => {
    return (embedded || sessionStorage.getItem('km_admin_auth') === 'true') ? 'admin123' : '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return embedded || sessionStorage.getItem('km_admin_auth') === 'true';
  });
  
  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState(initialMode); // 'write' | 'manage'
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (initialMode) {
      setActiveTab(initialMode);
    }
  }, [initialMode]);

  const editor = useRef(null);
  const fileInputRef = useRef(null);
  
  const initialFormState = {
    title: '',
    content: '',
    category: 'Crop Management',
    author: 'Kisan Mitra Team',
    readTime: '5 min read',
    imageUrl: '',
    status: 'PUBLISHED', // 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
    publishDate: new Date().toISOString().slice(0, 16),
    tags: ['sustainable farming', 'soil health', 'organic'],
    slug: '',
    canonicalUrl: '',
    seoKeywords: '',
    isNoIndex: false,
    metaTitle: '',
    metaDescription: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [currentTagInput, setCurrentTagInput] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cover Image Upload State
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Action Dropdowns & Modals State
  const [showPublishDropdown, setShowPublishDropdown] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Custom Confirmation Modals State (Zero browser native alerts)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null, isDeleting: false });
  const [editModal, setEditModal] = useState({ isOpen: false, blog: null });
  const [cancelModal, setCancelModal] = useState({ isOpen: false });

  // Suggested tags matching the design mockup
  const suggestedTags = [
    'sustainable farming',
    'soil health',
    'organic',
    'water management',
    'crop yield',
    'climate smart'
  ];

  /**
   * Word count calculation for Article Body
   */
  const wordCount = useMemo(() => {
    if (!formData.content) return 0;
    const plain = formData.content.replace(/<[^>]+>/g, ' ').trim();
    if (!plain) return 0;
    return plain.split(/\s+/).filter(Boolean).length;
  }, [formData.content]);

  /**
   * Auto-adjust read time based on word count
   */
  useEffect(() => {
    if (wordCount > 0) {
      const minutes = Math.max(1, Math.ceil(wordCount / 200));
      setFormData(prev => ({ ...prev, readTime: `${minutes} min read` }));
    }
  }, [wordCount]);

  /**
   * Smart client-side image compression:
   * Downscales raw camera photos exceeding 1920px and converts to WebP/JPEG,
   * shrinking 15MB phone photos to ~250KB in milliseconds before upload.
   */
  const compressImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.85) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
        return resolve(file);
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let { width, height } = img;

          if (width <= maxWidth && height <= maxHeight && file.size < 800 * 1024) {
            return resolve(file);
          }

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob && blob.size < file.size) {
                const cleanName = file.name.replace(/\.[^.]+$/, '.webp');
                const compressedFile = new File([blob], cleanName, {
                  type: 'image/webp',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/webp',
            quality
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  /**
   * Dispatches file upload to backend /api/blogs/upload
   */
  const handleFileSelectAndUpload = async (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setImageError('Please select a valid image file (JPEG, PNG, WebP, or GIF).');
      return;
    }

    setImageError('');
    setIsUploadingImage(true);

    try {
      const optimizedFile = await compressImage(file);
      const uploadFormData = new FormData();
      uploadFormData.append('image', optimizedFile);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`
        },
        body: uploadFormData
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setImageError('');
      } else {
        setImageError(data.error || 'Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setImageError('Network error while uploading image from device.');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelectAndUpload(e.dataTransfer.files[0]);
    }
  };

  /**
   * Jodit Editor Configuration with WordPress-Style High-Visibility Toolbar
   */
  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start writing your amazing blog post...',
    height: 480,
    minHeight: 400,
    enableDragAndDropFileToEditor: true,
    allowResizeX: true,
    allowResizeY: true,
    popup: {
      img: [
        'delete',
        '|',
        'left',
        'center',
        'right',
        'valign',
        '|',
        'edit'
      ]
    },
    image: {
      openOnDblClick: true,
      editSrc: true,
      editTitle: true,
      editAlt: true,
      editLink: true,
      editSize: true,
      editBorderRadius: true,
      editMargins: true,
      editClass: true,
      editStyle: true,
      editId: true,
      editAlign: true
    },
    uploader: {
      url: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/blogs/upload`,
      headers: {
        'Authorization': `Bearer ${password}`
      },
      format: 'json',
      isSuccess: (resp) => resp && resp.success,
      process: (resp) => ({
        files: resp.files || [resp.url],
        baseurl: resp.baseurl || '',
        error: resp.error,
        msg: resp.error || 'Upload successful'
      }),
      defaultHandlerSuccess: function (data) {
        const files = data.files || [];
        for (let i = 0; i < files.length; i++) {
          this.selection.insertImage(files[i]);
        }
      }
    },
    // WordPress-style organized toolbar
    buttons: [
      'paragraph', 'fontsize', 'brush', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'align', '|',
      'image', 'table', 'link', '|',
      'hr', 'symbol', 'fullsize', 'undo', 'redo'
    ],
    buttonsMD: [
      'paragraph', 'fontsize', 'brush', '|',
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'image', 'link', '|',
      'undo', 'redo'
    ],
    buttonsSM: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'image', 'link'
    ],
    toolbarButtonSize: 'middle',
    theme: 'default',
    style: {
      background: '#ffffff',
      color: '#1f2937'
    }
  }), [password]);

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
      const response = await fetch(`${apiUrl}/blogs?status=all`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
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

  // Tag Management
  const handleAddTag = (tagToAdd) => {
    const cleanTag = (tagToAdd || currentTagInput).trim().toLowerCase();
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, cleanTag] }));
    }
    setCurrentTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  /**
   * Submit post (Publish, Draft, or Schedule)
   */
  const handleSubmit = async (e, overrideStatus = null) => {
    if (e) e.preventDefault();

    if (!formData.title || !formData.title.trim()) {
      setStatus({ type: 'error', message: 'Please provide an article title.' });
      return;
    }

    if (!formData.imageUrl || !formData.imageUrl.trim()) {
      setStatus({ type: 'error', message: 'Please upload or provide a cover photo for the article.' });
      return;
    }

    const finalStatus = overrideStatus || formData.status || 'PUBLISHED';
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    setShowPublishDropdown(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${apiUrl}/blogs/${editId}` : `${apiUrl}/blogs`;

      const payload = {
        ...formData,
        status: finalStatus
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        let msg = editId ? 'Article updated successfully! ✨' : 'Article published successfully! ✨';
        if (finalStatus === 'DRAFT') {
          msg = editId ? 'Draft updated successfully! 📝' : 'Saved as draft! (Subscribers not notified) 📝';
        } else if (finalStatus === 'SCHEDULED') {
          msg = 'Article scheduled successfully! 🕒';
        } else if (!editId && finalStatus === 'PUBLISHED') {
          msg = 'Article published and broadcast to subscribers! 🚀';
        }

        setStatus({ type: 'success', message: msg });
        setFormData(initialFormState);
        setEditId(null);
        setImageError('');
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus({ type: 'error', message: data.error || 'Failed to save blog post' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Network error. Ensure backend server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestEdit = (blog) => {
    const isFormDirty = formData.title.trim() !== '' || formData.content.trim() !== '';
    if (isFormDirty && editId !== blog.id) {
      setEditModal({ isOpen: true, blog });
    } else {
      applyEdit(blog);
    }
  };

  const applyEdit = (blog) => {
    let parsedTags = [];
    if (blog.tags) {
      try {
        parsedTags = typeof blog.tags === 'string' && blog.tags.startsWith('[') 
          ? JSON.parse(blog.tags) 
          : blog.tags.split(',').map(t => t.trim()).filter(Boolean);
      } catch (e) {
        parsedTags = [];
      }
    }

    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      category: blog.category || 'Crop Management',
      author: blog.author || 'Kisan Mitra Team',
      readTime: blog.readTime || '5 min read',
      imageUrl: blog.imageUrl || '',
      status: blog.status || 'PUBLISHED',
      publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      tags: parsedTags.length > 0 ? parsedTags : ['sustainable farming'],
      slug: blog.slug || '',
      canonicalUrl: blog.canonicalUrl || '',
      seoKeywords: blog.seoKeywords || '',
      isNoIndex: Boolean(blog.isNoIndex),
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || ''
    });
    setEditId(blog.id);
    setActiveTab('write');
    setStatus({ type: '', message: '' });
    setImageError('');
    setEditModal({ isOpen: false, blog: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const requestCancelEdit = () => {
    const isFormDirty = formData.title.trim() !== '' || formData.content.trim() !== '';
    if (isFormDirty) {
      setCancelModal({ isOpen: true });
    } else {
      confirmCancelEdit();
    }
  };

  const confirmCancelEdit = () => {
    setFormData(initialFormState);
    setEditId(null);
    setImageError('');
    setCancelModal({ isOpen: false });
  };

  const requestDelete = (blog) => {
    setDeleteModal({ isOpen: true, blog, isDeleting: false });
  };

  const confirmDelete = async () => {
    if (!deleteModal.blog) return;
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs/${deleteModal.blog.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        setStatus({ type: 'success', message: `Blog post "${deleteModal.blog.title}" deleted successfully.` });
        fetchBlogs();
        setDeleteModal({ isOpen: false, blog: null, isDeleting: false });
      } else {
        const errData = await response.json().catch(() => ({}));
        setStatus({ type: 'error', message: errData.error || 'Failed to delete blog post.' });
        setDeleteModal(prev => ({ ...prev, isDeleting: false }));
      }
    } catch (error) {
      console.error("Delete error:", error);
      setStatus({ type: 'error', message: 'Network error during deletion. Ensure backend is reachable.' });
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C8C44]/40 focus:border-[#2C8C44] outline-none transition-all text-gray-800 placeholder-gray-400 text-sm";
  const labelClasses = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2";

  // Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-gray-50 to-white flex items-center justify-center px-4 relative overflow-hidden">
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
            <button type="submit" className="w-full bg-gradient-to-r from-[#123C26] to-[#2C8C44] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] py-10 px-4 sm:px-6 lg:px-10">
      {/* WordPress-style high-visibility toolbar injection */}
      <style>{`
        .cms-editor .jodit-toolbar__box {
          background: #F9FAFB !important;
          border-bottom: 1px solid #E5E7EB !important;
          padding: 8px 12px !important;
        }
        .cms-editor .jodit-toolbar-button {
          min-width: 36px !important;
          min-height: 36px !important;
          margin: 1px 2px !important;
          border-radius: 8px !important;
          transition: background 0.15s ease, color 0.15s ease !important;
        }
        .cms-editor .jodit-toolbar-button:hover {
          background: #E8F5EA !important;
        }
        .cms-editor .jodit-toolbar-button_active {
          background: #D1EBD6 !important;
          color: #123C26 !important;
        }
        .cms-editor .jodit-toolbar-button__icon {
          width: 18px !important;
          height: 18px !important;
        }
        .cms-editor .jodit-icon {
          fill: #374151 !important;
          width: 17px !important;
          height: 17px !important;
        }
        .cms-editor .jodit-toolbar-button_active .jodit-icon {
          fill: #123C26 !important;
        }
        .cms-editor .jodit-wysiwyg {
          font-size: 16px !important;
          line-height: 1.8 !important;
          color: #1F2937 !important;
          padding: 24px !important;
          min-height: 420px !important;
        }
      `}</style>

      <div className={embedded ? "w-full" : "max-w-7xl mx-auto"}>
        {/* TOP ADMIN QUICK NAVIGATION BAR */}
        {!embedded && (
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-200/60">
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] text-xs font-bold rounded-xl border border-gray-200 hover:border-[#123C26]/30 shadow-2xs transition-all"
              >
                <svg className="w-3.5 h-3.5 text-[#123C26]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Command Center</span>
              </Link>
              <span className="text-gray-300 text-xs">/</span>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                Blog CMS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/broadcast"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] text-xs font-bold rounded-xl border border-gray-200 hover:border-[#123C26]/30 shadow-2xs transition-all"
              >
                <span className="text-xs">📢</span>
                <span>Broadcast Studio</span>
              </Link>
              <Link
                to="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium rounded-xl border border-gray-200 shadow-2xs transition-all"
              >
                <span>Public Blog ↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* TOP HEADER BAR MATCHING MOCKUP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 mb-8 border-b border-gray-200/80">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {editId ? 'Edit Blog Post' : 'Create a New Blog Post'}
              </h1>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Share knowledge. Empower farmers. Build a greener tomorrow.
            </p>
          </div>

          {/* Action buttons & tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tab switchers */}
            <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-xs mr-2">
              <button 
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'write' ? 'bg-[#123C26] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Writer Studio
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('manage'); confirmCancelEdit(); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'manage' ? 'bg-[#123C26] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Manage Posts ({blogs.length || '•'})
              </button>
            </div>

            {/* Save as Draft Button */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, 'DRAFT')}
              className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              Save as Draft
            </button>

            {/* Preview Button */}
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="px-4 py-2.5 bg-white hover:bg-[#EAF7ED] text-[#2C8C44] text-xs font-bold rounded-xl border border-[#2C8C44]/30 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#2C8C44]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preview
            </button>

            {/* Publish Post Split Button with Dropdown */}
            <div className="relative">
              <div className="inline-flex rounded-xl shadow-sm">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => handleSubmit(e, 'PUBLISHED')}
                  className="px-5 py-2.5 bg-[#1E7B44] hover:bg-[#186437] text-white text-xs font-bold rounded-l-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  {isSubmitting ? 'Processing...' : (editId ? 'Update Post' : 'Publish Post')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPublishDropdown(prev => !prev)}
                  className="px-2.5 py-2.5 bg-[#186437] hover:bg-[#124d2a] text-white text-xs font-bold rounded-r-xl border-l border-white/20 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {showPublishDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-30 animate-scale-up">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'PUBLISHED')}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Publish Now (Notify Subscribers)
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'SCHEDULED')}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Schedule for Selected Date
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'DRAFT')}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Save as Unlisted Draft
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsAuthenticated(false)}
              className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all cursor-pointer shadow-xs"
              title="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path></svg>
            </button>
          </div>
        </div>

        {/* STATUS BANNER */}
        {status.message && (
          <div className={`mb-8 p-4 rounded-2xl font-medium flex items-center justify-between gap-3 border shadow-xs ${status.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-[#E8F5EA] text-[#123C26] border-[#A6CDB3]/40'}`}>
            <div className="flex items-center gap-3">
              {status.type === 'success' ? (
                <svg className="w-5 h-5 text-[#2C8C44] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
              )}
              <span className="text-sm font-semibold">{status.message}</span>
            </div>
            <button onClick={() => setStatus({ type: '', message: '' })} className="text-xs text-gray-400 hover:text-gray-700">✕</button>
          </div>
        )}

        {/* WRITE TAB - DUAL COLUMN LAYOUT EXACTLY MATCHING MOCKUP */}
        {activeTab === 'write' && (
          <form onSubmit={(e) => handleSubmit(e, formData.status)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ================= LEFT MAIN COLUMN (7 cols) ================= */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Article Title Card */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-800">
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400 font-mono">
                    {formData.title.length}/100
                  </span>
                </div>
                <input 
                  type="text" 
                  name="title"
                  maxLength={100}
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50/60 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 focus:border-[#2C8C44] outline-none text-base font-semibold text-gray-800 placeholder-gray-400 transition-all"
                  placeholder="Enter a captivating headline..."
                  required
                />
              </div>

              {/* Category & Estimated Read Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-10 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 focus:border-[#2C8C44] outline-none appearance-none cursor-pointer"
                    >
                      <option value="Crop Management">Crop Management</option>
                      <option value="Soil Health">Soil Health</option>
                      <option value="AI in Agriculture">AI in Agriculture</option>
                      <option value="Market Insights">Market Insights</option>
                      <option value="Weather">Weather & Climate</option>
                      <option value="Organic Farming">Organic Farming</option>
                      <option value="Success Stories">Success Stories</option>
                      <option value="Pest Management">Pest Management</option>
                    </select>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base">🌱</span>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Estimated Read Time */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Estimated Read Time
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 focus:border-[#2C8C44] outline-none"
                      placeholder="e.g. 5 min read"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base">⏱️</span>
                  </div>
                </div>
              </div>

              {/* Hero Cover Photo Card (Dual-section matching mockup) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-bold text-gray-800">
                    Hero Cover Photo <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(prev => !prev)}
                    className="text-xs text-[#2C8C44] hover:underline font-semibold cursor-pointer"
                  >
                    {showUrlInput ? 'Switch to Device Upload' : 'Paste Image URL instead'}
                  </button>
                </div>

                {imageError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                    <span>{imageError}</span>
                  </div>
                )}

                {showUrlInput ? (
                  <div className="mb-4">
                    <input 
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/... or direct image link"
                      className={inputClasses}
                    />
                  </div>
                ) : null}

                {/* Dual Layout: Dropzone (Left) + Preview (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                  {/* Left: Drag & Drop Dropzone */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`md:col-span-7 border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      dragActive ? 'border-[#2C8C44] bg-green-50/60 scale-[1.01]' : 'border-gray-200 hover:border-[#2C8C44] bg-gray-50/50 hover:bg-green-50/20'
                    }`}
                  >
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center py-6">
                        <div className="w-8 h-8 border-3 border-[#2C8C44] border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-xs font-bold text-[#123C26]">Uploading & optimizing cover photo...</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-[#EAF7ED] text-[#2C8C44] flex items-center justify-center mb-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-800 mb-1">
                          Drag & drop your cover photo here, or <span className="text-[#2C8C44] underline">browse files</span>
                        </p>
                        <p className="text-[11px] text-gray-500 mb-3">
                          High-resolution images work best (JPG, PNG, WebP).
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md">Max 10MB</span>
                          <span className="text-[10px] font-semibold text-[#2C8C44] bg-[#EAF7ED] px-2 py-0.5 rounded-md">Auto-Optimized</span>
                          <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md">Recommended: 1200 × 630</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelectAndUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Right: Live Preview Card (Passive Display Only) or Empty State Box */}
                  {formData.imageUrl ? (
                    <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 min-h-[160px] flex items-center justify-center cursor-default select-none">
                      <img 
                        src={resolveImageUrl(formData.imageUrl)} 
                        alt="Cover Preview" 
                        className="w-full h-full object-cover min-h-[160px] opacity-90"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Passive Preview Pill Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white/90 border border-white/10 tracking-wide uppercase">
                        Cover Preview
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                        <p className="text-white text-xs font-bold leading-tight drop-shadow-md mb-2 line-clamp-2">
                          {formData.title || "Cover Photo Selected"}
                        </p>
                        <div className="flex items-center justify-between gap-2 pointer-events-auto">
                          <span className="text-[10px] text-gray-300 font-medium">
                            Upload new from left box
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                            className="px-2.5 py-1.5 bg-red-600/85 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg shadow-xs backdrop-blur-md transition-all cursor-pointer"
                            title="Remove cover photo"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="md:col-span-5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 min-h-[160px] flex flex-col items-center justify-center text-center select-none cursor-default">
                      <div className="w-11 h-11 rounded-2xl bg-white text-gray-400 border border-gray-200/80 flex items-center justify-center mb-2.5 shadow-xs">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-600 mb-1">
                        Upload image to see preview
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Select or drop a file on the left box
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Body Section with WordPress-Style Enlarged Toolbar */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs cms-editor">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-gray-800">
                    Article Body <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400 font-mono">
                    {wordCount} words
                  </span>
                </div>

                {/* WYSIWYG Jodit Editor */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    config={config}
                    onBlur={handleContentChange}
                    onChange={() => {}}
                  />
                </div>

                {/* Bottom Tip Bar matching mockup */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-medium px-1">
                  <div className="flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Tip: You can paste images directly, drag & drop, or click the image icon to insert.</span>
                  </div>
                  <span className="font-mono text-gray-400">{wordCount} words</span>
                </div>
              </div>

            </div>

            {/* ================= RIGHT SIDEBAR COLUMN (5 cols) ================= */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* CARD 1: POST DETAILS */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="text-lg">📄</span>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Post Details</h3>
                </div>

                {/* Status selector */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Status</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-8 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none appearance-none cursor-pointer"
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                      <option value="SCHEDULED">Scheduled</option>
                    </select>
                    <span className={`absolute left-3 top-3.5 w-2.5 h-2.5 rounded-full ${
                      formData.status === 'PUBLISHED' ? 'bg-green-500' : formData.status === 'DRAFT' ? 'bg-gray-400' : 'bg-blue-500'
                    }`}></span>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Publish Date Picker */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Publish Date</label>
                  <div className="relative">
                    <input 
                      type="datetime-local"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                    />
                    <span className="absolute left-3 top-2.5 text-xs text-gray-400">📅</span>
                  </div>
                </div>

                {/* Author Input */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Author</label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                      placeholder="Kisan Mitra Team"
                    />
                    <span className="absolute left-3 top-2.5 text-xs text-gray-400">👥</span>
                  </div>
                </div>
              </div>

              {/* CARD 2: TAGS */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="text-lg">🏷️</span>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Tags</h3>
                </div>

                {/* Tag Input */}
                <div>
                  <input 
                    type="text"
                    value={currentTagInput}
                    onChange={(e) => setCurrentTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add a tag..."
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Press Enter or comma to add multiple tags</p>
                </div>

                {/* Active Tags Chip List */}
                <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                  {formData.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EAF7ED] text-[#123C26] text-xs font-semibold rounded-lg border border-[#2C8C44]/20"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 font-bold text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {formData.tags.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No tags added yet.</span>
                  )}
                </div>

                {/* Suggested Tags Pills matching mockup */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-600 mb-2">Suggested:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedTags.map(suggested => {
                      const isAdded = formData.tags.includes(suggested);
                      return (
                        <button
                          key={suggested}
                          type="button"
                          disabled={isAdded}
                          onClick={() => handleAddTag(suggested)}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-gray-100 text-gray-400 border-gray-200 opacity-60 cursor-default'
                              : 'bg-gray-50 hover:bg-[#EAF7ED] text-gray-700 hover:text-[#123C26] border-gray-200 hover:border-[#2C8C44]/40'
                          }`}
                        >
                          {suggested} {isAdded ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CARD 3: SEO SETTINGS */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="text-lg">🔍</span>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">SEO Settings</h3>
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">Meta Title</label>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {(formData.metaTitle || formData.title).length}/60
                    </span>
                  </div>
                  <input 
                    type="text"
                    maxLength={60}
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="Enter SEO title..."
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">Meta Description</label>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {(formData.metaDescription || '').length}/160
                    </span>
                  </div>
                  <textarea 
                    rows={3}
                    maxLength={160}
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="Enter a short search description..."
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none resize-none"
                  />
                </div>

                {/* URL Slug */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
                  <input 
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g. smart-crop-disease-detection"
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-mono text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1 font-mono truncate">
                    Preview: /blog/{formData.slug || (formData.title ? formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') : 'article-slug')}
                  </p>
                </div>

                {/* SEO Focus Keywords */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">SEO Focus Keywords</label>
                  <input 
                    type="text"
                    name="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={handleInputChange}
                    placeholder="e.g. soil health, crop rotation, organic"
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                  />
                </div>

                {/* Canonical URL Override */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Canonical URL Override (Optional)</label>
                  <input 
                    type="url"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleInputChange}
                    placeholder="https://kisanmitra.in/blog/..."
                    className="w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs font-mono text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#2C8C44]/40 outline-none"
                  />
                </div>

                {/* Search Engine Indexing Toggle */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-800">Search Engine Indexing</p>
                    <p className="text-[10px] text-gray-400">Allow Google & Bing to index this article</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={!formData.isNoIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, isNoIndex: !e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2C8C44]"></div>
                  </label>
                </div>

                {/* Live Google Search Preview Card */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Search Result Preview</p>
                  <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-200/80 space-y-1">
                    <p className="text-[10px] text-gray-500 font-mono truncate">
                      kisanmitra.in &rsaquo; blog &rsaquo; {formData.category.toLowerCase().replace(/\s+/g, '-')}
                    </p>
                    <p className="text-xs font-bold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                      {formData.metaTitle || formData.title || "Your Engaging Article Headline Here"}
                    </p>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {formData.metaDescription || (formData.content.replace(/<[^>]+>/g, '').slice(0, 140) + '...') || "Empowering Indian farmers with scientific agronomy and sustainable agriculture insights."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </form>
        )}

        {/* MANAGE POSTS TAB */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-black text-gray-900">Manage Published & Draft Posts</h2>
                <p className="text-xs text-gray-500 mt-0.5">Filter, inspect, edit or permanently delete posts from the platform.</p>
              </div>
              <button 
                type="button"
                onClick={() => { setActiveTab('write'); confirmCancelEdit(); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#123C26] text-white text-xs font-bold rounded-xl hover:bg-[#2C8C44] transition-all cursor-pointer shadow-xs"
              >
                + Write New Post
              </button>
            </div>
            
            {isLoadingBlogs ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-3 border-[#2C8C44] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <span className="text-3xl block mb-2">📝</span>
                <p className="text-gray-600 font-bold text-sm">No blog posts found.</p>
                <p className="text-xs text-gray-400 mt-1">Start writing your first agricultural article!</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[11px] uppercase tracking-wider font-bold">
                      <th className="p-4">Article</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3.5">
                            <img 
                              src={resolveImageUrl(blog.imageUrl)} 
                              alt={blog.title} 
                              className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0 border border-gray-100"
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"; }}
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 line-clamp-1">{blog.title}</h4>
                              <p className="text-xs text-gray-500 font-medium">{blog.author} &bull; {blog.readTime}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-[#E8F5EA] text-[#2C8C44] px-2.5 py-1 rounded-lg text-xs font-bold">
                            {blog.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            blog.status === 'PUBLISHED' 
                              ? 'bg-green-100 text-green-800' 
                              : blog.status === 'SCHEDULED' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              blog.status === 'PUBLISHED' ? 'bg-green-600' : blog.status === 'SCHEDULED' ? 'bg-blue-600' : 'bg-gray-500'
                            }`}></span>
                            {blog.status || 'PUBLISHED'}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-500 font-medium">
                          {new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <button 
                            onClick={() => requestEdit(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                            title="Edit Post"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => requestDelete(blog)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete Post"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

      {/* ================= MODAL: READER PREVIEW ================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md">Live Preview</span>
                <span className="text-xs text-gray-500 font-medium">How readers will see this post</span>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Close Preview ✕
              </button>
            </div>

            {/* Simulated Hero */}
            <div className="relative h-72 w-full bg-gradient-to-tr from-[#123C26] to-[#2C8C44] overflow-hidden flex items-end">
              {formData.imageUrl ? (
                <img 
                  src={resolveImageUrl(formData.imageUrl)} 
                  alt={formData.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              ) : null}
              <div className="relative z-10 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 text-xs font-bold text-green-400 mb-2">
                  <span>{formData.category}</span>
                  <span>&bull;</span>
                  <span>{formData.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {formData.title || "Your Engaging Article Headline"}
                </h1>
                <p className="text-gray-300 text-xs font-medium mt-2">
                  By {formData.author} &bull; {new Date(formData.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Simulated Content Body */}
            <div className="p-8 space-y-6">
              <div 
                className="prose max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">No article content written yet.</p>' }}
              />

              {/* Tags */}
              {formData.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-500">Tags:</span>
                  {formData.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 border border-gray-100 shadow-2xl transform transition-all">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 text-center mb-2">Delete Blog Post</h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-gray-800">"{deleteModal.blog?.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={() => setDeleteModal({ isOpen: false, blog: null, isDeleting: false })}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={confirmDelete}
                className="flex-1 px-5 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-md shadow-red-600/20 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {deleteModal.isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Yes, Delete Post'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT OVERWRITE CONFIRMATION ================= */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 border border-gray-100 shadow-2xl transform transition-all">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 text-center mb-2">Switch to Edit Post?</h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              You have unsaved changes in the editor. Loading <strong className="text-gray-800">"{editModal.blog?.title}"</strong> will replace current text in the form.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditModal({ isOpen: false, blog: null })}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm cursor-pointer"
              >
                Keep Current
              </button>
              <button
                type="button"
                onClick={() => applyEdit(editModal.blog)}
                className="flex-1 px-5 py-3 rounded-xl bg-[#123C26] text-white font-bold hover:bg-[#2C8C44] transition-all shadow-md text-sm cursor-pointer"
              >
                Load Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CANCEL DRAFT CONFIRMATION ================= */}
      {cancelModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 border border-gray-100 shadow-2xl transform transition-all">
            <div className="w-14 h-14 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 text-center mb-2">Discard Changes?</h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Are you sure you want to discard your draft edits and reset the form?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCancelModal({ isOpen: false })}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm cursor-pointer"
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={confirmCancelEdit}
                className="flex-1 px-5 py-3 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-900 transition-all shadow-md text-sm cursor-pointer"
              >
                Discard & Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
