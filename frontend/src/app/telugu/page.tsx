import type { Metadata } from 'next';
import Link from 'next/link';
import HomePage from '@/app/page';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Telugu AI Text to Speech (తెలుగు AI వాయిస్) | BoloAI',
  description: 'Convert Telugu text into natural AI voice instantly for free. Download MP3 audio with Shruti & Mohan voices.',
  keywords: ['free telugu tts', 'telugu text to speech online', 'telugu ai voice generator', 'shruti telugu voice'],
  openGraph: {
    title: 'Free Telugu AI Text to Speech | BoloAI',
    description: 'Convert Telugu text into natural AI voice instantly for free.',
    url: 'https://boloai.vercel.app/telugu',
  },
};

export default function TeluguTTSPage() {
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
          🇮🇳 Dedicated Telugu (తెలుగు) AI Voice Page
        </span>
      </div>

      <section className="text-center space-y-2 bg-blue-50/80 p-5 rounded-2xl border border-blue-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Telugu AI Voice Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Free Telugu AI Text to Speech (తెలుగు AI వాయిస్)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Convert Telugu text into realistic Telugu audio with Shruti & Mohan voices. Download MP3 audio for free.
        </p>
      </section>

      <HomePage />
    </div>
  );
}
