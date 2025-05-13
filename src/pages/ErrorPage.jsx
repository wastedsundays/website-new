// eslint-disable-next-line
import { motion } from 'framer-motion';
import errorImageWhite from '../images/error-image-white.jpg'

const ErrorPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}>
            <div>
                <h1>Error Page</h1>
                <img src={errorImageWhite} alt="Error" />
            </div>
        </motion.div>
    );
    };

export default ErrorPage;
