import React, { createContext,useContext, useEffect, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeConfig, setStoreConfig] = useState({
        store_slug: 'default-store',
        store_name: 'Red Store',
        logo_url: '/assets/logo-white.png',
        primary_color: '#ff523b',
        secondary_color: '#563434',
        hero_title: 'Give Your Workout A New Style!',
        hero_subtitle: 'Success isn’t always about greatness. It’s about consistency. Consistent hard work gains success. Greatness will come.',
    });

    const [loading, setLoading] = useState(true);

    const hostname = window.location.hostname;
    const storeSlug = hostname.includes('.') && hostname.split('.').length>2 
    ? hostname.split('.')[0] : 'default-store';

    useEffect(() => {
        fetch(`http://localhost:5000/api/store-config/${storeSlug}`)
        .then(res => res.json())
        .then(data => {
            if (data && !data.message) {
                setStoreConfig(data);
                document.documentElement.style.setProperty('--primary-color', data.primary_color || '#ff523b');
                document.documentElement.style.setProperty('--secondary-color', data.secondary_color || '#563434');
            }
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching store config:', err);
            setLoading(false);
        });
    }, [storeSlug]);

    return (
        <StoreContext.Provider value={{ storeConfig, storeSlug, loading }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);