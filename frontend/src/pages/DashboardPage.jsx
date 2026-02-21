import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { journalService } from '../services/journalService';
import JournalCard from '../components/JournalCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { Plus } from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 0, totalPages: 0, totalRecords: 0 });
    const [filters, setFilters] = useState({});
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const fetchJournals = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const params = {
                page,
                pageSize: 12,
                ...(filters.title && { title: filters.title }),
                ...(filters.contentKeyword && { contentKeyword: filters.contentKeyword }),
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
            };

            const response = await journalService.getAll(params);
            const data = response.data;
            setJournals(data.responseData || []);
            setPagination({
                currentPage: data.currentPage || 0,
                totalPages: data.totalPages || 0,
                totalRecords: data.totalRecords || 0,
            });
        } catch (err) {
            addToast(err.message || 'Failed to load journals', 'error');
        } finally {
            setLoading(false);
        }
    }, [filters, addToast]);

    useEffect(() => {
        fetchJournals(0);
    }, [fetchJournals]);

    const handleSearch = (searchText) => {
        setFilters(prev => ({ ...prev, title: searchText }));
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (page) => {
        fetchJournals(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="dashboard-page">
            <div className="page-container">
                <div className="dashboard-header">
                    <div className="dashboard-header-left">
                        <h1 className="page-title">My Journals</h1>
                        <p className="dashboard-subtitle">
                            {pagination.totalRecords > 0
                                ? `${pagination.totalRecords} journal${pagination.totalRecords !== 1 ? 's' : ''}`
                                : 'Your personal space for thoughts'}
                        </p>
                    </div>
                    <button className="btn btn-primary btn-lg create-btn" onClick={() => navigate('/journal/new')}>
                        <Plus size={20} />
                        <span>New Entry</span>
                    </button>
                </div>

                <div className="dashboard-search">
                    <SearchBar
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </div>

                {loading ? (
                    <div className="journal-grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton" style={{ height: 3 }} />
                                <div style={{ padding: 20 }}>
                                    <div className="skeleton" style={{ width: '40%', height: 14, marginBottom: 12 }} />
                                    <div className="skeleton" style={{ width: '80%', height: 18, marginBottom: 10 }} />
                                    <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 6 }} />
                                    <div className="skeleton" style={{ width: '70%', height: 14 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : journals.length === 0 ? (
                    <EmptyState
                        title={filters.title || filters.contentKeyword || filters.startDate ? 'No journals found' : 'No journals yet'}
                        message={
                            filters.title || filters.contentKeyword || filters.startDate
                                ? 'Try adjusting your search or filter criteria'
                                : 'Start capturing your thoughts by creating your first journal entry!'
                        }
                        action={!filters.title && !filters.contentKeyword ? () => navigate('/journal/new') : undefined}
                        actionLabel="Create First Entry"
                    />
                ) : (
                    <>
                        <div className="journal-grid">
                            {journals.map((journal, index) => (
                                <JournalCard key={journal.id || index} journal={journal} index={index} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Floating action button (mobile) */}
            <button className="fab" onClick={() => navigate('/journal/new')} title="Create new journal entry">
                <Plus size={24} />
            </button>
        </div>
    );
}
