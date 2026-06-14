'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './authContext';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
  artisan_name?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  // Wishlist / Saved Items
  wishlist: Omit<CartItem, 'quantity'>[];
  toggleWishlist: (item: Omit<CartItem, 'quantity'>) => void;
  isInWishlist: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Omit<CartItem, 'quantity'>[]>([]);
  const { isLoggedIn, user } = useAuth();

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('handcrafted-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const savedWishlist = localStorage.getItem('handcrafted-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch wishlist from database when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to load database wishlist');
      })
      .then(data => {
        if (Array.isArray(data)) {
          setWishlist(data);
        }
      })
      .catch(err => {
        console.error('Error fetching database wishlist:', err);
      });
    } else {
      // Revert to localStorage wishlist if logged out
      const savedWishlist = localStorage.getItem('handcrafted-wishlist');
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    }
  }, [isLoggedIn, user]);

  // Fetch cart from database when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to load database cart');
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCart(data);
        }
      })
      .catch(err => {
        console.error('Error fetching database cart:', err);
      });
    } else {
      // Revert to localStorage cart if logged out
      const savedCart = localStorage.getItem('handcrafted-cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
  }, [isLoggedIn, user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('handcrafted-cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('handcrafted-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // 1. Instantly update local state for UI responsiveness
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // 2. Sync with database if logged in
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: item.id, quantity: 1 }),
        });
      } catch (err) {
        console.error('Error syncing add-to-cart with database:', err);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    // 1. Instantly update local state
    setCart((prev) => prev.filter((item) => item.id !== id));

    // 2. Sync with database if logged in
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`/api/cart?itemId=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error('Error syncing remove-from-cart with database:', err);
      }
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    // 1. Instantly update local state
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    // 2. Sync with database if logged in
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      try {
        await fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: id, quantity }),
        });
      } catch (err) {
        console.error('Error syncing update-quantity with database:', err);
      }
    }
  };

  const clearCart = async () => {
    // 1. Instantly update local state
    setCart([]);

    // 2. Sync with database if logged in
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      try {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error('Error syncing clear-cart with database:', err);
      }
    }
  };


  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist methods
  const toggleWishlist = async (item: Omit<CartItem, 'quantity'>) => {
    // 1. Instantly update local state for UI responsiveness
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });

    // 2. Sync with database if logged in
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: item.id }),
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && Array.isArray(resData.wishlist)) {
            setWishlist(resData.wishlist);
          }
        } else {
          throw new Error('Failed to toggle wishlist in database');
        }
      } catch (err) {
        console.error('Error syncing wishlist with database:', err);
      }
    }
  };

  const isInWishlist = (id: string) => wishlist.some((i) => i.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};