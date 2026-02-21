import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import './JournalCard.css';

export default function JournalCard({ journal, index }) {
    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const truncate = (text, maxLen = 120) => {
        if (!text || text.length <= maxLen) return text;
        return text.substring(0, maxLen).trim() + '…';
    };

    return (
        <article
            className="journal-card fade-in"
            style={{ animationDelay: `${index * 60}ms` }}
            onClick={() => journal.id && navigate(`/journal/${journal.id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' && journal.id) navigate(`/journal/${journal.id}`); }}
        >
            <div className="card-accent" />
            <div className="card-body">
                <div className="card-meta">
                    <span className="card-date">
                        <Calendar size={13} />
                        {formatDate(journal.date)}
                    </span>
                </div>
                <h3 className="card-title">{journal.title}</h3>
                <p className="card-content">{truncate(journal.content)}</p>
            </div>
            <div className="card-footer">
                <span className="card-read-more">
                    Read more <ArrowRight size={14} />
                </span>
            </div>
        </article>
    );
}
