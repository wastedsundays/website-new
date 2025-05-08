import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REST_PATH } from '../globals/globals';

const OtherWork = ({ id }) => {

    const otherWorkRestPath = `${ REST_PATH }ahdesigns-work?acf_format=standard&featured-work=2`;
    const [otherWorkData, setOtherWorkData] = useState([]);
    const [isOtherLoaded, setIsOtherLoaded] = useState(false);
    const [randomWork, setRandomWork] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(otherWorkRestPath);
                if (!response.ok) {
                    setIsOtherLoaded(false);
                    throw new Error('Failed to fetch data');
                } else {
                    const data = await response.json();
                    setOtherWorkData(data);
                    setIsOtherLoaded(true);
                }
                } catch (error) {
                    console.error(error);
                    setIsOtherLoaded(false);
                }
            };

        fetchData();
    }, [otherWorkRestPath]);

    useEffect(() => {
        if (isOtherLoaded) {
            const otherProjects = otherWorkData.filter(project => project.id !== id);
            if (otherProjects.length <=3) {
                setRandomWork(otherProjects);
            } else {
                const randomProjects = [];
                const selectedIndices = [];
                while (randomProjects.length < 3) {
                    const randomIndex = Math.floor(Math.random() * otherProjects.length);
                    if (!selectedIndices.includes(randomIndex) && otherProjects[randomIndex]) {
                        selectedIndices.push(randomIndex);
                        randomProjects.push(otherProjects[randomIndex]);
                    } 
            }
            setRandomWork(randomProjects);
            }   
        }
    }, [isOtherLoaded, otherWorkData, id]);

    return (
        <>
            {isOtherLoaded && randomWork.length > 0 ? (

                <div className='other-work-container'>
                    <h2 className='step-4'>Other Work</h2>
                    <div className='other-work-grid'>
                        {randomWork.map((project, i) => (
                            <div className='other-project-card' key={i}>
                                <Link to={`/work/${project.slug}`}>
                                    {project.featured_images['medium'] && (
                                        <img
                                        src={project.featured_images['medium'].src} 
                                        srcSet={project.featured_images['medium'].srcset}
                                        alt={project.featured_images['medium'].alt}
                                        />
                                    )}
                                    <h3 className='project-card-title'>{project.title.rendered}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : isOtherLoaded && randomWork.length === 0 ? (
                <></>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
};

export default OtherWork;