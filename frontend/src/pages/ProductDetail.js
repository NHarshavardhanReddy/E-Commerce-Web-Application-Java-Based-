import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { getProductId, loadProductCache, normalizeProduct, saveProductCache } from '../utils/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const cachedProducts = loadProductCache();
    const cachedProduct = cachedProducts.find(item => getProductId(item) === String(id));

    if (cachedProduct) {
      setProduct(cachedProduct);
      setLoading(false);
    }

    const fetchProduct = async () => {
      try {
        if (!cachedProduct) {
          setLoading(true);
        }
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        const normalizedProduct = normalizeProduct(data);

        if (!isMounted) {
          return;
        }

        if (normalizedProduct) {
          setProduct(normalizedProduct);
          saveProductCache(
            [...cachedProducts.filter(item => getProductId(item) !== normalizedProduct._id), normalizedProduct]
          );
          setError(null);
        } else if (!cachedProduct) {
          setProduct(null);
          setError('Product not found.');
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.log('Error fetching product:', err);
        if (!cachedProduct) {
          setProduct(null);
          setError('Product not found.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart(product, quantity);
    window.alert(`Added ${quantity} ${product.name}(s) to cart.`);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <p>{error || 'Product not found.'}</p>
        <button onClick={() => navigate('/')} className="btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container page-content">
      <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '2rem' }}>
        Back to Products
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }}
            onError={(event) => {
              event.target.src = '/product-images/wireless-headphones.svg';
            }}
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          {product.rating > 0 && (
            <p style={{ fontSize: '1.1rem', color: '#888' }}>
              Rating: {product.rating} ({product.numReviews} reviews)
            </p>
          )}
          <p style={{ fontSize: '1.2rem', color: '#666', margin: '1rem 0' }}>{product.description}</p>
          <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold', margin: '1.5rem 0' }}>
            ${product.price.toFixed(2)}
          </div>
          <p style={{ fontSize: '1.1rem', color: product.countInStock > 0 ? '#27ae60' : '#e74c3c' }}>
            {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <label style={{ marginRight: '1rem' }}>
              Quantity:
              <input
                type="number"
                min="1"
                max={product.countInStock || 10}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                style={{ marginLeft: '0.5rem', width: '80px', padding: '0.5rem' }}
              />
            </label>
            <button onClick={handleAddToCart} className="btn" disabled={product.countInStock === 0}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
