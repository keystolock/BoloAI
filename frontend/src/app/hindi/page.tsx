import type { Metadata } from 'next';
import Link from 'next/link';
import HomePage from '@/app/page';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Hindi AI Text to Speech (No Signup Required) | BoloAI',
  description: 'Convert Hindi text to natural human AI voice instantly. 100% Free Unlimited MP3 download with Swara & Madhur voices in Hindi (हिंदी).',
  keywords: ['free hindi tts', 'hindi ai text to speech', 'convert hindi text to audio', 'swara hindi voice', 'madhur hindi voice mp3', 'hindi voice generator no signup'],
  openGraph: {
    title: 'Free Hindi AI Text to Speech | BoloAI',
    description: 'Convert Hindi text to natural human AI voice instantly for free.',
    url: 'https://boloai-five.vercel.app/hindi',
  },
};

export default function HindiTTSPage() {
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
          🇮🇳 Dedicated Hindi (हिंदी) AI Voice Page
        </span>
      </div>

      <section className="text-center space-y-2 bg-blue-50/80 p-5 rounded-2xl border border-blue-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Hindi AI Voice Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Free Hindi AI Text to Speech
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Convert Hindi text into realistic Devanagari AI audio with Swara & Madhur voices. No signup required.
        </p>
      </section>

      <HomePage />
    </div>
  );
}
