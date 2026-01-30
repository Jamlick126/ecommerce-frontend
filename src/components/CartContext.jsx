import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ( { children }) => {
    const [cartCount, setCartCount] = useState(0);
    const username = localStorage.getItem("username");

    const updateCartCount = async (manualCount = null) => {
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
            const res = await fetch(`http://localhost:5000/api/cart/count/${storedName}`);
            const data = await res.json();
            setCartCount(data.count || 0);
        } catch (err) {
            console.error("Error updating count:", err);
        }
    };

    // fetch count on initial load
    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
};

// custom hook for easy access
export const useCart = () => useContext(CartContext);

export default CartProvider;