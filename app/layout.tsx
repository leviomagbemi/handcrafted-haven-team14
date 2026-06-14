import "@/app/ui/globals.css";
import React from "react";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { poppins, inter } from "@/app/ui/fonts";
import { AuthProvider } from "./lib/authContext";
import { CartProvider } from "./lib/cartContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Welcome to the Handcrafted Haven online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-1 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <CartProvider>
            <Header />

            <main id="main-content">
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}