import api from './api';

export const journalService = {
    // Create a new journal entry
    create: (data) => api.post('/journal', data),

    // Get all journals with filters & pagination
    getAll: (params = {}) => api.get('/journal', { params }),

    // Get all journals by user ID
    getAllByUser: (userId, page = 0, pageSize = 100) =>
        api.get('/journal/all', { params: { userid: userId, page, pageSize } }),

    // Get a single journal by ID
    getById: (id) => api.get(`/journal/id/${id}`),

    // Update a journal entry
    update: (data) => api.put('/journal', data),

    // Delete a journal entry (soft delete)
    delete: (id) => api.delete(`/journal/id/${id}`),
};
