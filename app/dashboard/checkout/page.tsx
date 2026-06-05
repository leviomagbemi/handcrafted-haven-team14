'use client';

import { useCart } from '@/app/lib/cartContext';
import { useState } from 'react';
import { formatCurrency } from '@/app/lib/utils';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    address: '',
    email: '',
  });

  const cardType = (number: string) => {
    const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercard = /^5[1-5][0-9]{14}$|^2[2-7][0-9]{14}$/;
    const amex = /^3[47][0-9]{13}$/;
    const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visa.test(number)) return 'Visa';
    if (mastercard.test(number)) return 'Mastercard';
    if (amex.test(number)) return 'Amex';
    if (discover.test(number)) return 'Discover';
    return '';
  };

  const luhnCheck = (num: string): boolean => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i], 10);
      if (isEven) digit *= 2;
      if (digit > 9) digit -= 9;
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const cleanCard = formData.cardNumber.replace(/\s+/g, '');
    
    if (!cleanCard) newErrors.cardNumber = "Card number is required";
    else if (!luhnCheck(cleanCard)) newErrors.cardNumber = "Invalid card number";
    else if (!cardType(cleanCard)) newErrors.cardNumber = "Unsupported card type";

    if (!formData.expiry) newErrors.expiry = "Expiry date required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) 
      newErrors.expiry = "Use MM/YY format";

    if (!formData.cvv) newErrors.cvv = "CVV required";
    else if (formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) 
      newErrors.email = "Valid email required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      alert("🎉 Payment Successful! Thank you for shopping at Handcrafted Haven.");
      clearCart();
      window.location.href = '/';
    }, 1800);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-brown">Your cart is empty</h2>
        <Link href="/" className="text-green underline mt-4 inline-block">Continue Shopping</Link>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-brown mb-8">Secure Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-4 sticky top-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-1">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">×{item.quantity}</p>
                </div>
                <p>{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
            <div className="border-t pt-4 text-xl font-bold flex justify-between">
              <span>Total</span>
              <span className="text-green">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
          <form onSubmit={handleSubmit} className="bg-white border border-tan rounded-2xl p-8 space-y-6">
            
            <div>
              <label className="block text-sm font-medium mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={19}
                className="w-full p-4 border rounded-xl text-lg"
              />
              {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
              {formData.cardNumber && cardType(formData.cardNumber.replace(/\s/g, '')) && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {cardType(formData.cardNumber.replace(/\s/g, ''))}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="12/28"
                  value={formData.expiry}
                  onChange={handleChange}
                  maxLength={5}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.expiry && <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  className="w-full p-4 border rounded-xl"
                />
                {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cardholder Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Shipping Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street, City, State"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="customer@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green hover:bg-brown text-white py-5 rounded-2xl text-xl font-semibold transition-all disabled:opacity-70 mt-4"
            >
              {isProcessing ? "Processing Secure Payment..." : `Pay ${formatCurrency(total)}`}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              🔒 Secured by 256-bit SSL • Powered by Stripe-like validation
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}