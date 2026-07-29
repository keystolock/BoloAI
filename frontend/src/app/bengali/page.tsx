import type { Metadata } from 'next';
import Link from 'next/link';
import HomePage from '@/app/page';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Bengali AI Text to Speech (বাংলা AI ভয়েস) | BoloAI',
  description: 'Convert Bengali text to realistic AI speech for free online. Download MP3 in Bengali with Tanishaa & Bashkar voices.',
  keywords: ['free bengali tts', 'bengali text to speech online', 'bengali ai voice generator', 'tanishaa bengali voice'],
  openGraph: {
    title: 'Free Bengali AI Text to Speech | BoloAI',
    description: 'Convert Bengali text to natural AI voice instantly for free.',
    url: 'https://boloai.vercel.app/bengali',
  },
};

export default function BengaliTTSPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Languages</span>
        </Link>
        <span className="text-xs font-semibold text-slate-500">
          🇮🇳 Dedicated Bengali (বাংলা) AI Voice Page
        </span>
      </div>

      <section className="text-center space-y-2 bg-blue-50/80 p-5 rounded-2xl border border-blue-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Bengali AI Voice Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Free Bengali AI Text to Speech (বাংলা AI ভয়েস)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Convert Bengali text into realistic Bengali speech with Tanishaa & Bashkar voices. Download MP3 audio for free.
        </p>
      </section>

      <HomePage />
    </div>
  );
}
