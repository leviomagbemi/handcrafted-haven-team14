'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'BUYER' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      router.push('/login')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Join Handcrafted Haven</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
        />

        <select 
          className="w-full p-3 border rounded-lg mb-6"
          onChange={(e) => setForm({...form, role: e.target.value})}
        >
          <option value="BUYER">I want to Buy</option>
          <option value="SELLER">I want to Sell</option>
        </select>

        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700">
          Create Account
        </button>
      </form>
    </div>
  )
}