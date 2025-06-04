// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { REST_PATH } from '../globals/globals';
import useSEO from '../hooks/useSEO';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';
import heroImageWork from '../images/210-2000x1000.jpg';

const WorkPage = () => {
    const workRestPath = `${REST_PATH}ahdesigns-work?acf_format=standard`;
    const workIntroPath = `${REST_PATH}pages/263?acf_format=standard`;

    const [workData, setWorkData] = useState([]);
    const [workIntroData, setWorkIntroData] = useState(null);
    const [workLoaded, setWorkLoaded] = useState(false);
    const [introLoaded, setIntroLoaded] = useState(false);

    const allDataLoaded = workLoaded && introLoaded;

    useSEO({
        title: "My Work",
        description: "Explore Adam H's portfolio of web development projects featuring WordPress sites, React applications, and custom designs. See examples of modern, responsive websites built with attention to detail and user experience.",
        canonical: "https://www.adamh.ca/work",
        jsonLd: {
            '@type': 'CreativeWork',
            '@id': 'https://www.adamh.ca/work#work',
            url: 'https://www.adamh.ca/work',
            name: 'Adam H - My Work',
            description: 'Explore Adam H\'s portfolio of web development projects featuring WordPress sites, React applications, and custom designs. See examples of modern, responsive websites built with attention to detail and user experience.'
        }
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch both API endpoints simultaneously
                const [workResponse, introResponse] = await Promise.all([
                    fetch(workRestPath),
                    fetch(workIntroPath)
                ]);

                // Handle work data
                if (!workResponse.ok) {
                    setWorkLoaded(false);
                    console.error('There was a problem fetching the work data');
                } else {
                    const workFetched = await workResponse.json();
                    setWorkData(workFetched);
                    setWorkLoaded(true);
                }

                // Handle intro data
                if (!introResponse.ok) {
                    setIntroLoaded(false);
                    console.error('There was a problem fetching the intro data');
                } else {
                    const introFetched = await introResponse.json();
                    setWorkIntroData(introFetched);
                    setIntroLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setWorkLoaded(false);
                setIntroLoaded(false);
            }
        };

        fetchAllData();
    }, [workRestPath, workIntroPath]);

    // Generate animation variants with custom delay for each card
    const getItemVariants = (index) => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2 // 0.2 second delay between each item
            }
        }
    });

    return (
        <>

            {allDataLoaded ? (
                <>
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <section className='hero-section'>
                            <div className='hero-image'>
                                <img src={heroImageWork} alt="Hero" />
                            </div>
                            <div className='hero-overlay'>
                                <h1 className='step-6'>My Work</h1>
                            </div>
                        </section>
                        
                        <section className='work-display'> 
                            <div className='work-intro'dangerouslySetInnerHTML={{ __html: workIntroData.acf.work_intro_text }}></div>
                            <div className='work-grid'>
                                {workData.map((project, i) => {
                                    // Check if the project should have the 'featured-project' class
                                    const projectClass = project["featured-work"][0] === 2 ? 'project-card featured-project' : 'project-card';

                                    return (
                                        <motion.article 
                                            className={projectClass} 
                                            key={project.id || i}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.5 }}
                                            variants={getItemVariants(i % 4)} // Reset stagger effect every 4 items
                                        >
                                            <Link to={`/work/${project.slug}`} >
                                                {project.featured_images['medium_large'] && (
                                                    <img 
                                                        src={project.featured_images['medium_large'].src}
                                                        srcSet={project.featured_images['medium_large'].srcSet}
                                                        sizes='(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw'
                                                        alt={project.featured_images['medium_large'].alt} 
                                                        className='featured-work-image'
                                                    />
                                                )}
                                                <h2>{project.title.rendered}</h2>
                                            </Link>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className='contact-section'>
                            <ContactForm />
                        </section>
                        
                    </motion.main>                        
                </>
            ) : (
                <Loading />
            )}            
        </>
    );
};

export default WorkPage;