import { BookOpen } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ title = 'No journals yet', message = 'Start writing your first journal entry!', action, actionLabel }) {
    return (
        <div className="empty-state fade-in">
            <div className="empty-icon-wrapper">
                <div className="empty-icon-bg" />
                <BookOpen size={48} className="empty-icon" />
            </div>
            <h3 className="empty-title">{title}</h3>
            <p className="empty-message">{message}</p>
            {action && (
                <button className="btn btn-primary btn-lg" onClick={action}>
                    {actionLabel || 'Get Started'}
                </button>
            )}
        </div>
    );
}
