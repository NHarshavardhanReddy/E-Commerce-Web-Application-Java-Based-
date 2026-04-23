import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email or mobile number is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Basic authentication logic (demo)
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.length === 0) {
        // Add default users
        users = [
          { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'password123' },
          { id: 2, name: 'Admin User', email: 'admin@example.com', password: 'password123' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
      }
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        const userData = { ...user, isAdmin: user.email === 'admin@example.com' };
        login(userData);
        navigate('/');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/" className="brand-logo">SHOP.CO</Link>
        </div>
        <h1 className="auth-title">Sign in</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && <div className="error-message">{errors.general}</div>}
          <div className="form-group">
            <label htmlFor="email">Email or mobile number</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>New to SHOP.CO? <Link to="/register">Create your account</Link></p>
        </div>
      </div>
      <div className="auth-footer">
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Help</a>
      </div>
    </div>
  );
};

export default Login;