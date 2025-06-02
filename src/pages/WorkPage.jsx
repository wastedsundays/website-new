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

    const [workData, setWorkData] = useState([]);
    const [workLoaded, setWorkLoaded] = useState(false);

    useSEO({
        title: "My Work",
        description: "Adam H - Front End Developer specializing in modern web development"
    });

    useEffect(() => {
        const fetchWorkData = async () => {
            const workResponse = await fetch(workRestPath);
            if (!workResponse.ok) {
                setWorkLoaded(false);
                console.error('There was a problem fetching the work data');
                return;
            } else {
                const workFetched = await workResponse.json();
                setWorkData(workFetched);
                setWorkLoaded(true);    
            }
        }
        fetchWorkData();
    }, [workRestPath]);

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

            {workLoaded ? (
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
                            <div className='work-intro'>
                                <p>Welcome to where the magic happens! As a front-end developer with a designer's eye and a data wizard's mind, I craft experiences that are as functional as they are beautiful.</p>
                                <p>Each project here represents a unique challenge—whether it's building lightning-fast interfaces, wrangling complex databases, or creating visual designs that tell a story. Dive in, click around, and see how I transform ideas into digital reality.</p>
                                <p>When I'm not nerding out over clean code or pixel-perfect designs, I'm probably tinkering with new tech or finding creative ways to visualize data. Every project is a puzzle, and I've never met one I didn't want to solve.</p>
                                <p>Go ahead—explore my digital handiwork and see what happens when technical skills meet creative thinking.</p>
                            </div>
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