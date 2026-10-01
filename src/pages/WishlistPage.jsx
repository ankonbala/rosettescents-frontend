import React, { useEffect, useState } from 'react';

import API from '../services/api';
import ProductCard from '../components/customer/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((res) => {
        const ids = wishlist?.products || [];

        const filtered = res.data.filter((product) =>
          ids.some((id) => String(id) === String(product._id))
        );

        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-xs text-pink-600 font-bold uppercase tracking-widest">
        Saved Fragrances
      </p>

      <h1 className="mt-2 text-2xl sm:text-3xl font-black">
        My Wishlist
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20 text-neutral-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-7">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}