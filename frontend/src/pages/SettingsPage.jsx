import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { userService } from '../services/userService';
import Modal from '../components/Modal';
import ThemeToggle from '../components/ThemeToggle';
import { ArrowLeft, User, Shield, Palette, Trash2 } from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPage() {
    const { user, login, logout } = useAuth();
    const { theme } = useTheme();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [newUserName, setNewUserName] = useState(user?.userName || '');
    const [newPassword, setNewPassword] = useState('');
    const [updating, setUpdating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!newUserName.trim()) {
            addToast('Username is required', 'error');
            return;
        }
        setUpdating(true);
        try {
            await userService.update({
                userName: newUserName.trim(),
                password: newPassword || undefined,
            });
            // Update stored credentials
            login({
                userName: newUserName.trim(),
                password: newPassword || user?.password || '',
                userId: user?.userId,
            });
            addToast('Profile updated successfully', 'success');
            setNewPassword('');
        } catch (err) {
            addToast(err.message || 'Failed to update profile', 'error');
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        try {
            await userService.delete();
            logout();
            addToast('Account deleted', 'success');
            navigate('/login');
        } catch (err) {
            addToast(err.message || 'Failed to delete account', 'error');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="settings-page">
            <div className="page-container settings-container">
                <div className="settings-nav">
                    <button className="btn btn-ghost" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} />
                        Back
                    </button>
                </div>

                <h1 className="page-title">Settings</h1>
                <p className="settings-subtitle">Manage your account and preferences</p>

                {/* Appearance */}
                <section className="settings-section fade-in">
                    <div className="section-header">
                        <Palette size={20} className="section-icon" />
                        <div>
                            <h3 className="section-title">Appearance</h3>
                            <p className="section-desc">Customize the look and feel</p>
                        </div>
                    </div>
                    <div className="settings-card card">
                        <div className="setting-row">
                            <div>
                                <span className="setting-label">Theme</span>
                                <span className="setting-value">
                                    Currently using <strong>{theme === 'light' ? 'Light' : 'Dark'}</strong> mode
                                </span>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </section>

                {/* Profile */}
                <section className="settings-section fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="section-header">
                        <User size={20} className="section-icon" />
                        <div>
                            <h3 className="section-title">Profile</h3>
                            <p className="section-desc">Update your account information</p>
                        </div>
                    </div>
                    <form className="settings-card card" onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="settings-username">Username</label>
                            <input
                                id="settings-username"
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                maxLength={40}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="settings-password">New Password</label>
                            <input
                                id="settings-password"
                                type="password"
                                placeholder="Leave blank to keep current"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={updating}>
                                {updating ? <span className="spinner" /> : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Danger Zone */}
                <section className="settings-section fade-in" style={{ animationDelay: '200ms' }}>
                    <div className="section-header">
                        <Shield size={20} className="section-icon section-icon-danger" />
                        <div>
                            <h3 className="section-title section-title-danger">Danger Zone</h3>
                            <p className="section-desc">Irreversible actions</p>
                        </div>
                    </div>
                    <div className="settings-card card danger-card">
                        <div className="setting-row">
                            <div>
                                <span className="setting-label">Delete Account</span>
                                <span className="setting-value">Permanently delete your account and all data</span>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => setShowDeleteModal(true)}>
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account" size="sm">
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>
                    This will permanently delete your account and all associated journal entries. This action <strong>cannot be undone</strong>.
                </p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDeleteAccount} disabled={deleting}>
                        {deleting ? <span className="spinner" /> : <><Trash2 size={16} /> Delete Account</>}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
