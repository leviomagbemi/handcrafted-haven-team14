import "@/app/ui/globals.css";
import React from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { libreCaslonText, inter } from "@/app/ui/fonts";
import { Providers } from "@/app/ui/providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven | Premium Artisanal Marketplace",
  description: "Welcome to Handcrafted Haven, a curated marketplace for premium handcrafted goods. Bridging the gap between raw, tactile artistry and modern home aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreCaslonText.variable} ${inter.variable} font-sans bg-background text-on-background min-h-screen flex flex-col`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
