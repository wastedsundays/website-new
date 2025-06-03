// eslint-disable-next-line
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import errorImageWhite from '/images/error-image-white.png'

const ErrorPage = () => {

    useSEO({
        title: "End of the Internet",
        description: "The page you're looking for does not exist. Please check the URL or return to the homepage.",
        robots: "noindex, nofollow"
    });
    return (
        <motion.div className='error-page-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}>
            <div className='error-page'>
                <h1>WHOOPS</h1>
                <p>It seems the page you're looking for does not exist. Please check the URL or return to the homepage.</p>
                <figure className='error-image'>
                    <img src={errorImageWhite} alt="Error" />
                    <figcaption>Does anyone know where this wire goes?</figcaption>
                </figure>
            </div>
        </motion.div>
    );
    };

export default ErrorPage;
