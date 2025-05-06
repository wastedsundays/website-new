// eslint-disable-next-line
import { motion } from 'framer-motion';


const ContactPage = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            >

            <section className='contact'>
                <p>Contact form goes here</p>
            </section>
        </motion.main>
    );
    };

export default ContactPage;