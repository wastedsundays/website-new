import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);

    const [menuStatus, setMenuStatus] = useState("closed");
    const toggleMenu = () => {
        setMenuStatus(menuStatus === "closed" ? "open" : "closed");

        if (menuStatus === "open") {
            // document.body.style.overflow = "auto";
        } else {
            // document.body.style.overflow = "hidden";
        }
    };

    const closeMenu = () => {
        setMenuStatus("closed");
        // document.body.style.overflow = "auto";
    };

    const handleResize = () => {
        if (window.innerWidth > 800) {
            setMenuStatus("closed");
            // document.body.style.overflow = "auto";
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        switch (true) {
            case location.pathname === "/":
                setActiveTab(0);
                break;
            case location.pathname.includes("/work"):
                setActiveTab(1);
                break;
            case location.pathname === "/about":
                setActiveTab(2);
                break;
            case location.pathname === "/contact":
                setActiveTab(3);
                break;
            default:
                setActiveTab(null);
                break;
        }
    }, [location]);

    return (
        <>
            <nav className={`${menuStatus}`}>
                <ul>
                    <li className={activeTab === 0 ? 'active-menu-item' : 'menu-item'}><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li className={activeTab === 1 ? 'active-menu-item' : 'menu-item'}><Link to="/work" onClick={closeMenu}>Work</Link></li>
                    <li className={activeTab === 2 ? 'active-menu-item' : 'menu-item'}><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li className={activeTab === 3 ? 'active-menu-item' : 'menu-item'}><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
                <ThemeToggle />
            </nav>
            <button className=
                            {`hamburger-button ${menuStatus}`} 
                            onClick={toggleMenu}
                            aria-label={menuStatus === "open" ? "Close menu" : "Open menu"}
                            aria-expanded={menuStatus === "open"}>
                            
                            <svg id="svg-a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.99 23.25"><path d="M102.99,12.81c-2.37.19-3.3,1.85-2.8,4.97l-4.33,2.88-1.37-1.05.19,1.17c-17.41-2.94-37.06-3.29-58.95-1.04l-7.08.72-.98,1.36-1.18.12-1.37-1.05.19,1.17-1.37-1.05-8.08,2-2.36.24c-5.72-3.36-9.96-4.91-12.74-4.65l-.75-4.68,1.43-6.02,8.45.33,3.96-5.22,17.88-.69L52.96.11l3.92,1.98,4.72-.48.99-1.29,1.18-.12.38,2.34,1.18-.12.99-1.29,22.98,1.17-.19-1.17,1.37,1.05,7.07-.78.99-1.29,1.18-.12,3.26,12.81ZM10.26,10.57l-5.9.6,2.73,2.03,3.55-.29-.38-2.34ZM57.07,3.26l-7.07.78.19,1.17,7.07-.78-.19-1.17ZM67.88,3.36l-7.08.72.19,1.17,7.08-.72-.19-1.17ZM79.86,3.27l-8.25.9.19,1.17,8.25-.9-.19-1.17Z"/></svg>
                            <svg id="svg-b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.99 23.25"><path d="M102.99,12.81c-2.37.19-3.3,1.85-2.8,4.97l-4.33,2.88-1.37-1.05.19,1.17c-17.41-2.94-37.06-3.29-58.95-1.04l-7.08.72-.98,1.36-1.18.12-1.37-1.05.19,1.17-1.37-1.05-8.08,2-2.36.24c-5.72-3.36-9.96-4.91-12.74-4.65l-.75-4.68,1.43-6.02,8.45.33,3.96-5.22,17.88-.69L52.96.11l3.92,1.98,4.72-.48.99-1.29,1.18-.12.38,2.34,1.18-.12.99-1.29,22.98,1.17-.19-1.17,1.37,1.05,7.07-.78.99-1.29,1.18-.12,3.26,12.81ZM10.26,10.57l-5.9.6,2.73,2.03,3.55-.29-.38-2.34ZM57.07,3.26l-7.07.78.19,1.17,7.07-.78-.19-1.17ZM67.88,3.36l-7.08.72.19,1.17,7.08-.72-.19-1.17ZM79.86,3.27l-8.25.9.19,1.17,8.25-.9-.19-1.17Z"/></svg>
                            <svg id="svg-c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.99 23.25"><path d="M102.99,12.81c-2.37.19-3.3,1.85-2.8,4.97l-4.33,2.88-1.37-1.05.19,1.17c-17.41-2.94-37.06-3.29-58.95-1.04l-7.08.72-.98,1.36-1.18.12-1.37-1.05.19,1.17-1.37-1.05-8.08,2-2.36.24c-5.72-3.36-9.96-4.91-12.74-4.65l-.75-4.68,1.43-6.02,8.45.33,3.96-5.22,17.88-.69L52.96.11l3.92,1.98,4.72-.48.99-1.29,1.18-.12.38,2.34,1.18-.12.99-1.29,22.98,1.17-.19-1.17,1.37,1.05,7.07-.78.99-1.29,1.18-.12,3.26,12.81ZM10.26,10.57l-5.9.6,2.73,2.03,3.55-.29-.38-2.34ZM57.07,3.26l-7.07.78.19,1.17,7.07-.78-.19-1.17ZM67.88,3.36l-7.08.72.19,1.17,7.08-.72-.19-1.17ZM79.86,3.27l-8.25.9.19,1.17,8.25-.9-.19-1.17Z"/></svg>
            </button>
        </>
    );
};

export default Navigation;