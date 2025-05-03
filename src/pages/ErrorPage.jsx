// eslint-disable-next-line
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}>
            <div>
                <h1>Error Page</h1>
                <p>This page is the 404 error page</p>
            </div>
        </motion.div>
    );
    };

export default ErrorPage;
