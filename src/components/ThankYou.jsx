import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div className="small-container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ color: '#ff523b' }}>Payment Request Sent!</h2>
            <p>Please check your phone and enter your M-Pesa PIN to complete the purchase.</p>
            <p>Once paid, your order will be processed automatically.</p>
            <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
    );
};

export default ThankYou;