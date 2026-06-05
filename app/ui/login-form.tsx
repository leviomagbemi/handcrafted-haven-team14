'use client';

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/lib/authContext";
import Button from "@/app/ui/button";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.');
        return;
      }

      // Store token and update auth context
      login(data.token || 'logged-in');
      router.push('/dashboard/account');

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium text-brown">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium text-brown">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
      </div>

      <Button type="submit" className="mt-2 w-full py-3 text-xl">
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      {onSwitchToRegister && (
        <p className="text-center text-gray-600 mt-2">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-brown font-semibold underline hover:text-green transition-colors"
          >
            Sign up
          </button>
        </p>
      )}
    </form>
  );
}
