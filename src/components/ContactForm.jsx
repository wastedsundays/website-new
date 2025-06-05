import { useContext, useState } from 'react';
import EmailContext from '../context/EmailContext';
import { useLocation } from 'react-router-dom';
import IconLinkedin from '../assets/IconLinkedin';
import IconGit from '../assets/IconGit';

const ContactForm = () => {
    const contactLocation = useLocation();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: '',
        website: '' // Honeypot field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitTime] = useState(Date.now()); // For timing check

    const { emailSent, setEmailSent } = useContext(EmailContext);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const sendEmail = async (event) => {
        event.preventDefault();
        
        // Prevent double submission
        if (isSubmitting) return;
        
        // Time-based spam check (form filled too quickly)
        const fillTime = Date.now() - submitTime;
        if (fillTime < 3000) { // Less than 3 seconds
            alert('Please take a moment to review your message.');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Use production URL - update this to your actual domain
            const endpoint = process.env.NODE_ENV === 'production' 
                ? 'https://adamh.ca/mail-endpoint.php'
                : 'http://localhost/mail-endpoint-dev.php';
                
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            
            if (response.ok && responseData.status === 'success') {
                setEmailSent(true);
            } else {
                const errorMessage = responseData.message || 'There was an error sending your message.';
                if (response.status === 429) {
                    alert('Too many requests. Please wait a moment before trying again.');
                } else if (response.status >= 400 && response.status < 500) {
                    alert(errorMessage); // Show validation errors
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            }

        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='contact-container'>
            {emailSent ? (
                <div className='contact-text-container'>
                    {contactLocation.pathname === '/contact' ? (
                        <h1 className='contact-heading step-6'>Thanks!</h1>
                        ) : (
                        <h2 className='contact-heading step-5'>Thanks!</h2>
                    )}
                    <p>Your message is on the way. I will be in touch shortly.</p>
                    <p>Here's some other ways to track me down:</p>
                    <div className='contact-socials'>
                        <a href='https://www.linkedin.com/in/adamhauck1/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn Profile' className='contact-icon'>
                        <IconLinkedin />
                        </a>
                        <a href='https://github.com/wastedsundays' target='_blank' rel='noopener noreferrer' aria-label='GitHub Profile' className='contact-icon'>
                        <IconGit />
                        </a>
                    </div>
                </div>
            ) : (
                <>
                <div className='contact-text-container'>
                    {contactLocation.pathname === '/contact' ? (
                        <h1 className='contact-heading step-6'>Hello!</h1>
                        ) : (
                        <h2 className='contact-heading step-5'>Hello!</h2>
                    )}
                    <p>I&apos;d love to hear from you! Whether you have a question about what I do (or about your current website), a collaboration opportunity, or you just want to say hi, feel free to reach out.</p>
                </div>
                <form className='contact-form' onSubmit={sendEmail}>
                    {/* Enhanced honeypot */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '-9999px', 
                        opacity: 0, 
                        pointerEvents: 'none' 
                    }}>
                        <label htmlFor='website'>Leave this field blank</label>
                        <input 
                            type='text' 
                            id='website' 
                            name='website' 
                            autoComplete='off' 
                            tabIndex='-1' 
                            onChange={handleChange} 
                            value={formData.website}
                        />
                    </div>
                    <div>
                        <label className='step--1' htmlFor='user_name'>Name *</label>
                        <input 
                            type='text' 
                            id='user_name' 
                            name='user_name' 
                            aria-required='true' 
                            required 
                            onChange={handleChange}
                            value={formData.user_name}
                            maxLength='100'
                        />
                    </div>
                    <div>
                        <label className='step--1' htmlFor='user_email'>Email *</label>
                        <input 
                            type='email' 
                            id='user_email' 
                            name='user_email' 
                            aria-required='true' 
                            required 
                            onChange={handleChange}
                            value={formData.user_email}
                            maxLength='254'
                        />
                    </div>
                    <div>
                        <label className='step--1' htmlFor='message'>Message *</label>
                        <textarea 
                            id='message' 
                            name='message' 
                            aria-required='true' 
                            required 
                            onChange={handleChange}
                            value={formData.message}
                            maxLength='2000'
                            rows='5'
                        ></textarea>
                    </div>

                    <button 
                        className='submit-button' 
                        type='submit' 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </form>
                </>
            )}
        </div>
    );
}

export default ContactForm;