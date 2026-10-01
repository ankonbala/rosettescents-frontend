import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';

import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto text-center px-5 py-24">
        <ShoppingBag className="w-14 h-14 mx-auto text-neutral-300" />

        <h1 className="mt-5 text-2xl font-black">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Add some beautiful fragrances to your cart.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl font-bold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-pink-600">
          Your Selection
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-black">
          Shopping Cart
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-pink-100 p-3 sm:p-4"
            >
              <div className="flex gap-3 sm:gap-4">
                <img
                  src={
                    item.product?.images?.[0]
                      ? `http://localhost:5000${item.product.images[0]}`
                      : ''
                  }
                  alt={item.product?.name || ''}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-pink-50 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base line-clamp-2">
                    {item.product?.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-neutral-500">
                    Size: {item.size}
                  </p>

                  <p className="mt-1 text-[11px] text-neutral-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 text-base font-black text-pink-600">
                    ৳{item.price * item.quantity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                  className="self-start p-2 text-neutral-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5 h-fit lg:sticky lg:top-5">
          <h2 className="text-lg font-black">
            Order Summary
          </h2>

          <div className="flex justify-between mt-5 text-sm">
            <span className="text-neutral-500">
              Subtotal
            </span>

            <span className="font-bold">
              ৳{subtotal}
            </span>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between">
            <span className="font-bold">
              Total
            </span>

            <span className="font-black text-pink-600">
              ৳{subtotal}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-5 w-full py-3.5 bg-pink-600 text-white rounded-xl font-bold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}