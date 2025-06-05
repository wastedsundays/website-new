import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import useSEO from '../hooks/useSEO';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';



const AboutPage = () => {

    const aboutRestPath = `${ REST_PATH }pages/104?acf_format=standard`;

    const [aboutRestData, setAboutRestData] = useState([]);
    const [aboutLoaded, setAboutLoaded] = useState(false);

    useSEO({
        title: "About Me",
        description: "Learn about Adam H, a front-end developer and designer from Vancouver specializing in React, WordPress, and modern web development. Discover my background, and a few other fun facts.",
        canonical: "https://www.adamh.ca/about",
        jsonLd: {
            '@type': 'Person',
            '@id': 'https://www.adamh.ca/about#person',
            url: 'https://www.adamh.ca/about',
            name: 'Adam H',
            description: 'Learn about Adam H, a front-end developer and designer from Vancouver specializing in React, WordPress, and modern web development.'
        }
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            const response = await fetch(aboutRestPath);
            if (!response.ok) {
                setAboutLoaded(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const about = await response.json();
                setAboutRestData(about);
                setAboutLoaded(true);
            }
        }
        fetchAboutData();
    }
    , [aboutRestPath]);

    return (
        <>

        {aboutLoaded ? (
            <motion.main className='about-page'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}>                    

                    <section className='hero-section'>

                        <div className='hero-overlay'>
                            <h1 className='step-6'>About Adam</h1>
                        </div>
                        <div className='hero-image'>
                            {aboutRestData.featured_images['2048x2048'] && (
                                <picture>
                                    {/* Only add mobile source if mobile images exist */}
                                    {aboutRestData.featured_images['mobile-hero'] && (
                                        <source 
                                            media="(max-width: 768px)" 
                                            srcSet={
                                                aboutRestData.featured_images['mobile-hero-2x'] 
                                                    ? `${aboutRestData.featured_images['mobile-hero-2x'].src} 2x, ${aboutRestData.featured_images['mobile-hero'].src} 1x`
                                                    : aboutRestData.featured_images['mobile-hero'].src
                                            }
                                        />
                                    )}
                                    
                                    {/* Desktop fallback */}
                                    <img
                                        src={aboutRestData.featured_images['2048x2048'].src}
                                        srcSet={aboutRestData.featured_images['2048x2048'].srcset}
                                        sizes="(max-width: 768px) 100vw, 2048px"
                                        alt={aboutRestData.featured_images['2048x2048'].alt}
                                        loading="eager"
                                        fetchPriority="high"
                                    />
                                </picture>
                            )}
                        </div>

                    </section>
                    <section className='intro-section'>
                        <div dangerouslySetInnerHTML={{ __html: aboutRestData.acf.about_preamble }} />
                    </section>    

                    <section className='about-details-section'>
                        <div dangerouslySetInnerHTML={{ __html: aboutRestData.content.rendered }} />
                    </section>
                    

                    
                    <section className='contact-section'>
                        <ContactForm />
                    </section>

            </motion.main>
        ) : (
            <Loading />
        )}
        
        </>

    );
    };

export default AboutPage;