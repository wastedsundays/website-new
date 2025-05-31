// eslint-disable-next-line
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';


const ContactPage = () => {
    return (
        <>
        
        
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            >

            <section className='contact-section'>
                <ContactForm />
            </section>
        </motion.main>
        </>
    );
    };

export default ContactPage;