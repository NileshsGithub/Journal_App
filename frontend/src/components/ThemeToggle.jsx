import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="toggle-track">
                <div className={`toggle-thumb ${theme}`}>
                    {theme === 'light' ? (
                        <Sun size={14} strokeWidth={2.5} />
                    ) : (
                        <Moon size={14} strokeWidth={2.5} />
                    )}
                </div>
            </div>
        </button>
    );
}
