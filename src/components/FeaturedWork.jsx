import { Link } from 'react-router-dom';

const FeaturedWork = ({featuredWorkData}) => {
  
    const shuffleArray = (array) => {
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomizeData  = (data) => {
        const shuffledData = shuffleArray([...data]);
        const displayData = shuffledData.slice(0, 4);
        return displayData;
    }

    const featuredItems = randomizeData(featuredWorkData);
    console.log('Featured Items:', featuredItems);


    return (
        <>
            <div className='featured-work-container project-display-container'>
                <p>Featured Work Section</p>
                {featuredItems.map((project, i) => (
                    <article key={i} className = 'featured-work-card'>
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
                    </article>

                ))}
            </div>

            <div className='all-work-button'>
                <Link to='/work' className='secondary-button'>View All Work</Link>
            </div>
        </>
    );
};

export default FeaturedWork;