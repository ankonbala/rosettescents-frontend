import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-black tracking-widest text-pink-500">
              rosettescents
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed mt-3">
              Discover authentic luxury fragrances and find your signature
              scent.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Shop</h3>

            <div className="space-y-2 text-sm text-neutral-400">
              <Link to="/shop" className="block hover:text-pink-400">
                All Perfumes
              </Link>

              <Link to="/wishlist" className="block hover:text-pink-400">
                Wishlist
              </Link>

              <Link to="/cart" className="block hover:text-pink-400">
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Account</h3>

            <div className="space-y-2 text-sm text-neutral-400">
              <Link to="/profile" className="block hover:text-pink-400">
                My Profile
              </Link>

              <Link to="/login" className="block hover:text-pink-400">
                Login
              </Link>

              <Link to="/register" className="block hover:text-pink-400">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">rosettescents</h3>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium fragrance shopping experience with delivery across
              Bangladesh.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-6 text-center text-xs text-neutral-500">
          © 2026 rosettescents Perfume House. All rights reserved.
        </div>
      </div>
    </footer>
  );
}