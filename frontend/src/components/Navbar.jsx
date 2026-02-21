import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { BookOpen, Settings, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar glass">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <div className="brand-icon">
                        <BookOpen size={20} />
                    </div>
                    <span className="brand-text">Journal</span>
                </Link>

                <div className="navbar-center">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        My Journals
                    </Link>
                </div>

                <div className="navbar-actions">
                    <ThemeToggle />

                    <Link to="/settings" className="btn btn-ghost btn-icon" title="Settings">
                        <Settings size={18} />
                    </Link>

                    <div className="user-menu">
                        <button className="user-menu-trigger btn btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="avatar">
                                <User size={16} />
                            </div>
                            <span className="user-name">{user.userName}</span>
                        </button>
                        {menuOpen && (
                            <div className="user-dropdown glass fade-in" onClick={() => setMenuOpen(false)}>
                                <div className="dropdown-header">
                                    <span className="dropdown-label">Signed in as</span>
                                    <span className="dropdown-user">{user.userName}</span>
                                </div>
                                <div className="dropdown-divider" />
                                <Link to="/settings" className="dropdown-item">
                                    <Settings size={16} />
                                    Settings
                                </Link>
                                <button className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                                    <LogOut size={16} />
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="btn btn-ghost btn-icon mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Overlay to close dropdown */}
            {menuOpen && <div className="dropdown-overlay" onClick={() => setMenuOpen(false)} />}
        </nav>
    );
}
