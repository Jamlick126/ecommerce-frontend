import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { apiFetch } from '../Api';

const CartContext = createContext();

export const CartProvider = ( { children }) => {
    const [cartCount, setCartCount] = useState(0);

    const username = localStorage.getItem("username");

    const updateCartCount = useCallback(async (manualCount = null) => {
        if (manualCount !== null) {
            setCartCount(manualCount);
            return;
        }

        const storedName = localStorage.getItem("username");
        if (!storedName) {
            setCartCount(0);
            return;
        }
        try {
            const res = await apiFetch(`/api/cart/count/${storedName}`);
            if(res.ok) {
                const data = await res.json();
                setCartCount(data.count || 0);
            } else {
                setCartCount(0);
            }
        } catch (err) {
            console.error("Error updating count:", err);
            setCartCount(0);
        }
    }, []);

    // fetch count on initial load
    useEffect(() => {
        updateCartCount();

        // Sync cart count across browser tabs or on auth state changes
        const handleStorageChange = () => updateCartCount();
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [updateCartCount]);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
};

// custom hook for easy access
export const useCart = () => useContext(CartContext);

export default CartProvider;