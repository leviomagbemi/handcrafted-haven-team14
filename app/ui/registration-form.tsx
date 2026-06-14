'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, UserIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const CRAFT_TYPES = ['Ceramics', 'Woodworking', 'Textiles', 'Jewelry', 'Painting', 'Sculpture', 'Other'];

interface RegistrationFormProps {
  onSwitchToLogin?: (message?: string) => void;
}

type Role = 'buyer' | 'artisan';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const defaultFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  studio_name: '',
  craft_type: 'Ceramics',
  story: '',
};

function validateRegisterForm(
  data: typeof defaultFormData,
  role: Role
): Record<string, string> {
  const errs: Record<string, string> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errs.name = 'Full name is required.';
  } else if (trimmedName.length > 100) {
    errs.name = 'Full name cannot exceed 100 characters.';
  }

  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errs.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errs.email = 'Please enter a valid email address.';
  } else if (trimmedEmail.length > 254) {
    errs.email = 'Email address cannot exceed 254 characters.';
  }

  const password = data.password;
  if (!password) {
    errs.password = 'Password is required.';
  } else if (password.trim() === '') {
    errs.password = 'Password cannot consist only of whitespace.';
  } else if (password.length < 6) {
    errs.password = 'Password must be at least 6 characters.';
  } else if (password.length > 128) {
    errs.password = 'Password cannot exceed 128 characters.';
  }

  if (data.confirmPassword !== password) {
    errs.confirmPassword = 'Passwords do not match.';
  }

  if (role === 'artisan') {
    const trimmedStudio = data.studio_name.trim();
    if (!trimmedStudio) {
      errs.studio_name = 'Studio name is required.';
    } else if (trimmedStudio.length > 100) {
      errs.studio_name = 'Studio name cannot exceed 100 characters.';
    }

    const trimmedStory = data.story.trim();
    if (trimmedStory.length > 1000) {
      errs.story = 'Your story cannot exceed 1000 characters.';
    }
  }

  return errs;
}

export default function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<Role>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const tempFormData = { ...formData, [name]: value };
    const fieldErrors = validateRegisterForm(tempFormData, role);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateRegisterForm(formData, role);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload: Record<string, string> = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role,
      };

      if (role === 'artisan') {
        payload.studio_name = formData.studio_name.trim();
        payload.craft_type = formData.craft_type.trim();
        payload.story = formData.story.trim();
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Success — switch to login
      if (onSwitchToLogin) {
        onSwitchToLogin('Your account has been created successfully! Please sign in.');
      } else {
        router.push('/dashboard/login?success=1');
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-gray-200 bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white'
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate aria-label="User registration form">

      {/* Role Toggle */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          I am joining as a…
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {/* Buyer */}
          <button
            type="button"
            id="role-buyer"
            onClick={() => setRole('buyer')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setRole('buyer');
              }
            }}
            aria-pressed={role === 'buyer'}
            aria-label="Join as a buyer - shop and collect items"
            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1 ${
              role === 'buyer'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${role === 'buyer' ? 'bg-primary/10' : 'bg-gray-100'}`}>
              <UserIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Buyer</p>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Shop & collect</p>
            </div>
          </button>

          {/* Artisan */}
          <button
            type="button"
            id="role-artisan"
            onClick={() => setRole('artisan')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setRole('artisan');
              }
            }}
            aria-pressed={role === 'artisan'}
            aria-label="Join as an artisan - sell your craft"
            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 ${
              role === 'artisan'
                ? 'border-secondary bg-secondary/5 text-secondary'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${role === 'artisan' ? 'bg-secondary/10' : 'bg-gray-100'}`}>
              <PaintBrushIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Artisan</p>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Sell your craft</p>
            </div>
          </button>
        </div>
      </fieldset>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Server Error */}
      {serverError && (
        <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
          <span className="shrink-0 mt-0.5">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="reg-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Jane Doe"
          aria-describedby={errors.name ? 'reg-name-error' : undefined}
          aria-invalid={!!errors.name}
          className={inputClass('name')}
        />
        {errors.name && (
          <p id="reg-name-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          aria-describedby={errors.email ? 'reg-email-error' : undefined}
          aria-invalid={!!errors.email}
          className={inputClass('email')}
        />
        {errors.email && (
          <p id="reg-email-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-password" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <input
            id="reg-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            maxLength={128}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Min. 6 characters"
            aria-describedby={errors.password ? 'reg-password-error' : undefined}
            aria-invalid={!!errors.password}
            className={inputClass('password') + ' pr-11'}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p id="reg-password-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-confirm" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Confirm Password
        </label>
        <input
          id="reg-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          maxLength={128}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Re-enter your password"
          aria-describedby={errors.confirmPassword ? 'reg-confirm-error' : undefined}
          aria-invalid={!!errors.confirmPassword}
          className={inputClass('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p id="reg-confirm-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* ── Artisan-Only Fields ── */}
      {role === 'artisan' && (
        <div className="flex flex-col gap-5 pt-2 border-t border-dashed border-secondary/30">
          <p className="text-xs font-bold text-secondary uppercase tracking-wider -mb-2">
            Your Maker Profile
          </p>

          {/* Studio Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="studio_name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Studio Name
            </label>
            <input
              id="studio_name"
              name="studio_name"
              type="text"
              maxLength={100}
              value={formData.studio_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Earth & Fire Studio"
              aria-describedby={errors.studio_name ? 'reg-studio-error' : undefined}
              aria-invalid={!!errors.studio_name}
              className={inputClass('studio_name')}
            />
            {errors.studio_name && (
              <p id="reg-studio-error" role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
                <span aria-hidden="true">✕</span> {errors.studio_name}
              </p>
            )}
          </div>

          {/* Craft Type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="craft_type" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Primary Craft
            </label>
            <select
              id="craft_type"
              name="craft_type"
              value={formData.craft_type}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all cursor-pointer"
            >
              {CRAFT_TYPES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Story */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="story" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Your Story <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="story"
              name="story"
              rows={3}
              maxLength={1000}
              value={formData.story}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell buyers about your craft, inspiration, and techniques…"
              aria-describedby={errors.story ? 'reg-story-error' : undefined}
              aria-invalid={!!errors.story}
              className={`block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none ${
                errors.story
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white'
              }`}
            />
            <div className="flex justify-between items-center text-[11px] mt-0.5">
              {errors.story ? (
                <p id="reg-story-error" role="alert" className="text-red-600 font-medium flex items-center gap-1">
                  <span aria-hidden="true">✕</span> {errors.story}
                </p>
              ) : (
                <span />
              )}
              <span className={`font-semibold shrink-0 ml-auto ${formData.story.length > 950 ? 'text-amber-600' : 'text-gray-400'}`}>
                {formData.story.length} / 1000 characters
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? 'Creating account, please wait' : role === 'artisan' ? 'Apply as an artisan' : 'Create account'}
        className="w-full py-3 bg-[#3a5244] hover:bg-[#2b4235] active:scale-[0.98] text-white font-bold rounded-lg text-sm tracking-wide shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2" aria-live="polite">
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Creating account…
          </span>
        ) : role === 'artisan' ? (
          'Apply as an Artisan'
        ) : (
          'Create Account'
        )}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-gray-500 mt-1">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onSwitchToLogin()}
            className="font-semibold text-primary hover:text-primary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          >
            Sign in
          </button>
        </p>
      )}
    </form>
  );
}
