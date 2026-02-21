import api from './api';

export const userService = {
    // Sign up a new user
    signup: (data) => api.post('/user/create-user', data),

    // Update current user (username/password)
    update: (data) => api.put('/user', data),

    // Delete current user account
    delete: () => api.delete('/user'),

    // Health check (public endpoint)
    healthCheck: () => api.get('/public/health-check'),
};
