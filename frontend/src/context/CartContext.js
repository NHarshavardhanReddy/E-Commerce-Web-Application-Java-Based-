import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProductId, normalizeProduct, normalizeProducts } from '../utils/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(normalizeProducts(JSON.parse(savedCart)));
      } catch (err) {
        console.log('Error loading cart:', err);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const normalizedProduct = normalizeProduct(product);

    if (!normalizedProduct) {
      return;
    }

    const productId = getProductId(normalizedProduct);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => getProductId(item) === productId);

      if (existingItem) {
        return prevCart.map(item =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...normalizedProduct, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart =>
      prevCart.filter(item => getProductId(item) !== String(productId))
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          getProductId(item) === String(productId) ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
