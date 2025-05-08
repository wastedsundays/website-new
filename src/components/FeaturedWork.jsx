import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedWork = ({featuredWorkData}) => {
  // Use state to store the randomized data
  const [featuredItems, setFeaturedItems] = useState([]);
  
  // Randomize only once when the component mounts or when featuredWorkData changes
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const randomizeData = (data) => {
      if (!data || data.length === 0) return [];
      const shuffledData = shuffleArray([...data]);
      const displayData = shuffledData.slice(0, 4);
      return displayData;
    };
    
    setFeaturedItems(randomizeData(featuredWorkData));
  }, [featuredWorkData]);

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
      <div className='featured-work-container'>
        <h2 className='step-5'>Featured Work</h2>
        <div className='featured-work-grid'>
          {featuredItems.map((project, i) => (
            <motion.article 
              key={project.id || i} 
              className='featured-work-card'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={getItemVariants(i)}
            >
              <Link to={`/work/${project.slug}`} className=''>
                <img 
                  src={project.featured_images['medium_large'].src}
                  srcSet={project.featured_images['medium_large'].srcSet}
                  sizes='(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw'
                  alt={project.featured_images['medium_large'].alt} 
                  className='featured-work-image'
                />
                <h3 className='project-card-title'>{project.title.rendered}</h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      <div className='all-work-button'>
        <Link to='/work' className='secondary-button'>View All Work</Link>
      </div>
    </>
  );
};

export default FeaturedWork;