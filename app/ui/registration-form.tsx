'use client';
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setNewEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    if (password !== confirmPassword) {
      setErrors(['Password & Confirm password do not match ']);
      setSubmit(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setNewEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error} className="">
              {error}
            </li>
          ))}
        </ul>
      )}
      <div className="block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-400">
        <label className="mr-2">
          <input
            value="Customer Form"
            onChange={(e) => setRegistrationType(e.target.value)}
            type="radio"
            title="customer"
            required
            name="registrationType"
            className="mr-2"
          />
          Customer
        </label>
        <label className="mr-2">
          <input
            value="Vendor Form"
            onChange={(e) => setRegistrationType(e.target.value)}
            type="radio"
            title="customer"
            required
            name="registrationType"
            className="mr-1"
          />
          Vendor
        </label>
      </div>
      <h1 className="w-fullpl-10 text-med pl-2">{registrationType}</h1>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        required
        placeholder="First Name"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm  placeholder:text-gray-400"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        required
        placeholder="Last Name"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
      />
      <input
        value={email}
        onChange={(e) => setNewEmail(e.target.value)}
        type="email"
        required
        placeholder="Email"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
      />
      <input
        value={password}
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        required
        placeholder="Password"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        required
        placeholder="Confirm password"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
      />

      <button
        type="submit"
        disabled={submit}
        className="bg-blue-200 rounded-md border border-gray-200 disabled:bg-red-800 disabled:text-white disabled={false}"
      >
        Submit
      </button>
    </form>
  );
}
