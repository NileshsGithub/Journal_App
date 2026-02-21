import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { journalService } from '../services/journalService';
import { ArrowLeft, Save, Type } from 'lucide-react';
import './JournalEditorPage.css';

export default function JournalEditorPage() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            loadJournal();
        }
    }, [id]);

    const loadJournal = async () => {
        setLoading(true);
        try {
            const response = await journalService.getById(id);
            const journal = response.data;
            setTitle(journal.title || '');
            setContent(journal.content || '');
        } catch (err) {
            addToast(err.message || 'Failed to load journal', 'error');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            addToast('Title is required', 'error');
            return;
        }
        if (!content.trim()) {
            addToast('Content is required', 'error');
            return;
        }
        if (title.trim().length > 100) {
            addToast('Title cannot exceed 100 characters', 'error');
            return;
        }
        if (content.trim().length > 1000) {
            addToast('Content cannot exceed 1000 characters', 'error');
            return;
        }

        setSaving(true);
        try {
            if (isEditing) {
                await journalService.update({
                    journalId: Number(id),
                    title: title.trim(),
                    content: content.trim(),
                });
                addToast('Journal updated successfully ✏️', 'success');
            } else {
                await journalService.create({
                    journalId: 0, // will be ignored by backend for create
                    title: title.trim(),
                    content: content.trim(),
                });
                addToast('Journal created successfully 🎉', 'success');
            }
            navigate('/');
        } catch (err) {
            addToast(err.message || 'Failed to save journal', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="editor-page">
                <div className="page-container">
                    <div className="skeleton" style={{ width: '60%', height: 36, marginBottom: 24 }} />
                    <div className="skeleton" style={{ width: '100%', height: 48, marginBottom: 16 }} />
                    <div className="skeleton" style={{ width: '100%', height: 300 }} />
                </div>
            </div>
        );
    }

    return (
        <div className="editor-page">
            <div className="page-container">
                <div className="editor-header">
                    <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <h2 className="editor-title">
                        {isEditing ? 'Edit Journal' : 'New Journal Entry'}
                    </h2>
                </div>

                <form className="editor-form" onSubmit={handleSubmit}>
                    <div className="editor-card card">
                        <div className="form-group">
                            <label className="form-label editor-label" htmlFor="journal-title">
                                <Type size={16} />
                                Title
                            </label>
                            <input
                                id="journal-title"
                                type="text"
                                className="editor-input-title"
                                placeholder="Give your entry a title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                                autoFocus
                            />
                            <div className="char-count">
                                <span className={title.length > 90 ? 'char-warning' : ''}>{title.length}</span>/100
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label editor-label" htmlFor="journal-content">
                                Content
                            </label>
                            <textarea
                                id="journal-content"
                                className="editor-textarea"
                                placeholder="Start writing your thoughts..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={1000}
                                rows={14}
                            />
                            <div className="char-count">
                                <span className={content.length > 900 ? 'char-warning' : ''}>{content.length}</span>/1000
                            </div>
                        </div>
                    </div>

                    <div className="editor-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                            {saving ? (
                                <><span className="spinner" /> Saving...</>
                            ) : (
                                <><Save size={18} /> {isEditing ? 'Update Entry' : 'Save Entry'}</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
