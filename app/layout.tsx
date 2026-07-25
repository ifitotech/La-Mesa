import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { CountryProvider } from "@/contexts/CountryContext";

export const metadata: Metadata = {
  title: "La Mesa",
  description: "Play Domino, Parchís and more with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <AuthProvider><CountryProvider>{children}</CountryProvider></AuthProvider>
      </body>
    </html>
  );
}
