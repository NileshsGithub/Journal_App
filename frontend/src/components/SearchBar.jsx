import { Search, X, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, onFilterChange, filters }) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchText, setSearchText] = useState(filters?.title || '');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchText);
    };

    const clearSearch = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <div className="search-wrapper">
            <form className="search-bar" onSubmit={handleSearch}>
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search journals by title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                    <button type="button" className="search-clear" onClick={clearSearch}>
                        <X size={16} />
                    </button>
                )}
                <button type="button" className={`filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
                    <Filter size={16} />
                    <span>Filters</span>
                </button>
            </form>

            {showFilters && (
                <div className="filter-panel fade-in">
                    <div className="filter-group">
                        <label className="filter-label">
                            <Calendar size={14} />
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="filter-input"
                            value={filters?.startDate || ''}
                            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
                        />
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">
                            <Calendar size={14} />
                            End Date
                        </label>
                        <input
                            type="date"
                            className="filter-input"
                            value={filters?.endDate || ''}
                            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
                        />
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">Content Keyword</label>
                        <input
                            type="text"
                            className="filter-input"
                            placeholder="Search in content..."
                            value={filters?.contentKeyword || ''}
                            onChange={(e) => onFilterChange({ ...filters, contentKeyword: e.target.value })}
                        />
                    </div>
                    <div className="filter-actions">
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                                onFilterChange({});
                                setSearchText('');
                                onSearch('');
                            }}
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
