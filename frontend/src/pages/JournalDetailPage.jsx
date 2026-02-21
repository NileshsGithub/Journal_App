import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { journalService } from '../services/journalService';
import Modal from '../components/Modal';
import { ArrowLeft, Edit3, Trash2, Calendar } from 'lucide-react';
import './JournalDetailPage.css';

export default function JournalDetailPage() {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        loadJournal();
    }, [id]);

    const loadJournal = async () => {
        setLoading(true);
        try {
            const response = await journalService.getById(id);
            setJournal(response.data);
        } catch (err) {
            addToast(err.message || 'Failed to load journal', 'error');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await journalService.delete(id);
            addToast('Journal deleted', 'success');
            navigate('/');
        } catch (err) {
            addToast(err.message || 'Failed to delete', 'error');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    if (loading) {
        return (
            <div className="detail-page">
                <div className="page-container detail-container">
                    <div className="skeleton" style={{ width: 120, height: 32, marginBottom: 24 }} />
                    <div className="skeleton" style={{ width: '70%', height: 36, marginBottom: 12 }} />
                    <div className="skeleton" style={{ width: '30%', height: 16, marginBottom: 32 }} />
                    <div className="skeleton" style={{ width: '100%', height: 200 }} />
                </div>
            </div>
        );
    }

    if (!journal) return null;

    return (
        <div className="detail-page">
            <div className="page-container detail-container">
                <div className="detail-nav">
                    <button className="btn btn-ghost" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} />
                        Back to Journals
                    </button>
                </div>

                <article className="detail-article fade-in">
                    <header className="detail-header">
                        <h1 className="detail-title">{journal.title}</h1>
                        <div className="detail-meta">
                            <span className="detail-date">
                                <Calendar size={15} />
                                {formatDate(journal.date)}
                            </span>
                        </div>
                    </header>

                    <div className="detail-content">
                        {journal.content?.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="detail-actions">
                        <button className="btn btn-secondary" onClick={() => navigate(`/journal/${id}/edit`)}>
                            <Edit3 size={16} />
                            Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                </article>
            </div>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Journal" size="sm">
                <p style={{ color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.6 }}>
                    Are you sure you want to delete "<strong>{journal.title}</strong>"? This action cannot be undone.
                </p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                        {deleting ? <span className="spinner" /> : <><Trash2 size={16} /> Delete</>}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
