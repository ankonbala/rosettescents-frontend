import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const addToCart = async (productData) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const { data } = await API.post('/cart', productData);
      setCart(data);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await API.delete(`/cart/${itemId}`);
      setCart(data);
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);