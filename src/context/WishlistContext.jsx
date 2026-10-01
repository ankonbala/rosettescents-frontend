import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist({ products: [] });
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) {
      alert('Please login to manage your wishlist');
      return;
    }
    try {
      const { data } = await API.post('/wishlist', { productId });
      setWishlist(data);
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);