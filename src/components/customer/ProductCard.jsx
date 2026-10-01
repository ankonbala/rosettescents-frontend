import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

import { useWishlist } from '../../context/WishlistContext';

const getImage = (product) => {
  if (product.images?.[0]) {
    return `http://localhost:5000${product.images[0]}`;
  }

  return 'https://images.unsplash.com/photo-1523293182086-7651a899d37f';
};

export default function ProductCard({ product }) {
  const { toggleWishlist } = useWishlist();

  const variant = product.variants?.[0] || {
    price: 0,
    size: 'Standard',
  };

  const image = getImage(product);

  return (
    <>
      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm">
        <div className="relative aspect-[0.82] bg-pink-50">
          <Link to={`/product/${product._id}`}>
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Link>

          <button
            type="button"
            onClick={() => toggleWishlist(product._id)}
            className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-sm"
          >
            <Heart className="w-4 h-4 text-neutral-700" />
          </button>
        </div>

        <div className="p-3">
          <p className="text-[9px] uppercase tracking-widest font-bold text-pink-600 truncate">
            {product.brand}
          </p>

          <Link to={`/product/${product._id}`}>
            <h3 className="mt-1.5 text-[13px] leading-5 font-bold text-neutral-900 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-base font-black text-neutral-900">
                ৳{variant.price}
              </p>

              <p className="text-[10px] text-neutral-400">
                {variant.size}
              </p>
            </div>

            <Link
              to={`/product/${product._id}`}
              className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center"
            >
              <span className="text-lg leading-none">+</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP CARD ================= */}
      <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl transition duration-300 group">
        <div className="relative aspect-[4/5] bg-pink-50 overflow-hidden">
          <Link to={`/product/${product._id}`}>
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </Link>

          <button
            type="button"
            onClick={() => toggleWishlist(product._id)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:text-pink-600 transition"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs uppercase tracking-widest font-bold text-pink-600">
            {product.brand}
          </p>

          <Link to={`/product/${product._id}`}>
            <h3 className="mt-2 text-base font-bold text-neutral-900 line-clamp-2 min-h-[48px] hover:text-pink-600 transition">
              {product.name}
            </h3>
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xl font-black text-neutral-900">
                ৳{variant.price}
              </p>

              <p className="text-xs text-neutral-400">
                {variant.size}
              </p>
            </div>

            <Link
              to={`/product/${product._id}`}
              className="px-4 py-2 rounded-full bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}