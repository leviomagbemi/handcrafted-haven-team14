'use client';

import { useState, useContext } from "react";
import Button from "./button";
import { AuthContext } from "../lib/authContext";

export default function LoginForm() {
    const { login } = useContext(AuthContext) as { login: (token: string) => void };
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("/api/login/route", {
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
}
