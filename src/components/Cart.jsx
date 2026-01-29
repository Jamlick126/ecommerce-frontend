import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
    // this will evevntually come from my database or global state
    const [cartItems, setCartItems] = useState([]);
    const username = localStorage.getItem("username");
    const { updateCartCount } = useCart();
    const [phone, setPhone] = useState("");


    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5000/api/cart/user/${username}`)
                .then(res => res.json())
                .then(data => setCartItems(data))
                .catch(err => console.error("Error loading cart:", err));
        }
    }, [username]);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const removeFromCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // update the UI by filtering out the deleted item
                setCartItems(cartItems.filter(item => item.id !== id));
                updateCartCount();
            }
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const handleQuantityChange = async (id, change) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/update-quantity/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ change })
            });

            if ( response.ok) {
                // update local state so UI changes immediately
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === id 
                        ? { ...item, quantity: Math.max(1, item.quantity + change)}
                        : item
                    )
                );
                // update header badge count
                updateCartCount();
            }
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };


    const handleMpesa = async () => {
        const currentTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (!phone.startsWith("254") || phone.length !== 12) {
        alert("Please enter phone in format 2547XXXXXXXX");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/stkpush', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, amount: currentTotal })
        });
        const data = await response.json();
        if (data.ResponseCode === "0") {
            alert("Check your phone to enter M-Pesa PIN!");
        }
    } catch (err) {
        console.error("M-Pesa Error:", err);
    }
};

    return (
        <div className="small-container cart-page">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is currently empty.</p>
                    <Link to="/products" className="btn">Shop Now</Link>
                </div>
            ): (
                <>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map cart items here*/}
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="cart-info">
                                    <img src={item.image_url} alt={item.name}  width="50px"/>
                                    <div>
                                        <p>{item.name}</p>
                                        <small>Price: Ksh.{item.price}</small>
                                        <br/>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            removeFromCart(item.id);
                                        }} style={{color: '#ff523b', fontSize:'12px'}}>Remove</a>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)} className="qty-btn">-</button>
                                        <span className="qty-number">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)} className="qty-btn">+</button>
                                    </div>
                                </td>
                                <td>Ksh.{(item.price * item.quantity).toLocaleString()}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <table>
                        <tbody>
                             <tr>
                            <td>Total</td>
                            <td>Ksh.{calculateTotal()}</td>
                        </tr>

                        </tbody>
                       
                    </table>
                </div>

                {/* Add the Checkout Button here */}
                <div className="mpesa-checkout-container" style={{ textAlign: 'right', marginTop: '30px' }}>
                    <p style={{ marginBottom: '10px', fontSize: '14px', color: '#ffffff' }}>
                        Ready to order? Enter M-Pesa number:
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="2547XXXXXXXX" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ 
                                padding: '12px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc', 
                                width: '200px',
                                color: '#ffffff'
                            }}
                        />
                        {/* This button now handles the logic previously intended for 'Proceed' */}
                        <button className="btn" onClick={handleMpesa}>
                            Pay with M-Pesa
                        </button>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default Cart;