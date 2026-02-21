import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userService } from '../services/userService';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import './AuthPages.css';

export default function SignupPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName.trim() || !password.trim() || !confirmPassword.trim()) {
            addToast('Please fill in all fields', 'error');
            return;
        }
        if (userName.trim().length > 40) {
            addToast('Username cannot be more than 40 characters', 'error');
            return;
        }
        if (password.length > 20) {
            addToast('Password cannot be more than 20 characters', 'error');
            return;
        }
        if (password !== confirmPassword) {
            addToast('Passwords do not match', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await userService.signup({
                userName: userName.trim(),
                password,
                role: 'USER',
            });

            // Auto-login after signup
            login({
                userName: response.data.userName,
                userId: response.data.id,
                password,
            });

            addToast('Account created successfully! 🎉', 'success');
            navigate('/');
        } catch (err) {
            addToast(err.message || 'Signup failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-shape shape-1" />
                <div className="auth-shape shape-2" />
                <div className="auth-shape shape-3" />
            </div>

            <div className="auth-card glass-heavy fade-in">
                <div className="auth-header">
                    <div className="auth-logo">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="auth-title">Create account</h1>
                    <p className="auth-subtitle">Start your journaling journey today</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-username">Username</label>
                        <input
                            id="signup-username"
                            type="text"
                            placeholder="Choose a username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            autoFocus
                            maxLength={40}
                            autoComplete="username"
                        />
                        <span className="form-hint">{userName.length}/40 characters</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-password">Password</label>
                        <div className="password-wrapper">
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={20}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <span className="form-hint">{password.length}/20 characters</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
                        <input
                            id="signup-confirm"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            maxLength={20}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
