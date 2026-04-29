import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// URL FINAL DE NETLIFY
const baseUrl = 'https://pupuseriacr.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Pupusería | Pupusas Salvadoreñas Mixtas',
  description: 'Pupusas salvadoreñas mixtas a ₡2,000 colones cada una. ¡Haz tu pedido ahora por chat!',
  icons: {
    icon: '/assets/logo_share.png',
  },
  openGraph: {
    title: 'Pupusería | Pupusas Salvadoreñas Mixtas',
    description: 'Pide tus deliciosas pupusas mixtas por solo ₡2,000. Recolección de pedidos abierta ahora vía chat.',
    url: baseUrl,
    siteName: 'Pupusería El Salvador',
    images: [
      {
        url: `${baseUrl}/assets/logo_share.png?v=2`,
        width: 1200,
        height: 630,
        alt: 'Pupusería El Salvador - Pupusas Mixtas',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pupusería | Pupusas Salvadoreñas Mixtas',
    description: 'Pupusas salvadoreñas mixtas a ₡2,000 cada una.',
    images: [`${baseUrl}/assets/logo_share.png?v=2`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
