// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { REST_PATH } from '../globals/globals';
import Loading from '../components/Loading';
import ContactForm from '../components/ContactForm';
import heroImageWork from '../images/210-2000x1000.jpg';

const WorkPage = () => {
    const workRestPath = `${REST_PATH}ahdesigns-work?acf_format=standard`;

    const [workData, setWorkData] = useState([]);
    const [workLoaded, setWorkLoaded] = useState(false);

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
    }
    , [workRestPath]);


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
                            <div className='hero-image-overlay'>
                                <h1>My Work</h1>
                                
                            </div>
                        </section>
                        
                         <section className='work-display'> 
                           {workData.map((project, i) => {
                            // Check if the project should have the 'featured-project' class
                            const projectClass = project["featured-work"][0] === 2 ? 'project-card featured-project' : 'project-card';

                            return (
                            <article className={projectClass} key={i}>
                                <Link to={`/work/${project.slug}`} >
                                {project.featured_images['medium_large'] && (
                                <img 
                                    src={project.featured_images['medium_large'].src}
                                    srcSet={project.featured_images['medium_large'].srcSet}
                                    sizes='(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw'
                                    alt={project.featured_images['medium_large'].alt} 
                                    className='featured-work-image'
                                />)}
                                <h3>{project.title.rendered}</h3>
                                </Link>
                            </article>
                            );
                            })}
                        </section>

                        <section className='contact'>
                            <ContactForm />
                        </section>
                        
                    </motion.main>                        
                </>
            ) : (
                <Loading />
            )        
        }            
        </>
    );
    };

export default WorkPage;