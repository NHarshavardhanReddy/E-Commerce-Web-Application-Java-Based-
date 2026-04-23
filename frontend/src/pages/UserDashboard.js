import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    return (
      <div className="container page-content">
        <h1>❌ Please Login</h1>
        <p>You must be logged in to view your dashboard.</p>
        <button onClick={() => navigate('/login')} className="btn">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>👤 Welcome, {user.name}!</h1>
            <p style={{ color: '#666' }}>Email: {user.email}</p>
          </div>
          <button onClick={logout} className="btn" style={{ background: '#e74c3c' }}>Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>📋</div>
            <div style={{ marginTop: '0.5rem' }}>Total Orders</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>3</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>💰</div>
            <div style={{ marginTop: '0.5rem' }}>Total Spent</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>$299.97</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>⭐</div>
            <div style={{ marginTop: '0.5rem' }}>Reviews</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>2</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'orders' ? '#667eea' : 'transparent',
                color: activeTab === 'orders' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              📋 My Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'addresses' ? '#667eea' : 'transparent',
                color: activeTab === 'addresses' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              📍 Addresses
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'reviews' ? '#667eea' : 'transparent',
                color: activeTab === 'reviews' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              ⭐ My Reviews
            </button>
          </div>

          {activeTab === 'orders' && (
            <div>
              <h2>Order History</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>ORD-20240001</td>
                    <td style={{ padding: '1rem' }}>Apr 10, 2024</td>
                    <td style={{ padding: '1rem' }}>$149.90</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#d5f4e6', color: '#27ae60', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Delivered</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>ORD-20240002</td>
                    <td style={{ padding: '1rem' }}>Apr 5, 2024</td>
                    <td style={{ padding: '1rem' }}>$89.99</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#d5f4e6', color: '#27ae60', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Delivered</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>ORD-20240003</td>
                    <td style={{ padding: '1rem' }}>Mar 28, 2024</td>
                    <td style={{ padding: '1rem' }}>$60.08</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#fff3cd', color: '#856404', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Processing</span></td>
                  </tr>                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2>Saved Addresses</h2>
              <button className="btn" style={{ marginBottom: '1rem' }}>➕ Add New Address</button>
              <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🏠 Home</div>
                <div style={{ color: '#666' }}>123 Main Street</div>
                <div style={{ color: '#666' }}>New York, NY 10001</div>
                <div style={{ marginTop: '1rem' }}>
                  <button style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2>My Reviews</h2>
              <button className="btn" style={{ marginBottom: '1rem' }}>➕ Write a Review</button>
              <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold' }}>Wireless Headphones</div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
                <div style={{ color: '#666' }}>Great product! Excellent sound quality and comfortable to wear.</div>
                <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>Apr 12, 2024</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;