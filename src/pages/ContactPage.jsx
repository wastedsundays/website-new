// eslint-disable-next-line
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';


const ContactPage = () => {

useSEO({
    title: "Contact Me",
    description: "Get in touch with Adam H - Front End Developer specializing in modern web development",
    canonical: "https://www.adamh.ca/contact"
});

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