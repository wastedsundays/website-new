import { useState, useEffect } from 'react';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import useSEO from '../hooks/useSEO';

import FeaturedWork from '../components/FeaturedWork';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';
import Toolbox from '../components/Toolbox';



const HomePage = () => {
    const homeRestPath = `${REST_PATH}pages/158`;
    const featuredWorkPath = `${REST_PATH}ahdesigns-work?acf_format=standard&featured-work=2`;

    const [homeData, setHomeData] = useState([]);
    const [featuredWorkData, setFeaturedWorkData] = useState([]);
    const [homeLoaded, setHomeLoaded] = useState(false);

    useSEO({
        // title: "Home Page",
        canonical: "https://www.adamh.ca"
    });

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [homeResponse, featuredResponse] = await Promise.all([
                    fetch(homeRestPath),
                    fetch(featuredWorkPath)
                ]);

            if (!homeResponse.ok || !featuredResponse.ok) {
                console.error('Failed to fetch data:', homeResponse.status, featuredResponse.status);
            }

            const home = await homeResponse.json();
            const featured = await featuredResponse.json();
            setHomeData(home);
            setFeaturedWorkData(featured);
            }
            finally {
                setHomeLoaded(true);
            }
            };
        fetchHomeData();
        }, [homeRestPath, featuredWorkPath]);

    return (
        <>




        {homeLoaded ? (            
            <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            >

                <section className='hero-section'>

                    <div className='hero-overlay'>
                        <h1 className='step-7'>Adam H</h1>
                        <p>Front End Developer</p>
                    </div>
                    <div className='hero-image'>
                        {homeData.featured_images['2048x2048'] && (
                            <picture>
                                {/* Only add mobile source if mobile images exist */}
                                {homeData.featured_images['mobile-hero'] && (
                                    <source 
                                        media="(max-width: 768px)" 
                                        srcSet={
                                            homeData.featured_images['mobile-hero-2x'] 
                                                ? `${homeData.featured_images['mobile-hero-2x'].src} 2x, ${homeData.featured_images['mobile-hero'].src} 1x`
                                                : homeData.featured_images['mobile-hero'].src
                                        }
                                    />
                                )}
                                
                                {/* Desktop fallback */}
                                <img
                                    src={homeData.featured_images['2048x2048'].src}
                                    srcSet={homeData.featured_images['2048x2048'].srcset}
                                    sizes="(max-width: 768px) 100vw, 2048px"
                                    alt={homeData.featured_images['2048x2048'].alt}
                                    loading="eager"
                                    fetchPriority="high"
                                />
                            </picture>
                        )}
                    </div>

                </section>

                <section className='wp-home-section'>
                    <div className='wp-api-content'dangerouslySetInnerHTML={{ __html: homeData.content.rendered }}></div>
                </section>
                
                <section className='featured-work-section'>
                    <FeaturedWork featuredWorkData={featuredWorkData} />
                </section>

                    <section className='toolbox-section'>
                        <Toolbox /> 
                    </section>

                <section className='contact-section'>
                    <ContactForm />
                </section>
            </motion.main>
        ) : ( 
            <Loading />
        )}
        
        </>

    )
    }

export default HomePage;