import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DEFAULT_CANONICAL_DOMAIN,
  STATIC_PAGE_METADATA,
  ORGANIZATION_SCHEMA,
  buildBreadcrumbsSchema
} from '../seo/seoConfig';

/**
 * Helper to update or create a meta tag in document.head
 */
function setMetaTag(attributeName, attributeValue, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create canonical link tag
 */
function setCanonicalLink(href) {
  if (!href) return;
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Helper to inject or update JSON-LD structured data script
 */
function setJsonLd(schemas) {
  const SCRIPT_ID = 'kisanmitra-jsonld';
  let scriptElement = document.getElementById(SCRIPT_ID);

  if (!schemas || schemas.length === 0) {
    if (scriptElement) scriptElement.remove();
    return;
  }

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = SCRIPT_ID;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  try {
    const payload = schemas.length === 1 ? schemas[0] : {
      '@context': 'https://schema.org',
      '@graph': schemas
    };
    scriptElement.textContent = JSON.stringify(payload);
  } catch (err) {
    console.error('Failed to stringify JSON-LD:', err);
  }
}

export default function SeoManager({ customMeta }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [siteSettings, setSiteSettings] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // 1. Fetch site SEO configuration once on mount
  useEffect(() => {
    let isMounted = true;
    fetch(`${apiUrl}/seo/settings`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data && data.settings) {
          setSiteSettings(data.settings);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, [apiUrl]);

  // 2. Check 301 redirects on route change
  useEffect(() => {
    const path = location.pathname;
    // Don't check for admin routes
    if (path.startsWith('/admin')) return;

    fetch(`${apiUrl}/seo/check-redirect?url=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.redirect && data.redirect !== path) {
          navigate(data.redirect, { replace: true });
        }
      })
      .catch(() => {});
  }, [location.pathname, apiUrl, navigate]);

  // 3. Apply Metadata and JSON-LD on route or settings change
  useEffect(() => {
    const path = location.pathname;
    const domain = siteSettings?.canonicalDomain || DEFAULT_CANONICAL_DOMAIN;
    const defaultOgImage = siteSettings?.defaultOgImage || `${domain}/assets/hero-D2VKPB0P.png`;

    // A. Handle Admin Routes (Strictly Noindex)
    if (path.startsWith('/admin')) {
      document.title = 'Command Center | KisanMitra Admin';
      setMetaTag('name', 'robots', 'noindex, nofollow');
      setCanonicalLink(`${domain}${path}`);
      setJsonLd(null);
      return;
    }

    // B. Handle Blog Detail (When customMeta is provided by BlogPost component)
    if (customMeta && customMeta.isBlogDetail) {
      const blogTitle = customMeta.metaTitle || customMeta.title || 'Blog Post | KisanMitra';
      const blogDesc = customMeta.metaDescription || (customMeta.content ? customMeta.content.replace(/<[^>]+>/g, ' ').slice(0, 155).trim() + '...' : 'Read the latest agricultural insights from KisanMitra.');
      const blogImage = customMeta.ogImageUrl || customMeta.imageUrl || defaultOgImage;
      const canonical = customMeta.canonicalUrl || `${domain}/blog/${customMeta.slug || customMeta.id}`;
      const robots = customMeta.isNoIndex ? 'noindex, follow' : 'index, follow';

      document.title = `${blogTitle} | KisanMitra`;
      setMetaTag('name', 'description', blogDesc);
      setMetaTag('name', 'robots', robots);
      setCanonicalLink(canonical);

      if (customMeta.seoKeywords) {
        setMetaTag('name', 'keywords', customMeta.seoKeywords);
      }

      // Open Graph
      setMetaTag('property', 'og:type', 'article');
      setMetaTag('property', 'og:url', canonical);
      setMetaTag('property', 'og:title', blogTitle);
      setMetaTag('property', 'og:description', blogDesc);
      setMetaTag('property', 'og:image', blogImage);
      setMetaTag('property', 'og:site_name', 'KisanMitra');

      // Twitter
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', blogTitle);
      setMetaTag('name', 'twitter:description', blogDesc);
      setMetaTag('name', 'twitter:image', blogImage);

      // Schema.org Article + Breadcrumbs
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: customMeta.title,
        description: blogDesc,
        image: [blogImage],
        datePublished: customMeta.publishDate || customMeta.createdAt,
        dateModified: customMeta.updatedAt || customMeta.publishDate || customMeta.createdAt,
        author: {
          '@type': 'Person',
          name: customMeta.author || 'Kisan Mitra Team'
        },
        publisher: ORGANIZATION_SCHEMA,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical
        },
        articleSection: customMeta.category || 'Agriculture'
      };

      const breadcrumbSchema = buildBreadcrumbsSchema(domain, [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: customMeta.title, path: `/blog/${customMeta.slug || customMeta.id}` }
      ]);

      setJsonLd([articleSchema, breadcrumbSchema]);
      return;
    }

    // C. Handle Static Public Pages
    const pageConfig = STATIC_PAGE_METADATA[path];

    if (pageConfig) {
      const pageTitle = pageConfig.title;
      const pageDesc = pageConfig.description;
      const canonical = `${domain}${pageConfig.canonicalPath || path}`;

      document.title = pageTitle;
      setMetaTag('name', 'description', pageDesc);
      setMetaTag('name', 'robots', siteSettings?.robotsIndexing || 'index, follow');
      setCanonicalLink(canonical);

      if (pageConfig.keywords) {
        setMetaTag('name', 'keywords', pageConfig.keywords);
      }

      // Open Graph
      setMetaTag('property', 'og:type', pageConfig.ogType || 'website');
      setMetaTag('property', 'og:url', canonical);
      setMetaTag('property', 'og:title', pageTitle);
      setMetaTag('property', 'og:description', pageDesc);
      setMetaTag('property', 'og:image', defaultOgImage);
      setMetaTag('property', 'og:site_name', 'KisanMitra');

      // Twitter
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', pageTitle);
      setMetaTag('name', 'twitter:description', pageDesc);
      setMetaTag('name', 'twitter:image', defaultOgImage);

      // JSON-LD Schemas
      const schemas = [...(pageConfig.schemas || [])];
      if (pageConfig.breadcrumbs) {
        schemas.push(buildBreadcrumbsSchema(domain, pageConfig.breadcrumbs));
      }

      setJsonLd(schemas);
      return;
    }

    // D. Unmatched Routes (Custom 404)
    if (!path.startsWith('/blog/')) {
      document.title = 'Page Not Found (404) | KisanMitra';
      setMetaTag('name', 'description', 'The page you requested could not be found. Return to KisanMitra home.');
      setMetaTag('name', 'robots', 'noindex, nofollow');
      setCanonicalLink(`${domain}${path}`);
      setJsonLd(null);
    }
  }, [location.pathname, siteSettings, customMeta]);

  // 4. Inject Search Console & Webmaster Verification Tokens
  useEffect(() => {
    if (!siteSettings) return;

    if (siteSettings.googleVerificationCode) {
      setMetaTag('name', 'google-site-verification', siteSettings.googleVerificationCode);
    }
    if (siteSettings.bingVerificationCode) {
      setMetaTag('name', 'msvalidate.01', siteSettings.bingVerificationCode);
    }
    if (siteSettings.otherVerificationCode) {
      setMetaTag('name', 'other-verification', siteSettings.otherVerificationCode);
    }
  }, [siteSettings]);

  return null; // Invisible component
}
