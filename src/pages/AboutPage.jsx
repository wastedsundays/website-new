import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import Loading from '../components/Loading';
import Toolbox from '../components/Toolbox';
import ContactForm from '../components/ContactForm';
import heroImageAbout from '../images/483-2000x1000.jpg';



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
            <title>About Me | Adam H</title>
            <meta name="description" content="Learn some other things about Adam, an experienced front-end developer, WordPress developer, and designer creating modern, responsive web applications with React, JavaScript, PHP, and intuitive UI/UX design. Specializing in custom WordPress themes and React development." />
            <meta name="keywords" content="front end developer, WordPress developer, web designer, React developer, JavaScript, PHP, WordPress themes, WordPress blocks, UI/UX design, responsive design, web development, portfolio" />
            <meta name="author" content="Adam H" />
            <link rel="canonical" href="https://www.adamh.ca/about" />
        {aboutLoaded ? (
            <motion.main className='about-page'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}>                    
                    <section className='hero-section'>
                        <div className='hero-image'>
                            <img src={heroImageAbout} alt="Hero" />
                        </div>
                        <div className='hero-overlay'>
                            <h1 className='step-6'>About Adam</h1>
                        </div>
                    </section>
                    <section className='intro-section'>
                        <h2 className='step-5'>Making Things</h2>
                        <p>{aboutRestData.acf.about_preamble}</p>
                    </section>    
                    <section className='toolbox-section'>
                        <Toolbox /> 
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