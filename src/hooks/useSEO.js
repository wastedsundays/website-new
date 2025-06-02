// useSEO.js - Custom hook that works with StrictMode and dynamic data
import { useEffect, useRef } from 'react';

const useSEO = ({
  title = 'Adam H.',
  description = 'Adam H - Front End Developer specializing in modern web development',
  keywords = 'react, vite, your, default, keywords',
  image = '/default-og-image.jpg',
  type = 'website',
  robots = 'index, follow', // Added robots parameter with default
  canonical = null // Added canonical parameter
}) => {

  // Handle cases where data might be null/undefined (still loading)
  const safeTitle = title || 'Adam H.';
  const safeDescription = description || 'Adam H - Front End Developer specializing in modern web development';
  const safeKeywords = keywords || 'react, vite, your, default, keywords';
  const safeImage = image || '/default-og-image.jpg';
  const safeRobots = robots || 'index, follow'; // Added safe robots
  const safeCanonical = canonical; // Keep null if not provided
  
  const fullTitle = safeTitle === 'Adam H.' ? safeTitle : `${safeTitle} | Adam H.`;
  const createdTags = useRef(new Set());

  useEffect(() => {
    // Function to create or update a meta tag
    const setMetaTag = (selector, attributes) => {
      let element = document.querySelector(selector);
      
      if (!element) {
        // Create new element
        element = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        document.head.appendChild(element);
        createdTags.current.add(selector);
      } else {
        // Update existing element
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
    };

    // Function to create or update a link tag (for canonical)
    const setLinkTag = (selector, attributes) => {
      let element = document.querySelector(selector);
      
      if (!element) {
        // Create new element
        element = document.createElement('link');
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        document.head.appendChild(element);
        createdTags.current.add(selector);
      } else {
        // Update existing element
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
    };

    // Set title
    document.title = fullTitle;

    // Set meta tags
    setMetaTag('meta[name="description"]', { name: 'description', content: safeDescription });
    setMetaTag('meta[name="keywords"]', { name: 'keywords', content: safeKeywords });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: safeRobots }); // Updated to use safeRobots
    setMetaTag('meta[name="author"]', { name: 'author', content: 'Adam H' });
    
    // Set canonical URL if provided
    if (safeCanonical) {
      setLinkTag('link[rel="canonical"]', { rel: 'canonical', href: safeCanonical });
    } else {
      // Remove canonical if it exists and none is provided
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical && createdTags.current.has('link[rel="canonical"]')) {
        existingCanonical.remove();
        createdTags.current.delete('link[rel="canonical"]');
      }
    }
    
    // Open Graph tags
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: safeDescription });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: safeImage });
    
    // Twitter tags
    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: safeDescription });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: safeImage });

    // Cleanup function - only remove tags we created
    return () => {
      // Don't remove tags on cleanup in StrictMode development to avoid the double-render issue
      if (process.env.NODE_ENV === 'production') {
        createdTags.current.forEach(selector => {
          const element = document.querySelector(selector);
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });
        createdTags.current.clear();
      }
    };
  }, [fullTitle, safeDescription, safeKeywords, safeImage, safeRobots, safeCanonical, type]); // Added safeCanonical to dependencies
};

export default useSEO;