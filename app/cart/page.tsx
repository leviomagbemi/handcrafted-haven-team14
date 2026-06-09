'use client';

import { useCart } from '@/app/lib/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/app/lib/utils';
import Button from '@/app/ui/button';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">🛒</div>

        <h2 className="text-4xl font-bold text-brown mb-4">
          Your cart is empty
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Looks like you haven't added any handmade treasures yet.
        </p>

        <Link
          href="/dashboard/categories"
          className="bg-primary hover:bg-[#2b4235] text-white px-8 py-3 rounded-lg text-xl font-medium transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-brown mb-10">
        Shopping Cart
      </h1>

      <div className="space-y-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-6 bg-white border border-tan rounded-xl p-4 shadow-sm"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg relative border border-gray-100 bg-gray-50">
              <img
                src={item.image_url}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg md:text-xl font-bold text-brown leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-lg md:text-xl font-extrabold text-green">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>

                {item.artisan_name && (
                  <p className="text-xs text-brown/60 mt-1">
                    by {item.artisan_name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center border border-brown/30 rounded-lg">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 hover:bg-tan rounded-l-lg transition-colors text-base"
                  >
                    −
                  </button>

                  <span className="px-4 py-1 text-sm font-semibold border-x border-brown/30">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 hover:bg-tan rounded-r-lg transition-colors text-base"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-bold transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-12 border-t border-brown/30 pt-8">
        <div className="flex justify-between items-end mb-8">
          <span className="text-3xl font-medium text-brown">
            Total
          </span>

          <span className="text-4xl font-bold text-green">
            {formatCurrency(getTotalPrice())}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={clearCart}
            className="flex-1 py-4 border border-brown text-brown hover:bg-tan rounded-lg font-medium transition-colors"
          >
            Clear Cart
          </button>

          <button className="flex-1 bg-primary hover:bg-[#2b4235] text-white py-4 rounded-lg text-xl font-semibold transition-colors flex items-center justify-center">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}