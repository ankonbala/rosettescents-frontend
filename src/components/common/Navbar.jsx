import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  ShieldAlert,
  Search,
  Menu,
  X,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [keyword, setKeyword] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const cartCount =
    cart?.items?.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    ) || 0;

  const wishlistCount = wishlist?.products?.length || 0;

  const search = (e) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
    setMobileOpen(false);
  };

  return (
    <header className="relative z-50 bg-white border-b border-pink-100">
      {/* SHIPPING BAR */}
      <div className="bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-3 py-2 text-center text-[10px] sm:text-xs font-medium tracking-wide">
          ✨ Free Shipping Across Bangladesh on Orders Over ৳3,000
          <span className="hidden sm:inline"> • </span>
          <span className="block sm:inline mt-0.5 sm:mt-0">
            Use Code: <strong>Rosette10</strong>
          </span>
        </div>
      </div>

      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-20 flex items-center gap-8">
            {/* LOGO */}
            <Link
              to="/"
              className="shrink-0 text-2xl font-black tracking-[0.18em] uppercase text-pink-700"
            >
              Rosette<span className="text-neutral-900">Scents</span>
            </Link>

            {/* SEARCH */}
            <form
              onSubmit={search}
              className="flex-1 max-w-2xl mx-auto flex items-center bg-neutral-50 border border-neutral-200 rounded-full px-5 py-3 focus-within:border-pink-400 focus-within:bg-white transition"
            >
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search perfumes, brands, notes..."
                className="flex-1 bg-transparent outline-none px-3 text-sm text-neutral-800 placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="text-pink-600 font-semibold text-sm"
              >
                Search
              </button>
            </form>

            {/* ACTIONS */}
            <div className="flex items-center gap-5 shrink-0">
              <Link
                to="/wishlist"
                className="relative text-neutral-700 hover:text-pink-600 transition"
              >
                <Heart className="w-6 h-6" />

                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative text-neutral-700 hover:text-pink-600 transition"
              >
                <ShoppingBag className="w-6 h-6" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-pink-600"
                  >
                    <User className="w-5 h-5" />
                    {user.name?.split(' ')[0] || 'Account'}
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2.5 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100"
                      title="Admin Dashboard"
                    >
                      <ShieldAlert className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="h-12 flex items-center justify-center gap-10 text-sm font-medium text-neutral-600">
            <Link
              to="/"
              className="hover:text-pink-600 transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="hover:text-pink-600 transition"
            >
              Shop
            </Link>

            <Link
              to="/wishlist"
              className="hover:text-pink-600 transition"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="hover:text-pink-600 transition"
            >
              Cart
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin"
                className="text-pink-600 hover:text-pink-700"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden">
        <div className="px-4 h-[68px] flex items-center justify-between gap-3">
          {/* MOBILE LOGO */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-black tracking-[0.12em] uppercase text-pink-700"
          >
            Rosette<span className="text-neutral-900">Scents</span>
          </Link>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="relative p-1.5 text-neutral-700"
            >
              <Heart className="w-5 h-5" />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-1.5 text-neutral-700"
            >
              <ShoppingBag className="w-5 h-5" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="p-1.5 text-neutral-800"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="px-4 pb-5 border-t border-pink-100 bg-white">
            <form
              onSubmit={search}
              className="mt-4 flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3"
            >
              <Search className="w-5 h-5 text-pink-600" />

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search perfumes..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </form>

            <nav className="mt-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50"
              >
                Shop
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50"
              >
                Cart
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50"
                  >
                    My Profile
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-semibold bg-pink-50 text-pink-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-2 text-center px-4 py-3 bg-pink-600 text-white rounded-xl text-sm font-semibold"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}