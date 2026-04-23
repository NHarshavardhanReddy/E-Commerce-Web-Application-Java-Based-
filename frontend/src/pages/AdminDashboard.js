import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  if (!user || !user.isAdmin) {
    return (
      <div className="container page-content">
        <h1>❌ Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <button onClick={() => navigate('/')} className="btn">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>👨‍💼 Admin Dashboard</h1>
          <button onClick={logout} className="btn" style={{ background: '#e74c3c' }}>Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>📦</div>
            <div style={{ marginTop: '0.5rem' }}>Products</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>6</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>📋</div>
            <div style={{ marginTop: '0.5rem' }}>Orders</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>12</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>👥</div>
            <div style={{ marginTop: '0.5rem' }}>Users</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>24</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>💰</div>
            <div style={{ marginTop: '0.5rem' }}>Revenue</div>
            <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold' }}>$5,240</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'products' ? '#667eea' : 'transparent',
                color: activeTab === 'products' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              📦 Products
            </button>
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
              📋 Orders
            </button>
            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === 'users' ? '#667eea' : 'transparent',
                color: activeTab === 'users' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              👥 Users
            </button>
          </div>

          {activeTab === 'products' && (
            <div>
              <h2>Product Management</h2>
              <button className="btn" style={{ marginBottom: '1rem' }}>➕ Add New Product</button>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Product Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>Wireless Headphones</td>
                    <td style={{ padding: '1rem' }}>$79.99</td>
                    <td style={{ padding: '1rem' }}>50</td>
                    <td style={{ padding: '1rem' }}>
                      <button style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                      <button style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2>Recent Orders</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>ORD-001</td>
                    <td style={{ padding: '1rem' }}>John Doe</td>
                    <td style={{ padding: '1rem' }}>$149.90</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#d5f4e6', color: '#27ae60', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Delivered</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2>Registered Users</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>Demo User</td>
                    <td style={{ padding: '1rem' }}>demo@example.com</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#e3f2fd', color: '#1976d2', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Customer</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;