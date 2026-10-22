const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiFetch = async (endpoint, options = {}) => {
    const hostname = window.location.hostname;
    const storeSlug = hostname.includes('.') && hostname.split('.').length > 2 
        ? hostname.split('.')[0] 
        : 'default-store';

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'x-store-slug': storeSlug
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    return response;
};