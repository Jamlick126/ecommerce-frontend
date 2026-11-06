import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            let { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (!error) setOrders(data);
        }
        fetchOrders();
    }, []);

    return (
        <div className="container" style={{ padding: '50px 0' }}>
            <h2>Shop Orders Dashboard</h2>
            <table style={{ width: '100%', marginTop: '20px', background: '#fff', borderRadius: '8px' }}>
                <thead>
                    <tr>
                        <th>Receipt</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.mpesa_receipt}</td>
                            <td>{order.phone_number}</td>
                            <td>KSh {order.total_amount}</td>
                            <td>{order.status}</td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}