import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext';
import {
  clearLegacyProductCache,
  getProductId,
  loadProductCache,
  normalizeProducts,
  saveProductCache,
} from '../utils/products';

const CATEGORIES = ['All', 'Deals', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Grocery', 'More'];

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const { updateSearchTerm } = useSearch();
  const searchTerm = (searchParams.get('search') || '').trim();
  const selectedCategory = CATEGORIES.includes(searchParams.get('category'))
    ? searchParams.get('category')
    : 'All';

  useEffect(() => {
    updateSearchTerm(searchTerm);
  }, [searchTerm, updateSearchTerm]);

  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    clearLegacyProductCache();

    const cachedProducts = loadProductCache();
    if (cachedProducts.length > 0) {
      setProducts(cachedProducts);
      setLoading(false);
    }

    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        const normalizedProducts = normalizeProducts(data);

        if (!isMounted) {
          return;
        }

        setProducts(normalizedProducts);
        saveProductCache(normalizedProducts);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message);
        console.log('Error fetching products:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory === 'Deals') {
      filtered = filtered.filter(product => product.price <= 50);
    } else if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(normalizedSearchTerm) ||
        product.description.toLowerCase().includes(normalizedSearchTerm) ||
        product.category.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  const renderSkeletonCards = () =>
    Array.from({ length: 8 }, (_, index) => (
      <div key={`skeleton-${index}`} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
      </div>
    ));

  return (
    <div className="page-content">
      <div className="container">
        {error && <div className="error">Error loading products: {error}</div>}
        {loading && <p className="status-text">Loading products...</p>}
        {!loading && products.length === 0 && <p className="status-text">No products available.</p>}

        {!loading && products.length > 0 && (
          <section className="section-card">
            <div className="section-header">
              <h2>Trending Products</h2>
            </div>
            <div className="products-grid">
              {products.slice(0, 4).map(product => (
                <ProductCard key={getProductId(product)} product={product} />
              ))}
            </div>
          </section>
        )}

        <section className="section-card">
          <div className="section-header">
            <h2>
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : selectedCategory === 'All'
                  ? 'All Products'
                  : `${selectedCategory} Products`}
            </h2>
            <span className="product-count">{filteredProducts.length} products</span>
          </div>
          <div className="products-grid">
            {loading ? (
              renderSkeletonCards()
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map(product => (
                <ProductCard key={getProductId(product)} product={product} />
              ))
            ) : (
              <p className="status-text">
                {searchTerm
                  ? 'No products match your search.'
                  : `No products in ${selectedCategory} category.`}
              </p>
            )}
          </div>
          {hasMore && !loading && (
            <button className="load-more-btn" onClick={loadMore}>
              Load More Products
            </button>
          )}
        </section>
      </div>

      <footer className="page-footer">
        <div className="footer-grid">
          <div>
            <h3>About</h3>
            <a href="#about">Our story</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
          </div>
          <div>
            <h3>Help</h3>
            <a href="#support">Customer Service</a>
            <a href="#returns">Returns</a>
            <a href="#shipping">Shipping</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="#contact">Contact Us</a>
            <a href="#locations">Locations</a>
            <a href="#feedback">Feedback</a>
          </div>
          <div>
            <h3>More</h3>
            <a href="#gift-cards">Gift Cards</a>
            <a href="#deals">Deals</a>
            <a href="#subscribe">Subscribe</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
