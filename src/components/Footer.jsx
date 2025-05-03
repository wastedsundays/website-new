import EmailContext from '../context/EmailContext';
import { useContext } from 'react';
import IconLinkedin from '../assets/IconLinkedin';
import IconGit from '../assets/IconGit';

const Footer = () => {
    const { emailSent } = useContext(EmailContext)

    const year = new Date().getFullYear();

    return (
        <footer>
            <p>&copy; {year} <span>A</span>dam <span>H</span>.</p>
            {!emailSent && (

                <div className='footer-icons'>
                <a href="https://www.linkedin.com/in/adamhauck1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <IconLinkedin /> 
                </a>
                <a href="https://github.com/wastedsundays" target="_blank" rel="noopener noreferrer" aria-label="GitHub">              
                    <IconGit />
                </a>
                </div>
                )}
        </footer>
    );
}   

export default Footer;