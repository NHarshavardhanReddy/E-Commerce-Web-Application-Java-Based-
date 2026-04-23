import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const CATEGORY_LINKS = ['All', 'Deals', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Grocery', 'More'];

const Header = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { searchTerm, updateSearchTerm } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentSearchParams = new URLSearchParams(location.search);
  const activeCategory = currentSearchParams.get('category') || 'All';
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const ordersLink = user ? '/dashboard' : '/login';

  const navigateToCatalog = (options = {}, navigationOptions = {}) => {
    const nextSearchParams = new URLSearchParams();
    const nextCategory = options.category ?? currentSearchParams.get('category');
    const nextSearchTerm = options.searchTerm ?? searchTerm.trim();

    if (nextCategory && nextCategory !== 'All') {
      nextSearchParams.set('category', nextCategory);
    }

    if (nextSearchTerm) {
      nextSearchParams.set('search', nextSearchTerm);
    }

    const nextUrl = nextSearchParams.toString()
      ? `/?${nextSearchParams.toString()}`
      : '/';

    navigate(nextUrl, navigationOptions);
  };

  const handleSearchChange = (event) => {
    const nextTerm = event.target.value;
    updateSearchTerm(nextTerm);

    if (location.pathname === '/') {
      navigateToCatalog({ searchTerm: nextTerm.trim() }, { replace: true });
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigateToCatalog();
  };

  const handleCategoryClick = (category) => {
    navigateToCatalog({ category });
  };

  return (
    <>
      <header className="top-header">
        <div className="top-left">
          <Link to="/" className="brand-logo" onClick={() => updateSearchTerm('')}>
            SHOP.CO
          </Link>
          <div className="location">
            <span>Deliver to</span>
            <strong>Your Address</strong>
          </div>
        </div>

        <form className="top-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products, brands and categories"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>

        <div className="top-actions">
          <div className="action-item">
            {user ? (
              <>
                <span>Hello, {user.name}</span>
                <Link to={user.isAdmin ? '/admin' : '/dashboard'}>Account & Lists</Link>
              </>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </div>
          <Link to={ordersLink} className="action-item action-item-link">
            <span>Returns</span>
            <strong>& Orders</strong>
          </Link>
          <Link to="/cart" className="cart-action">
            <span>Cart</span>
            <strong>{cartCount}</strong>
          </Link>
        </div>
      </header>

      <nav className="secondary-nav" aria-label="Product categories">
        {CATEGORY_LINKS.map(category => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </>
  );
};

export default Header;
