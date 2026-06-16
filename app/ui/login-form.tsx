'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/authContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateLoginForm(email: string, password: string): Record<string, string> {
  const errs: Record<string, string> = {};

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    errs.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errs.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errs.password = 'Password is required.';
  } else if (password.length < 6) {
    errs.password = 'Password must be at least 6 characters.';
  }

  return errs;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Validate individual field on blur for immediate feedback
    const { name, value } = e.target;
    const fieldErrors = validateLoginForm(
      name === 'email' ? value : formData.email,
      name === 'password' ? value : formData.password
    );
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    // Full form validation on submit
    const validationErrors = validateLoginForm(formData.email, formData.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Login failed. Please try again.');
        return;
      }

      login(data.token, data.user);
      router.push('/dashboard/account');
    } catch {
      setServerError('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper: input border style based on error state
  const inputClass = (field: string) =>
    `block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white'
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate aria-label="Sign in form">

      {/* Server Error Banner */}
      {serverError && (
        <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
          <span className="shrink-0 mt-0.5">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="artisan@example.com"
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          aria-invalid={!!errors.email}
          className={inputClass('email')}
        />
        {errors.email && (
          <p id="login-email-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Password
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            aria-invalid={!!errors.password}
            className={inputClass('password') + ' pr-11'}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" aria-hidden="true" /> : <EyeIcon className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        {errors.password && (
          <p id="login-password-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.password}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? 'Signing in, please wait' : 'Sign in'}
        className="w-full py-3 bg-[#3a5244] hover:bg-[#2b4235] active:scale-[0.98] text-white font-bold rounded-lg text-sm tracking-wide shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2" aria-live="polite">
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in…
          </span>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Switch to register */}
      {onSwitchToRegister && (
        <p className="text-center text-sm text-gray-600 mt-1">
          New to Handcrafted Haven?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-primary hover:text-primary/95 underline transition-colors"
          >
            Create Account
          </button>
        </p>
      )}
    </form>
  );
}
