import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import API from '../services/api';
import ProductCard from '../components/customer/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.brand}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-pink-600">
            RosetteScents Collection
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-black text-neutral-900">
            All Perfumes
          </h1>

          <p className="text-sm text-neutral-500 mt-1">
            Explore our fragrance collection
          </p>
        </div>

        {/* SHOP SEARCH */}
        <div className="w-full md:w-72 flex items-center gap-2 bg-white border border-pink-100 rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-neutral-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collection..."
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-neutral-500">
          No perfumes found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {filteredProducts.map((product) => (
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