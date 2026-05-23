import React from 'react';
import { createContext, useContext, useState } from "react";

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  image_url?: string; // Make image_url optional
}

// Define the shape of the context value
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null; // Include user object
  login: (token: string) => void;
  logout: () => void;
}

// Create a new context for authentication
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component to wrap your application
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if localStorage is available before accessing it
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem("token");
    }
    return false;
  });

  // State to store user data
  const [user, setUser] = useState<User | null>(null);

  // Method to log the user in
  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    console.log("Token stored:", token);
    // Fetch user data after successful login
    fetchUserData();
  };

  // Method to log the user out
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null); // Clear user data on logout
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Example: Fetch user data from an API using the token
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Provide the authentication state, user data, and methods to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);
