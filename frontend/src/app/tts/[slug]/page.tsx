import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LANGUAGES } from '@/lib/voices';
import HomePage from '@/app/page';
import { ArrowLeft, Sparkles, ShieldCheck, Globe, Volume2 } from 'lucide-react';

interface Props {
  params: { slug: string };
}

// Generate static params for all 10 Indian languages
export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({
    slug: lang.slug,
  }));
}

// Dynamic SEO metadata per language page
export function generateMetadata({ params }: Props): Metadata {
  const lang = LANGUAGES.find((l) => l.slug === params.slug.toLowerCase());
  if (!lang) {
    return { title: 'Language Not Found | BoloAI' };
  }

  return {
    title: lang.seoTitle,
    description: lang.seoDescription,
    keywords: lang.seoKeywords,
    openGraph: {
      title: lang.seoTitle,
      description: lang.seoDescription,
      url: `https://boloai.vercel.app/tts/${lang.slug}`,
      siteName: 'BoloAI',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: lang.seoTitle,
      description: lang.seoDescription,
    },
  };
}

export default function LanguageTTSPage({ params }: Props) {
  const lang = LANGUAGES.find((l) => l.slug === params.slug.toLowerCase());

  if (!lang) {
    notFound();
  }

  return (
    <div className="w-full space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Languages</span>
        </Link>
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          {lang.flag} Dedicated {lang.name} TTS Page
        </span>
      </div>

      {/* Language Specific Hero SEO Header */}
      <section className="text-center space-y-3 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white p-6 rounded-2xl border border-blue-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Dedicated {lang.name} ({lang.nativeName}) AI Voice Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Free {lang.name} AI Text to Speech
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {lang.seoDescription} Type in pure {lang.name} ({lang.nativeName}) script for realistic human audio synthesis and instant MP3 download.
        </p>
      </section>

      {/* Render Main App Generator */}
      <HomePage />
    </div>
  );
}
