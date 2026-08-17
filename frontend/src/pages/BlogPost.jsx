import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallbackImage = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError('Could not load the blog post. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFCFA] flex items-center justify-center">
        <div className="text-xl text-gray-500 font-medium">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFCFA] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-[#123C26] mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-8 text-center">{error}</p>
        <Link to="/blog" className="px-6 py-3 bg-[#2C8C44] text-white rounded-lg font-bold hover:bg-[#237036] transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Sanitize the HTML content safely
  const cleanHTML = DOMPurify.sanitize(post.content);

  return (
    <article className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <div 
        className="w-full pt-15 pb-24 px-6 md:px-12 relative flex flex-col justify-center items-center min-h-[55vh]"
        style={{
          backgroundImage: `url(${post.imageUrl || fallbackImage})`,
          backgroundSize: 'cover',
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Hero Content */}
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center w-full mt-8 px-4">
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center text-gray-300 text-sm md:text-[15px] font-medium tracking-wide">
            <span>{post.author}</span>
            <span className="mx-3">&middot;</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="mx-3">&middot;</span>
            <span>{post.category}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Added dynamic sub-header matching user template */}
        <div className="mb-2 text-gray-900 text-lg md:text-xl leading-relaxed border-b border-gray-200 pb-8">
          <strong>A Kisan Mitra Research Brief — {new Date().getFullYear()}</strong> <em className="text-gray-600">Category: {post.category}</em>
        </div>

        {/* We use highly customized prose classes to enforce crisp, corporate table styles and typography */}
        <div 
          className="prose prose-lg md:prose-xl max-w-none 
                     prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                     prose-a:text-[#2C8C44] prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-gray-100
                     prose-table:border-collapse prose-table:w-full prose-table:border prose-table:border-gray-300
                     prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:text-gray-900 prose-th:p-4 prose-th:text-center prose-th:font-bold
                     prose-td:border prose-td:border-gray-300 prose-td:p-4 prose-td:text-gray-700 prose-td:align-middle
                     prose-blockquote:border-l-4 prose-blockquote:border-[#2C8C44] prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </div>
    </article>
  );
}
