'use client';

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/lib/authContext";
import Button from "@/app/ui/button";

<<<<<<< HEAD
export default function LoginForm() {
    const { login } = useContext(AuthContext) as { login: (token: string) => void };
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const { token } = await response.json();
                login(token); // Call login function from context
                window.location.href = "/";
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            setError("Internal server error");
        }
    };
	return (
		<form
            id="login-form"
			onSubmit={handleSubmit}
            method="post"
			className="bg-white shadow-2xl w-30 min-w-96 border rounded px-8 pt-6 pb-8 mb-4"
		>
			<div className="block text-black-700 font-bold mb-2">
				<h1 className="text-2xl text-gray-500 mb-10">
					Please log in to continue.
				</h1>
				<div className="w-full">
					<div>
						<label
							className="block text-black-700 text-xl font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-xl outline-2 placeholder:text-gray-400"
								id="email"
								type="email"
								name="email"
								placeholder="Enter your email address"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div className="mt-4">
						<label
							className="block text-black-700 text-xl font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-xl outline-2 placeholder:text-gray-400"
								id="password"
								type="password"
								name="password"
								placeholder="Enter password"
								required
								minLength={6}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<Button type="submit">Log in</Button>
				{error && (
					<div className="flex h-8 items-end space-x-1">
						<p
							aria-live="polite"
							className="text-sm text-red-500"
						>
							{error}
						</p>
					</div>
				)}
			</div>
		</form>
	);
=======
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
>>>>>>> 160dd4700116674a9b3a6051023452dd53229d2a
}
