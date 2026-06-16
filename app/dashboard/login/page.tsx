'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/app/ui/login-form';
import RegistrationForm from '@/app/ui/registration-form';

type ActiveTab = 'login' | 'register';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('login');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSuccessMessage('');
  };

  return (
    <div className="relative min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-12 overflow-hidden">

      {/* ── Background: blurred craft image + light overlay ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/sarah_jenkins_hands.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f7]/90 via-[#faf9f7]/80 to-[#efeeec]/85" />
      </div>

      {/* ── Card ── */}
      <div className="relative w-full max-w-md">

        {/* Logo mark */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-1 select-none">
            <span className="font-serif text-[#1c2e24] text-2xl tracking-tight leading-none">⌓</span>
            {/* <span className="text-[10px] font-bold text-[#1c2e24]/50 tracking-[0.2em] uppercase">HH</span> */}
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#1c2e24] leading-tight">
            {activeTab === 'login' ? 'Welcome Back' : 'Join the Collective'}
          </h1>
          <p className="text-sm text-[#1c2e24]/80 mt-2 font-sans">
            {activeTab === 'login'
              ? 'Step into the boutique.'
              : 'Start your handcrafted journey.'}
          </p>
        </div>

        {/* Glass card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Tab switcher */}
          <div className="flex border-b border-gray-100">
            <button
  id="tab-login"
  onClick={() => handleTabChange('login')}
  className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${
    activeTab === 'login'
      ? 'text-gray-900 border-b-2 border-[#3a5244] bg-white'
      : 'text-gray-700 hover:text-gray-900 bg-gray-50/60'
  }`}
>
  Sign In
</button>
            <button
              id="tab-register"
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${
                activeTab === 'register'
                  ? 'text-gray-900 border-b-2 border-[#3a5244] bg-white'
                  : 'text-gray-700 hover:text-gray-900 bg-gray-50/60'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form body */}
          <div className="p-8">
            {successMessage && (
              <div role="status" className="mb-5 flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-sm font-medium">
                <span className="shrink-0 mt-0.5">✓</span>
                <span>{successMessage}</span>
              </div>
            )}
            {activeTab === 'login' ? (
              <LoginForm
                onSwitchToRegister={() => {
                  setActiveTab('register');
                  setSuccessMessage('');
                }}
              />
            ) : (
              <RegistrationForm
                onSwitchToLogin={(msg) => {
                  if (msg) setSuccessMessage(msg);
                  setActiveTab('login');
                }}
              />
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-[#1c2e24] mt-6 font-sans font-medium">
          By continuing, you agree to our{' '}
          <Link href="/terms-of-service" className="hover:text-[#1c2e24] underline transition-colors font-bold">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy-policy" className="hover:text-[#1c2e24] underline transition-colors font-bold">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
