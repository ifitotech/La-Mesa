import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { CountryProvider } from "@/contexts/CountryContext";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Mesa · Game Night",
    template: "%s · La Mesa",
  },
  description: "Juega, conecta y disfruta de una gran noche de juegos con amigos.",
  applicationName: "La Mesa",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "La Mesa",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: "La Mesa",
    title: "La Mesa · Game Night",
    description:
      "Juega, conecta y disfruta de una gran noche de juegos con amigos.",
    images: ["/la-mesa-logo-v2.png"],
  },
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
