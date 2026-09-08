export const DEFAULT_BLOG_IMAGE = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

/**
 * Resolves any image URL (relative, uploaded, or external) to a valid URL.
 * Works seamlessly across development (localhost:5000) and production domains.
 * 
 * @param {string} url - The image URL or relative path
 * @returns {string} - Fully qualified or usable image URL
 */
export const resolveImageUrl = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return DEFAULT_BLOG_IMAGE;
  }

  const cleanUrl = url.trim();

  // If already an absolute web URL or a client data/blob URI
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
    return cleanUrl;
  }

  // If relative path from uploads (e.g. /uploads/img-123.jpg or uploads/img-123.jpg)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const apiOrigin = apiUrl.replace(/\/api\/?$/, '');

  return `${apiOrigin}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
};
