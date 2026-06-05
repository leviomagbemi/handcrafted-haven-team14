'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/button";

interface RegistrationFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setServerError('');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'A valid email is required.';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Success — switch to login tab or redirect
      if (onSwitchToLogin) {
        onSwitchToLogin();
      } else {
        router.push('/dashboard/login');
      }

    } catch (err) {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-medium text-brown">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="reg-email" className="text-lg font-medium text-brown">
          Email
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="reg-password" className="text-lg font-medium text-brown">
          Password
        </label>
        <input
          id="reg-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Min. 6 characters"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-lg font-medium text-brown">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          className="border border-brown/30 rounded-lg px-4 py-3 text-lg outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <Button type="submit" className="mt-2 w-full py-3 text-xl">
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {onSwitchToLogin && (
        <p className="text-center text-gray-600 mt-2">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-brown font-semibold underline hover:text-green transition-colors"
          >
            Log in
          </button>
        </p>
      )}
    </form>
  );
}
