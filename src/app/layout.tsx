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

export const metadata: Metadata = {
  metadataBase: new URL('https://crpupuseria.vercel.app'),
  title: 'Pupusería | Pedidos Exclusivos',
  description: 'Haz tus pedidos de deliciosas pupusas mixtas con curtido preparadas cada quincena.',
  openGraph: {
    title: 'Pupusería - Especialidad en Mixtas',
    description: 'Pide tus pupusas mixtas (Chicharrón, Queso y Frijoles) por solo ₡2,000. Recolección de pedidos abierta ahora.',
    url: 'https://crpupuseria.vercel.app',
    siteName: 'Pupusería El Salvador',
    images: [
      {
        url: 'https://crpupuseria.vercel.app/assets/PUPUSERIA.png',
        width: 1200,
        height: 630,
        alt: 'Deliciosas Pupusas Mixtas',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pupusería | Pedidos Exclusivos',
    description: 'Pide tus pupusas mixtas por ₡2,000 vía chat neumórfico.',
    images: ['https://crpupuseria.vercel.app/assets/PUPUSERIA.png'],
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
