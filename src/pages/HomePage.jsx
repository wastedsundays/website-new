import { useState, useEffect } from 'react';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';

import FeaturedWork from '../components/FeaturedWork';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';
import heroImage from '../images/241-2000x1000.jpg';


const HomePage = () => {
    const homeRestPath = `${REST_PATH}pages/158`;
    const featuredWorkPath = `${REST_PATH}ahdesigns-work?acf_format=standard&featured-work=2`;

    const [homeData, setHomeData] = useState([]);
    const [featuredWorkData, setFeaturedWorkData] = useState([]);
    const [homeLoaded, setHomeLoaded] = useState(false);

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
                    <div className='hero-image'>
                            <img src={heroImage} alt='Hero Image' />
                    </div>
                    <div className='hero-overlay'>
                        <h1 className='step-7'>Adam H</h1>
                        <p>Front End Developer</p>
                    </div>
                </section>

                <section className='wp-home-section'>
                    <div className='wp-api-content'dangerouslySetInnerHTML={{ __html: homeData.content.rendered }}></div>
                </section>
                
                <section className='featured-work-section'>
                    <FeaturedWork featuredWorkData={featuredWorkData} />
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