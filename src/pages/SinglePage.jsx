import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import useSEO from '../hooks/useSEO';

import OtherWork from "../components/OtherWork";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";
import ContactForm from "../components/ContactForm";



const SinglePage = () => {

    const { slug } = useParams();
    const [ projectData, setProjectData ] = useState(null);
    const [ toolsData, setToolsData ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);

    const projectRestPath = `${REST_PATH}ahdesigns-work?acf_format=standard&slug=${slug}&embed`;
    const projectToolsPath = `${REST_PATH}ahdesigns-tools?acf_format=standard&per_page=100`;

    useSEO({
        title: projectData && projectData.length > 0 ? projectData[0].title.rendered : 'Project',
        description: projectData && projectData.length > 0 && projectData[0].acf.project_meta 
            ? projectData[0].acf.project_meta.replace(/<[^>]*>/g, '').substring(0, 160) // Strip HTML and limit length
            : 'View this project by Adam H - Front End Developer',
        keywords: projectData && projectData.length > 0 && projectData[0].acf.work_tools
            ? `${projectData[0].title.rendered}, ${projectData[0].acf.work_tools.map(tool => tool.post_title).join(', ')}, portfolio, web development`
            : 'portfolio, web development, project',
        image: projectData && projectData.length > 0 && projectData[0].featured_images && projectData[0].featured_images['2048x2048']
            ? projectData[0].featured_images['2048x2048'].src
            : '/default-og-image.jpg',
        type: 'article',
        canonical: `https://www.adamh.ca/work/${slug}`,
        jsonLd: {
            '@type': 'CreativeWork',
            '@id': `https://www.adamh.ca/work/${slug}#work`,
            url: `https://www.adamh.ca/work/${slug}`,
            name: projectData && projectData.length > 0 ? projectData[0].title.rendered : 'Project',
            description: projectData && projectData.length > 0 && projectData[0].acf.project_meta 
        }
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [projectResponse, toolsResponse] = await Promise.all([
              fetch(projectRestPath),
              fetch(projectToolsPath),
            ]);
            
            if (!projectResponse.ok || !toolsResponse.ok) {
              console.error("Failed to fetch data");
            }
    
            const project = await projectResponse.json();
            const tools = await toolsResponse.json();
    
            setProjectData(project);
            setToolsData(tools);
          } 
          finally {
            setLoaded(true);
          }
        };
    
        fetchData();
        // eslint-disable-next-line
        }, [slug]);

    const getToolImage = (toolTitle) => {
        const tool = toolsData.find(tool => tool.title.rendered === toolTitle)
        return tool ? tool.acf.tool_image : null
    }



    return (
        <>

        { loaded ? (
            
            <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            >

                {projectData && projectData.length > 0 ? (
                    <>

                        <section className='hero-section'>

                            <div className='hero-overlay'>
                                <h1 className='step-5'>{projectData[0].title.rendered}</h1>
                            </div>
                            <div className='hero-image'>
                                {projectData[0].featured_images['2048x2048'] && (
                                    <picture>
                                        {/* Only add mobile source if mobile images exist */}
                                        {projectData[0].featured_images['mobile-hero'] && (
                                            <source 
                                                media="(max-width: 768px)" 
                                                srcSet={
                                                    projectData[0].featured_images['mobile-hero-2x'] 
                                                        ? `${projectData[0].featured_images['mobile-hero-2x'].src} 2x, ${projectData[0].featured_images['mobile-hero'].src} 1x`
                                                        : projectData[0].featured_images['mobile-hero'].src
                                                }
                                            />
                                        )}
                                        
                                        {/* Desktop fallback */}
                                        <img
                                            src={projectData[0].featured_images['2048x2048'].src}
                                            srcSet={projectData[0].featured_images['2048x2048'].srcset}
                                            sizes="(max-width: 768px) 100vw, 2048px"
                                            alt={projectData[0].featured_images['2048x2048'].alt}
                                            loading="eager"
                                            fetchPriority="high"
                                        />
                                    </picture>
                                )}
                            </div>

                        </section>

                        <section className='project-details-section'>
                                <div className='project-overview'>
                                    <h2 className='step-4'>Overview</h2>
                                    {projectData[0].acf.project_description && (
                                    <div className='project-description' dangerouslySetInnerHTML={{__html:projectData[0].acf.project_description}}></div>
                                        
                                    )}
                                </div>
                                {(projectData[0].acf.live_project_site || projectData[0].acf.project_repo) && (
                                    <div className='project-links'>
                                        {projectData[0].acf.live_project_site && 
                                            (<a href={projectData[0].acf.live_project_site} target='_blank' rel='noreferrer' className='primary-button' aria-label='View Live Project Site'>
                                                See It
                                            </a>)
                                        }

                                        {projectData[0].acf.project_repo &&
                                            (<a href={projectData[0].acf.project_repo} target='_blank' rel='noreferrer' className='primary-button' aria-label='View Project Repository'>
                                                GitHub
                                            </a>)
                                        }
                                    </div>
                                )}

                                <div className='project-api-content' dangerouslySetInnerHTML={{__html:projectData[0].content.rendered}}></div>

                        </section>

                        <section className='project-tools-container'>
                            {projectData[0].acf.work_tools && projectData[0].acf.work_tools.length > 0 && (
                            <div>
                                <h2 className='step-4'>Toolbox</h2>
                                <p className='step--1'>How it was made</p>
                                
                                <div className='project-tools'>                              
                                    {projectData[0].acf.work_tools.map((tool, i) => (
                                        <div key={i}>
                                            <div className={tool.post_title}>                                     
                                                <img src={getToolImage(tool.post_title)} alt={`${tool.post_title} icon card`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            )}

                        </section>
                        <div>
                            <OtherWork id={projectData[0].id} />
                        </div>
                        <section className='contact-section'>
                            <ContactForm />
                        </section>
                        
                    </>
                ) : (
                 
                    <ErrorPage />
                )}
                

            </motion.main>
        
        ) : (
            <Loading />
        )
        }
        </>
    )

}

export default SinglePage;