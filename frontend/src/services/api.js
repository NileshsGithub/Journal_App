import axios from 'axios';

const API_BASE_URL = 'http://localhost:8088';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach auth header
api.interceptors.request.use((config) => {
    const savedUser = localStorage.getItem('journal-user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            if (user.credentials) {
                config.headers.Authorization = `Basic ${user.credentials}`;
            }
        } catch {
            // Ignore parse errors
        }
    }
    return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.userMessage
            || error.response?.data?.message
            || error.message
            || 'Something went wrong';
        return Promise.reject({ message, status: error.response?.status });
    }
);

export default api;
