import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../services/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    upazila: '',
  });

  const [paymentMethod, setPaymentMethod] =
    useState('Cash on Delivery');

  const [loading, setLoading] = useState(false);

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const total = subtotal + 100;

  const updateField = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!items.length) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images?.[0],
        size: item.size,
        bottleVolume: item.bottleVolume,
        price: item.price,
        quantity: item.quantity,
      }));

      const { data } = await API.post('/orders', {
        orderItems,
        shippingAddress: address,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: 0,
        shippingPrice: 100,
        discountPrice: 0,
        totalPrice: total,
      });

      if (paymentMethod === 'bKash') {
        const payment = await API.post(
          '/payments/bkash/initiate',
          {
            orderId: data._id,
          }
        );

        if (payment.data.bkashURL) {
          window.location.href = payment.data.bkashURL;
          return;
        }
      }

      navigate('/order-success');
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] uppercase tracking-widest font-bold text-pink-600">
          Secure Purchase
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-black">
          Checkout
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-2 gap-6 lg:gap-10"
      >
        {/* SHIPPING */}
        <div className="bg-white rounded-2xl border border-pink-100 p-5 sm:p-7">
          <h2 className="text-lg font-black mb-5">
            Shipping Details
          </h2>

          <div className="space-y-3">
            <input
              required
              type="text"
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) =>
                updateField('fullName', e.target.value)
              }
              className="checkout-input"
            />

            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) =>
                updateField('phone', e.target.value)
              }
              className="checkout-input"
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              value={address.email}
              onChange={(e) =>
                updateField('email', e.target.value)
              }
              className="checkout-input"
            />

            <textarea
              required
              rows={4}
              placeholder="Full Address"
              value={address.address}
              onChange={(e) =>
                updateField('address', e.target.value)
              }
              className="checkout-input resize-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                type="text"
                placeholder="District"
                value={address.district}
                onChange={(e) =>
                  updateField('district', e.target.value)
                }
                className="checkout-input"
              />

              <input
                required
                type="text"
                placeholder="Upazila"
                value={address.upazila}
                onChange={(e) =>
                  updateField('upazila', e.target.value)
                }
                className="checkout-input"
              />
            </div>
          </div>

          <h2 className="text-lg font-black mt-7 mb-4">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-4 rounded-xl border cursor-pointer ${
                paymentMethod === 'Cash on Delivery'
                  ? 'border-pink-600 bg-pink-50'
                  : 'border-neutral-200'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={() =>
                  setPaymentMethod('Cash on Delivery')
                }
                className="mr-2"
              />
              <span className="text-sm font-semibold">
                Cash on Delivery
              </span>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer ${
                paymentMethod === 'bKash'
                  ? 'border-pink-600 bg-pink-50'
                  : 'border-neutral-200'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'bKash'}
                onChange={() => setPaymentMethod('bKash')}
                className="mr-2"
              />

              <span className="text-sm font-semibold">
                bKash Online
              </span>
            </label>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl border border-pink-100 p-5 sm:p-7 h-fit lg:sticky lg:top-5">
          <h2 className="text-lg font-black">
            Order Summary
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span>৳{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">
                Delivery
              </span>

              <span>৳100</span>
            </div>
          </div>

          <div className="border-t mt-5 pt-5 flex justify-between">
            <span className="font-black">
              Total
            </span>

            <span className="font-black text-pink-600">
              ৳{total}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-4 bg-pink-600 text-white rounded-xl font-bold disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}