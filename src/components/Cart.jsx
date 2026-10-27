import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import 'intasend-inlinejs-sdk';
import { apiFetch } from '../Api';


const Cart = () => {
    // this will evevntually come from my database or global state
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);    
    const { updateCartCount } = useCart();
    const [phone, setPhone] = useState("");

    // Helper to ensure image paths always start with a slash
    const getImageUrl = (url) => {
        if (!url) return '';
        return url.startsWith('/') ? url : `/${url}`;
    };

    useEffect(() => {
        if (username) {
            apiFetch(`/api/cart/user/${username}`)
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
            const response = await apiFetch(`/api/cart/${id}`, {
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
            const response = await apiFetch(`/api/cart/update-quantity/${id}`, {
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

    // --- NEW: INTASEND IMPLEMENTATION ---
    const handleIntaSendCheckout = () => {
        const totalAmount = calculateTotal();
        
        // Initialize IntaSend
        const intasend = new window.IntaSend({
            publicAPIKey: "ISPubKey_test_4b424855-d2dc-4b8c-a5b0-297edf4ad78d", // Replace with your Public Key
            live: false // Set to true for production
        });

        intasend.run({
            amount: totalAmount,
            currency: "KES",
            email: "customer@email.com", // Ideally get this from user data
            first_name: username,
            api_ref: username,
        })
        .on("COMPLETE", (response) => {
            console.log("Payment Successful:", response);
            // Clear UI immediately
            setCartItems([]);
            updateCartCount(0);
            navigate("/thank-you");
        })
        .on("FAILED", (response) => {
            console.error("Payment Failed:", response);
            alert("Payment failed. Please try again.");
        })
        .on("IN-PROGRESS", () => {
            console.log("Payment in progress...");
        });
    };


    const handleMpesa = async () => {
        const currentTotal = calculateTotal();
        if (!phone.startsWith("254") || phone.length !== 12) {
            alert("Please enter phone in format 2547XXXXXXXX");
            return;
        }
        try {
            const response = await apiFetch('/api/stkpush', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    phone, 
                    amount: currentTotal,
                    username: username})
            });
            const data = await response.json();
            
            if (data.ResponseCode === "0") {
                alert("Check your phone to enter M-Pesa PIN!");
                setCartItems([]);
                updateCartCount(0);
                navigate("/thank-you");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("M-Pesa Error:", err);
        }
    };

    return (
        <div className="small-container cart-page">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart" style={{ textAlign: 'center', padding: '50px 0' }}>
                    <p style={{ fontSize: '18px', marginBottom: '20px', color: '#555' }}>Your cart is currently empty.</p>
                    <Link to="/products" className="btn">Shop Now</Link>
                </div>
            ): (
                <>
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th style={{ textAlign: 'right' }} >Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map cart items here*/}
                        {cartItems.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td>
                                    <div className="cart-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img 
                                        src={getImageUrl(item.image_url)} 
                                        alt={item.name} 
                                        style={{ width: '70px', height: '70px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '6px', padding: '5px' }} 
                                    />
                                    <div>
                                        <p>{item.name}</p>
                                        <small>Price: Ksh.{item.price.toLocaleString()}</small>
                                        <br/>
                                        <button 
                                            onClick={() => removeFromCart(item.id)} 
                                            style={{ background: 'none', border: 'none', color: '#ff523b', cursor: 'pointer', fontSize: '12px', padding: '0', marginTop: '4px', fontWeight: '600' }}
                                        >
                                            Remove
                                        </button>   
               
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
                                <td style={{ textAlign: 'right' }}>Ksh.{(item.price * item.quantity).toLocaleString()}</td> 
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                
                <div className="total-price">
                    <table>
                        <tbody>
                             <tr>
                            <td>Total</td>
                            <td>Ksh.{calculateTotal().toLocaleString()}</td>
                        </tr>

                        </tbody>
                       
                    </table>
                </div>

                {/* Add the Checkout Button here */}
                <div className="mpesa-checkout-card" style={{ textAlign: 'right', marginTop: '30px' }}>
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
                        <button className="btn" onClick={handleMpesa} style={{ margin: '0', padding: '10px 25px' }}>
                            Pay with M-Pesa
                        </button>
                    </div>
                    
                    <p style={{ margin: '20px 0 15px', color: '#888', fontSize: '13px' }}>- OR -</p>

                    {/* Option 2: New IntaSend (Cards + M-Pesa) */}
                    <div className="intasend-checkout">
                        <button 
                            className="btn" 
                            onClick={handleIntaSendCheckout}
                            style={{ background: '#5e35b1',margin: '0', width: '100%', padding: '10px' }} // Different color for distinction
                        >
                            Pay with Card or M-Pesa (IntaSend)
                        </button>
                    </div>

                </div>
                </>
            )}
        </div>
    );
};

export default Cart;