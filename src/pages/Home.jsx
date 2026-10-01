import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

import API from '../services/api';
import ProductCard from '../components/customer/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pb-10 sm:pb-16">
      {/* ================= MOBILE HERO ================= */}
      <section className="md:hidden px-4 pt-5">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-100 via-pink-50 to-white px-5 py-9">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/80 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold text-pink-700">
              <Sparkles className="w-3 h-3" />
              Luxury Fragrance
            </div>

            <h1 className="mt-5 text-[32px] leading-[1.08] font-black text-neutral-900">
              Find Your
              <br />
              Signature Scent.
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-600 max-w-[280px]">
              Authentic luxury perfumes with beautiful notes and long-lasting
              fragrance.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 bg-pink-600 text-white px-5 py-3 rounded-full text-sm font-bold"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-pink-200/50" />
          <div className="absolute right-5 top-10 w-16 h-16 rounded-full bg-white/50" />
        </div>
      </section>

      {/* ================= DESKTOP HERO ================= */}
      <section className="hidden md:block relative overflow-hidden bg-gradient-to-r from-pink-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 text-center">
          <span className="inline-block bg-pink-200 text-pink-800 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">
            Luxury Fragrance House
          </span>

          <h1 className="mt-7 text-5xl lg:text-6xl font-black tracking-tight text-neutral-900">
            Discover Your Signature Scent
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-neutral-600 leading-8">
            Immerse yourself in authentic luxury perfumes crafted with rare
            notes and long-lasting sillage.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-pink-600 text-white font-bold shadow-xl shadow-pink-200 hover:bg-pink-700 transition"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 lg:mt-16">
        <div className="flex items-end justify-between mb-5 sm:mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-pink-600">
              Curated for you
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900">
              Featured Perfumes
            </h2>

            <p className="hidden sm:block text-sm text-neutral-500 mt-1">
              Handpicked luxury favorites for fragrance lovers
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-pink-600"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}