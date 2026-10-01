import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-7">
          <p className="text-[10px] uppercase tracking-widest text-pink-600 font-bold">
            Welcome to Rosette scents
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-black">
            Welcome Back
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="checkout-input"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="checkout-input"
          />

          <button
            disabled={loading}
            className="w-full py-3.5 bg-pink-600 text-white rounded-xl font-bold disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-pink-600 font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}