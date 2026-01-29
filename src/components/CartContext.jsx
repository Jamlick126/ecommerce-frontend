import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ( { children }) => {
    const [cartCount, setCartCount] = useState(0);
    const username = localStorage.getItem("username");

    const updateCartCount = async () => {
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
    }, [username]);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    )
};

// custom hook for easy access
export const useCart = () => useContext(CartContext);

export default CartProvider;