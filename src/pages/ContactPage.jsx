// eslint-disable-next-line
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';


const ContactPage = () => {
    return (
        <>
        
            <title>Hello. Is It Me You're Looking For?</title>
            <meta name="description" content="Get In Touch with Adam, an experienced front-end developer, WordPress developer, and designer creating modern, responsive web applications with React, JavaScript, PHP, and intuitive UI/UX design. Specializing in custom WordPress themes and React development." />
            <meta name="keywords" content="front end developer, WordPress developer, web designer, React developer, JavaScript, PHP, WordPress themes, WordPress blocks, UI/UX design, responsive design, web development, portfolio" />
            <meta name="author" content="Adam H" />
            <link rel="canonical" href="https://www.adamh.ca/contact" />
        
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