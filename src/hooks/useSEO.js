// useSEO.js - Custom hook that works with StrictMode and dynamic data
import { useEffect, useRef } from 'react';

const useSEO = ({
  title = 'Adam H. - Front End Developer',
  description = 'Adam H - Experienced front-end developer and designer creating modern, responsive web applications with WordPress, React, JavaScript, and intuitive UI/UX design. View my portfolio of projects and get in touch.',
  keywords = 'WordPress, React, PHP, HTML, CSS, JavaScript, SQL, Figma, Illustrator, Photoshop, Web Development, Website Design, Freelance Developer, Custom WordPress themes, Vancouver, Canada, Remote, Responsive Design, Accessibility, SEO, Performance Optimization',
  image = '/default-og-image.jpg',
  type = 'website',
  robots = 'index, follow', // Added robots parameter with default
  canonical = null, // Added canonical parameter
  // JSON-LD structured data parameters
  jsonLd = {
    '@type': 'Person',
    '@id': null, // Will use canonical URL if provided
    url: 'https://www.adamh.ca',
    name: 'Adam H',
    description: 'Experienced front-end developer and designer creating modern, responsive web applications'
  }
}) => {

  // Handle cases where data might be null/undefined (still loading)
  const safeTitle = title || 'Adam H. - Front End Developer';
  const safeDescription = description || 'Adam H - Experienced front-end developer and designer creating modern, responsive web applications with WordPress, React, JavaScript, and intuitive UI/UX design. View my portfolio of projects and get in touch.';
  const safeKeywords = keywords || 'WordPress, React, PHP, HTML, CSS, JavaScript, SQL, Figma, Illustrator, Photoshop, Web Development, Website Design, Freelance Developer, Custom WordPress themes, Vancouver, Canada, Remote, Responsive Design, Accessibility, SEO, Performance Optimization';
  const safeImage = image || '/default-og-image.jpg';
  const safeRobots = robots || 'index, follow'; // Added safe robots
  const safeCanonical = canonical; // Keep null if not provided
  
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

    // Function to create or update JSON-LD script tag
    const setJsonLdScript = (data) => {
      const selector = 'script[type="application/ld+json"]';
      let element = document.querySelector(selector);
      
      if (!element) {
        // Create new element
        element = document.createElement('script');
        element.type = 'application/ld+json';
        document.head.appendChild(element);
        createdTags.current.add(selector);
      }
      
      // Update content
      element.textContent = JSON.stringify(data, null, 2);
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

        // Create JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": jsonLd['@type'] || 'Person',
      "@id": jsonLd['@id'] || safeCanonical || undefined,
      "name": jsonLd.name || 'Adam H',
      "jobTitle": "Front-End Developer & Designer",
      "description": jsonLd.description || safeDescription,
      "url": jsonLd.url || 'https://www.adamh.ca',
      "sameAs": [
        "https://www.linkedin.com/in/adamhauck1/",
        "https://github.com/wastedsundays"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "knowsAbout": ["React", "WordPress", "JavaScript", "PHP", "Web Design", "Web Development", "UI/UX Design"]
    };

    // Remove undefined values from structured data
    Object.keys(structuredData).forEach(key => {
      if (structuredData[key] === undefined) {
        delete structuredData[key];
      }
    });

    // Set JSON-LD script
    setJsonLdScript(structuredData);

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