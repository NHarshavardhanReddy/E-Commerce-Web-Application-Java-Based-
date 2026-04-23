import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container page-content">
      <h1>🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', background: '#f9f9f9' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Quantity</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>{item.name}</td>
                  <td style={{ padding: '1rem' }}>${item.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      style={{ width: '60px', padding: '0.5rem' }}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h2>Subtotal: ${total.toFixed(2)}</h2>
            <p style={{ color: '#888', marginBottom: '1rem' }}>Shipping and taxes will be calculated at checkout</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => navigate('/')} className="btn" style={{ background: '#666' }}>Continue Shopping</button>
              <button onClick={() => navigate('/checkout')} className="btn">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;