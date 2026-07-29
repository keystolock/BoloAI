import type { Metadata } from 'next';
import Link from 'next/link';
import HomePage from '@/app/page';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free English AI Text to Speech (No Signup Required) | BoloAI',
  description: 'Convert English text into clear, natural sounding AI voices for free. High quality MP3 downloads with Ava, Guy, Neerja & Prabhat.',
  keywords: ['free english tts', 'english ai voice generator', 'text to speech english mp3', 'ava english voice', 'guy english voice'],
  openGraph: {
    title: 'Free English AI Text to Speech | BoloAI',
    description: 'Convert English text into natural AI voice instantly for free.',
    url: 'https://boloai-five.vercel.app/english',
  },
};

export default function EnglishTTSPage() {
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
          🌐 Dedicated English AI Voice Page
        </span>
      </div>

      <section className="text-center space-y-2 bg-blue-50/80 p-5 rounded-2xl border border-blue-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>English AI Voice Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Free English AI Text to Speech
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Convert English text into realistic US & Indian accent AI voice. Download MP3 audio for free.
        </p>
      </section>

      <HomePage />
    </div>
  );
}
