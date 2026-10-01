import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="max-w-lg mx-auto px-5 py-20 sm:py-28 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-pink-600" />
      </div>

      <h1 className="mt-7 text-2xl sm:text-3xl font-black">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-7">
        Thank you for shopping with RosetteScents. Your luxury perfumes are
        being prepared.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-7 px-7 py-3 bg-pink-600 text-white rounded-full font-bold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}