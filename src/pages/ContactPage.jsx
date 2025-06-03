// eslint-disable-next-line
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';


const ContactPage = () => {

useSEO({
    title: "Contact Me",
    description: "Get in touch with Adam H for your next web development project or employment opportunity. Available for freelance work, full-time positions, and remote opportunities in Vancouver and beyond. Let's discuss your WordPress, React, or custom development and design needs",
    canonical: "https://www.adamh.ca/contact",
    jsonLd: {
        '@type': 'ContactPage',
        '@id': 'https://www.adamh.ca/contact#contact',
        url: 'https://www.adamh.ca/contact',
        name: 'Contact Adam H',
        description: 'Get in touch with Adam H for your next web development project or employment opportunity. Available for freelance work, full-time positions, and remote opportunities in Vancouver and beyond. Let\'s discuss your WordPress, React, or custom development and design needs.'
    }
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