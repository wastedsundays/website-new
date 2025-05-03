import { useTheme } from '../context/ThemeContext';
import IconMoonshine from '../assets/IconMoonshine';
import IconSunshine from '../assets/IconSunshine';


const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button
            onClick={handleToggle}
            className="theme-toggle"
        >
            {theme === 'dark' ? <IconSunshine /> : <IconMoonshine />}

        </button>
    );
}

export default ThemeToggle;