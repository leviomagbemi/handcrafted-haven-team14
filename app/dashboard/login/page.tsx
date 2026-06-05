'use client';

import React, { useState } from "react";
import LoginForm from "@/app/ui/login-form";
import RegistrationForm from "@/app/ui/registration-form";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 bg-tan">
      <div className="w-full max-w-md">
        {/* Tab Switcher */}
        <div className="flex rounded-xl overflow-hidden border border-brown/30 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-xl font-semibold transition-colors ${
              activeTab === 'login'
                ? 'bg-brown text-tan'
                : 'bg-white text-brown hover:bg-tan'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 text-xl font-semibold transition-colors ${
              activeTab === 'register'
                ? 'bg-brown text-tan'
                : 'bg-white text-brown hover:bg-tan'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md border border-brown/20 p-8">
          {activeTab === 'login' ? (
            <>
              <h2 className="text-3xl font-bold text-brown mb-6 text-center">
                Welcome Back
              </h2>
              <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-brown mb-6 text-center">
                Create Account
              </h2>
              <RegistrationForm onSwitchToLogin={() => setActiveTab('login')} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
