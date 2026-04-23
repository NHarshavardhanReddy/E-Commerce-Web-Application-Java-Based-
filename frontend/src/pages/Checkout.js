import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 100 ? 0 : 10;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('✅ Payment successful! Your order has been placed.');
      clearCart();
      navigate('/');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container page-content">
        <h1>Checkout</h1>
        <p>Your cart is empty. <a href="/" style={{ color: '#667eea' }}>Continue shopping</a></p>
      </div>
    );
  }

  return (
    <div className="container page-content">
      <h1>🛒 Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <h2>Shipping Information</h2>
          {error && <div className="error">{error}</div>}
          
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />

          <h2 style={{ marginTop: '2rem' }}>Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number (demo: use any number)"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              name="cardExpiry"
              placeholder="MM/YY"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cardCVC"
              placeholder="CVC"
              value={formData.cardCVC}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn" style={{ marginTop: '2rem', width: '100%' }} disabled={loading}>
            {loading ? 'Processing Payment...' : `Complete Purchase ($${grandTotal.toFixed(2)})`}
          </button>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
            💡 Demo Mode: Use any card details to test
          </p>
        </form>

        <div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <h2>Order Summary</h2>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
              {cart.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Shipping:  {shipping === 0 ? '🎉 FREE' : ''}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem',
              borderRadius: '4px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Total: ${grandTotal.toFixed(2)}
            </div>

            {total > 100 && (
              <p style={{ background: '#d5f4e6', color: '#27ae60', padding: '1rem', marginTop: '1rem', borderRadius: '4px', textAlign: 'center' }}>
                ✅ Free shipping on orders over $100!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;