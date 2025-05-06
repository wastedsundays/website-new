import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import Loading from '../components/Loading';
import Toolbox from '../components/Toolbox';



const AboutPage = () => {

    const aboutRestPath = `${ REST_PATH }pages/104`;

    const [aboutRestData, setAboutRestData] = useState([]);
    const [aboutLoaded, setAboutLoaded] = useState(false);

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
                        <div className='hero-image'>
                            <img src="https://picsum.photos/2000/1000" alt="Hero" />
                        </div>
                        <div className='hero-image-overlay'>
                            <h1>About Page</h1>
                        </div>
                    </section>
                        <h2>{aboutRestData.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{ __html: aboutRestData.content.rendered }} />
                        <section className='toolbox-section'>
                            <Toolbox /> 
                        </section>
                        <section className='contact-form-section'>
                            <p>Contact Form Goes Here</p>
                        </section>

            </motion.main>
        ) : (
            <Loading />
        )}
        
        </>

    );
    };

export default AboutPage;