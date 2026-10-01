import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import API from '../services/api';
import ProductCard from '../components/customer/ProductCard';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const results = products.filter((product) => {
    const text = `${product.name} ${product.brand}`.toLowerCase();

    return text.includes(query.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-xs text-pink-600 font-bold uppercase tracking-widest">
        Search Results
      </p>

      <h1 className="mt-2 text-2xl sm:text-3xl font-black">
        {query ? `"${query}"` : 'Search'}
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-20 text-neutral-500">
          No perfumes found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-7">
          {results.map((product) => (
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