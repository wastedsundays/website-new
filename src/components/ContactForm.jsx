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
        message: ''
    });

    const { emailSent, setEmailSent } = useContext(EmailContext);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const sendEmail = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost/mail-endpoint.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const responseText = await response.text();
            console.log(responseText);
            console.log('Response:', response.status)

            if (response.ok) {
                setEmailSent(true);
            } else {
                alert('There was an error sending your message. Please try again. Response Not Ok.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
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

                    <p>I&apos;d love to hear from you! Whether you have a question about what I do (or about your current website), a collaboration opportunity,  or you just want to say hi, feel free to reach out.</p>
                </div>
                <form className='contact-form' onSubmit={sendEmail}>
                    <div style={{ display: 'none'}}>
                        <label htmlFor='website'>Leave this field blank</label>
                        <input type='text' id='website' name='website' autoComplete='off' tabIndex='-1' onChange={handleChange} />
                    </div>
                    <div>
                        <label className='step--1' htmlFor='user_name'>Name *</label>
                        <input type='text' id='user_name' name='user_name' aria-required='true' required onChange={handleChange}/>
                    </div>
                    <div>
                        <label className='step--1' htmlFor='user_email'>Email *</label>
                        <input type='email' id='user_email' name='user_email' aria-required='true' required onChange={handleChange}/>
                    </div>
                    <div>
                        <label className='step--1' htmlFor='message'>Message *</label>
                        <textarea id='message' name='message' aria-required='true' required onChange={handleChange}></textarea>
                    </div>

                    <button className='secondary-button' type='submit' value='Send'>Send</button>

                </form>
                </>
            )}
        </div>
    );
}

export default ContactForm;