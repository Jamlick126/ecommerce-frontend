const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-backend-hm0b.onrender.com';

export const apiFetch = async (endpoint, options = {}) => {
    const hostname = window.location.hostname;

    let storeSlug = 'default-store';
    if (hostname.includes('.') && hostname.split('.').length > 2) {
        storeSlug = hostname.split('.')[0];
    }

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