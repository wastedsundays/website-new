// useSEO.js - Custom hook that works with StrictMode and dynamic data
import { useEffect, useRef } from 'react';

const useSEO = ({
  title = 'Adam H. - Front End Developer',
  description = 'Adam H - Front End Developer specializing in modern web development',
  keywords = 'react, vite, your, default, keywords',
  image = '/default-og-image.jpg',
  type = 'website',
  robots = 'index, follow'
}) => {

  // Handle cases where data might be null/undefined (still loading)
  const safeTitle = title || 'Adam H. - Front End Developer';
  const safeDescription = description || 'Adam H - Front End Developer specializing in modern web development';
  const safeKeywords = keywords || 'react, vite, your, default, keywords';
  const safeImage = image || '/default-og-image.jpg';
  const safeRobots = robots || 'index, follow';
  
  const fullTitle = safeTitle === 'Adam H. - Front End Developer' ? safeTitle : `${safeTitle} | Adam H. - Front End Developer`;
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

    // Set title
    document.title = fullTitle;

    // Set meta tags
    setMetaTag('meta[name="description"]', { name: 'description', content: description });
    setMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: safeRobots });
    setMetaTag('meta[name="author"]', { name: 'author', content: 'Adam H' });
    
    // Open Graph tags
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: image });
    
    // Twitter tags
    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

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
  }, [fullTitle, safeDescription, safeKeywords, safeImage, type]); // Updated dependencies
};

export default useSEO;