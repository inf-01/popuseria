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

// URL ACTUAL EN NETLIFY
const baseUrl = 'https://pupuseriacr.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Pupusería | Pedidos Exclusivos',
  description: 'Haz tus pedidos de deliciosas pupusas mixtas preparadas cada quincena.',
  openGraph: {
    title: 'Pupusería - Especialidad en Mixtas',
    description: 'Pide tus pupusas mixtas (Chicharrón, Queso y Frijoles) por solo ₡2,000. ¡Haz tu pedido por chat!',
    url: baseUrl,
    siteName: 'Pupusería El Salvador',
    images: [
      {
        url: `${baseUrl}/assets/logo_share.png`,
        width: 1200,
        height: 630,
        alt: 'Pupusería el Salvador',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pupusería | Pedidos Exclusivos',
    description: 'Pide tus pupusas mixtas por ₡2,000 vía chat neumórfico.',
    images: [`${baseUrl}/assets/logo_share.png`],
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
