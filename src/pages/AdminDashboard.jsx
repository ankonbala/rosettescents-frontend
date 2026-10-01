import React, { useEffect, useState } from 'react';

import API from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/analytics/dashboard')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div className="py-24 text-center text-neutral-500">
        Loading admin analytics...
      </div>
    );
  }

  const cards = [
    {
      label: 'Revenue',
      value: `৳${stats.totalRevenue || 0}`,
      highlight: true,
    },
    {
      label: 'Orders',
      value: stats.totalOrders || 0,
    },
    {
      label: 'Products',
      value: stats.totalProducts || 0,
    },
    {
      label: 'Visitors',
      value: stats.totalVisitors || 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-pink-600 font-bold">
          Management
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-black">
          Admin Dashboard
        </h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-pink-100 rounded-2xl p-4 sm:p-6"
          >
            <p className="text-xs text-neutral-500">
              {card.label}
            </p>

            <p
              className={`mt-2 text-xl sm:text-3xl font-black ${
                card.highlight
                  ? 'text-pink-600'
                  : 'text-neutral-900'
              }`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* MOBILE ANALYTICS */}
      <div className="md:hidden mt-6 space-y-3">
        <h2 className="text-lg font-black">
          Product Analytics
        </h2>

        {stats.productAnalytics?.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-pink-100 rounded-2xl p-4"
          >
            <h3 className="font-bold text-sm">
              {item.product?.name || 'Deleted Product'}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <p className="text-[10px] text-neutral-400">
                  Views
                </p>
                <p className="font-bold">{item.views}</p>
              </div>

              <div>
                <p className="text-[10px] text-neutral-400">
                  Cart
                </p>
                <p className="font-bold">{item.addedToCart}</p>
              </div>

              <div>
                <p className="text-[10px] text-neutral-400">
                  Purchases
                </p>
                <p className="font-bold">{item.purchases}</p>
              </div>

              <div>
                <p className="text-[10px] text-neutral-400">
                  Wishlists
                </p>
                <p className="font-bold">{item.wishlistCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block mt-8 bg-white border border-pink-100 rounded-3xl p-6 overflow-hidden">
        <h2 className="text-xl font-black mb-5">
          Product Level Analytics
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs uppercase text-neutral-400">
                <th className="py-3">Product</th>
                <th className="py-3">Views</th>
                <th className="py-3">Added to Cart</th>
                <th className="py-3">Purchases</th>
                <th className="py-3">Wishlists</th>
              </tr>
            </thead>

            <tbody className="divide-y text-sm">
              {stats.productAnalytics?.map((item) => (
                <tr key={item._id}>
                  <td className="py-4 font-semibold">
                    {item.product?.name || 'Deleted Product'}
                  </td>

                  <td>{item.views}</td>
                  <td>{item.addedToCart}</td>
                  <td>{item.purchases}</td>
                  <td>{item.wishlistCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}