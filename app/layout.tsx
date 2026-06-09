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
        <AuthProvider>
          <CartProvider>
            <Header />

            <main>
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}