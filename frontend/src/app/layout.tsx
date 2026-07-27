import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};



export const metadata: Metadata = {
  title: 'BoloAI - Free AI Text to Speech in Hindi & 10+ Indian Languages',
  description:
    'Convert text to realistic human AI voice instantly and entirely for free. Supports pure Hindi, Marathi, Bengali, Tamil, Telugu, and English. No login required, unlimited MP3 downloads.',
  keywords: [
    'free ai voice generator hindi',
    'text to speech online free download',
    'convert hindi text to audio free',
    'best hindi tts without login',
    'marathi text to speech voice maker',
    'bengali voice generator',
    'tamil ai voice generator',
    'telugu text to speech mp3',
    'natural sounding ai voice free',
    'BoloAI',
  ],
  authors: [{ name: 'BoloAI Team' }],
  creator: 'BoloAI',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://boloai.vercel.app'),
  openGraph: {
    title: 'BoloAI - Free AI Text to Speech in Hindi & 10+ Indian Languages',
    description:
      'Convert text to realistic human AI voice instantly and entirely for free. Supports pure Hindi, Marathi, Bengali, Tamil, Telugu, and English. No login required, unlimited MP3 downloads.',
    url: 'https://boloai.vercel.app',
    siteName: 'BoloAI',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoloAI - Free AI Text to Speech in Hindi & 10+ Indian Languages',
    description: 'Convert text to realistic human AI voice instantly and entirely for free. No login required.',
  },
  robots: {
    index: true,
    follow: true,
  },

  verification:{
    
    google:"B3yPd0vIYHiks4S2Co5mF9jIIE0gH1b0NuQBSXmYBDc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BoloAI Text to Speech',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boloai.vercel.app',
    description:
      'A 100% free, unlimited AI text-to-speech converter supporting Hindi, English, and 8 other Indian languages. No signup required.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'High-quality neural AI voices',
      'Supports 10+ Indian languages',
      'Instant MP3 download',
      'No login required',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
