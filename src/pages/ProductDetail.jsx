import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';

import API from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.variants?.length) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div className="py-24 text-center text-neutral-500">
        Loading perfume...
      </div>
    );
  }

  const image = product.images?.[0]
    ? `http://localhost:5000${product.images[0]}`
    : '';

  const handleAdd = () => {
    if (!selectedVariant) {
      alert('Please select a size variant');
      return;
    }

    addToCart({
      productId: product._id,
      variantId: selectedVariant._id,
      size: selectedVariant.size,
      bottleVolume: selectedVariant.bottleVolume || '',
      price: selectedVariant.price,
      quantity,
    });

    alert('Added to cart successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">
      {/* BACK */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-pink-600 mb-5 sm:mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="rounded-[28px] overflow-hidden bg-pink-50 aspect-square">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6">
          <span className="inline-block px-3 py-1 bg-pink-50 rounded-full text-[10px] uppercase tracking-widest font-bold text-pink-600">
            {product.brand}
          </span>

          <h1 className="mt-3 text-2xl font-black text-neutral-900 leading-tight">
            {product.name}
          </h1>

          <p className="mt-3 text-2xl font-black text-pink-600">
            ৳{selectedVariant?.price || 0}
          </p>

          <p className="mt-4 text-sm leading-6 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-7">
            <h3 className="text-sm font-bold text-neutral-900">
              Select Size
            </h3>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {product.variants?.map((variant) => (
                <button
                  key={variant._id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedVariant?._id === variant._id
                      ? 'border-pink-600 bg-pink-50'
                      : 'border-neutral-200 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold">
                    {variant.size}
                  </p>

                  {variant.bottleVolume && (
                    <p className="text-[10px] text-neutral-400 mt-1">
                      {variant.bottleVolume}
                    </p>
                  )}

                  <p className="text-sm font-black text-pink-600 mt-1">
                    ৳{variant.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Quantity</p>

              <div className="mt-2 flex items-center border border-pink-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-pink-50"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-10 text-center font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-pink-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="px-5 py-3 rounded-xl bg-pink-600 text-white font-bold text-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-2 gap-12">
        <div className="bg-pink-50 rounded-3xl overflow-hidden h-[620px]">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="py-5">
          <span className="inline-block px-3 py-1 bg-pink-50 rounded-full text-xs uppercase tracking-widest font-bold text-pink-600">
            {product.brand}
          </span>

          <h1 className="mt-5 text-4xl font-black text-neutral-900">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-black text-pink-600">
            ৳{selectedVariant?.price || 0}
          </p>

          <p className="mt-6 text-neutral-600 leading-8">
            {product.description}
          </p>

          <div className="mt-8">
            <h3 className="font-bold">Select Size</h3>

            <div className="flex flex-wrap gap-3 mt-3">
              {product.variants?.map((variant) => (
                <button
                  key={variant._id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-3 rounded-xl border text-sm ${
                    selectedVariant?._id === variant._id
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white border-pink-200'
                  }`}
                >
                  {variant.size}
                  {variant.bottleVolume
                    ? ` (${variant.bottleVolume})`
                    : ''}
                  {' — ৳'}
                  {variant.price}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-bold text-sm mb-2">
              Quantity
            </p>

            <div className="flex items-center border border-pink-200 rounded-xl w-fit overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                className="w-12 h-11 hover:bg-pink-50"
              >
                −
              </button>

              <span className="w-12 text-center font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((value) => value + 1)
                }
                className="w-12 h-11 hover:bg-pink-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-8 w-full py-4 rounded-2xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}