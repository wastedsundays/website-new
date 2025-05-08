import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';

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
                            <div className='hero-image'>
                                {projectData[0].featured_images['2048x2048'] && (
                                    <img
                                        src={projectData[0].featured_images['2048x2048'].src}
                                        srcSet={projectData[0].featured_images['2048x2048'].srcset}
                                        sizes='100vw'
                                        alt={projectData[0].featured_images['2048x2048'].alt}
                                        className='featured-work-image'
                                    />
                                )}
                            </div>
                            <div className='hero-overlay'>
                                <h1 className='step-5'>{projectData[0].title.rendered}</h1>
                                
                            </div>
                        </section>

                        <section className='project-details'>
                            <h2>Details</h2>

                            <div className='project-description'>
                                            <p>{projectData[0].acf.project_description}</p>
                            </div>

                            <div dangerouslySetInnerHTML={{__html:projectData[0].content.rendered}}></div>
                            <div className='project-links'>
                                {projectData[0].acf.live_project_site && 
                                            (<a href={projectData[0].acf.live_project_site} target='_blank' rel='noreferrer' className='primary-button'>
                                                See It
                                            </a>)
                                            }

                                {projectData[0].acf.project_repo &&
                                    (<a href={projectData[0].acf.project_repo} target='_blank' rel='noreferrer' className='primary-button'>
                                        GitHub
                                        </a>)
                                }
                            </div>
                        </section>

                        <section className='project-tools-container'>
                            {projectData[0].acf.work_tools && projectData[0].acf.work_tools.length > 0 && (
                            <div>
                                <h2 style={{color: projectData[0].acf.project_primary_color}}>Toolbox</h2>
                                
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
                            <OtherWork id={[projectData[0].id]} />
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