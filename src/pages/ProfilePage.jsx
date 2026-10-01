import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-24 px-4">
        <h1 className="text-2xl font-black">
          Please Login
        </h1>

        <Link
          to="/login"
          className="inline-block mt-5 px-6 py-3 bg-pink-600 text-white rounded-xl font-bold"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-pink-100 rounded-3xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-pink-600 font-bold">
          My Account
        </p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-black">
          Profile
        </h1>

        <div className="mt-7 space-y-4">
          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-400">
              Name
            </p>

            <p className="mt-1 font-bold">
              {user.name || 'N/A'}
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-400">
              Email
            </p>

            <p className="mt-1 font-bold break-all">
              {user.email || 'N/A'}
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-400">
              Account Type
            </p>

            <p className="mt-1 font-bold">
              {user.isAdmin ? 'Administrator' : 'Customer'}
            </p>
          </div>
        </div>

        {user.isAdmin && (
          <Link
            to="/admin"
            className="block mt-6 text-center py-3 bg-pink-600 text-white rounded-xl font-bold"
          >
            Open Admin Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}