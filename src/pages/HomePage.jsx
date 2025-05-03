import { useState, useEffect } from 'react';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { REST_PATH } from '../globals/globals';
import FeaturedWork from '../components/FeaturedWork';



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
            <>
                <h1>Home Page</h1>
                
                <section className='featured-work-section'>
                    <FeaturedWork featuredWorkData={featuredWorkData} />
                </section>

                <section className='wp-content'>
                    <div dangerouslySetInnerHTML={{ __html: homeData.content.rendered }}></div>
                </section>
            </>
        ) : ( 
            <p>Loading...</p>
        )}
        
        </>

    )
    }

export default HomePage;