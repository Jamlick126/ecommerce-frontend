import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/orders', {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'x-store-slug': 'default-store' 
                }
            });
            setOrders(response.data);
        } catch (err) {
            console.error("Failed to load admin orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, 
                { status: newStatus },
                { 
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'x-store-slug': 'default-store' 
                    } 
                }
            );
            // Refresh orders list after updating
            fetchOrders();
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Error updating order status");
        }
    };

    // Calculate total revenue from paid orders
    const totalRevenue = orders
        .filter(order => order.status === 'paid')
        .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    if (loading) return <div style={{ padding: '20px' }}>Loading admin dashboard...</div>;

    return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Store Admin Dashboard</h2>
            
            {/* Metric Cards */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h4>Total Revenue</h4>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>KSh {totalRevenue.toLocaleString()}</p>
                </div>
                <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h4>Total Orders</h4>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{orders.length}</p>
                </div>
            </div>

            {/* Orders Table */}
            <h3>Recent Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Customer</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Amount</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>M-Pesa Receipt</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.id}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.username}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>KSh {order.amount}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    backgroundColor: order.status === 'paid' ? 'green' : order.status === 'failed' ? 'red' : 'orange'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.mpesa_receipt || 'N/A'}</td>
                            {/* <-- ADD QUICK ACTION BUTTONS --> */}
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {order.status !== 'paid' && (
                                    <button 
                                        onClick={() => handleStatusUpdate(order.id, 'paid')}
                                        style={{ marginRight: '5px', background: 'green', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                                    >
                                        Mark Paid
                                    </button>
                                )}
                                {order.status !== 'failed' && (
                                    <button 
                                        onClick={() => handleStatusUpdate(order.id, 'failed')}
                                        style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                                    >
                                        Mark Failed
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}