import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { CountryProvider } from "@/contexts/CountryContext";

export const metadata: Metadata = {
  title: {
    default: "La Mesa · Game Night",
    template: "%s · La Mesa",
  },
  description: "Juega, conecta y disfruta de una gran noche de juegos con amigos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-white">
        <AuthProvider>
          <CountryProvider>{children}</CountryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
