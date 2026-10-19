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

    const response = await fetch(`http://localhost:5000${endpoint}`, {
        ...options,
        headers
    });
    return response;
};