'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VoiceSelector } from '@/components/VoiceSelector';
import { LANGUAGES, VOICES, PLACEHOLDERS, DEFAULT_HINDI_VOICE } from '@/lib/voices';
import { Sparkles, ArrowRight, Loader2, MessageSquare, AlertCircle, ShieldCheck, Zap, Download, Lock, Lightbulb } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string>('hi');
  const [selectedVoice, setSelectedVoice] = useState<string>(DEFAULT_HINDI_VOICE);
  const [text, setText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Switch language and only update voice if current voice does NOT belong to the new language
  const handleLangChange = (langCode: string) => {
    setSelectedLang(langCode);
    const voiceBelongsToLang = VOICES.some((v) => v.id === selectedVoice && v.langCode === langCode);
    if (!voiceBelongsToLang) {
      const firstVoice = VOICES.find((v) => v.langCode === langCode);
      if (firstVoice) {
        setSelectedVoice(firstVoice.id);
      }
    }
  };

  // Quick try sample text preset - FIX: NEVER reset user's selected voice if it belongs to the same language!
  const applyPreset = (sampleText: string, langCode: string) => {
    handleLangChange(langCode);
    setText(sampleText);
    setErrorMessage(null);
  };

  // Form submit -> Automatic Space Normalization -> Redirect to /result
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Automatic Space Normalization: clean up extra line breaks, double spaces, and trailing whitespace
    const sanitizedText = text.trim().replace(/\s+/g, ' ');
    if (!sanitizedText) {
      setErrorMessage('Please enter text before generating AI voice.');
      return;
    }

    if (sanitizedText.length > 3000) {
      setErrorMessage('Text limit is 3000 characters per request.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const encodedText = encodeURIComponent(sanitizedText);
      const encodedVoice = encodeURIComponent(selectedVoice);
      router.push(`/result?text=${encodedText}&voice=${encodedVoice}`);
    }, 300);
  };

  const activeLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];
  const activePlaceholder = PLACEHOLDERS[selectedLang] || PLACEHOLDERS['hi'];

  // Dynamic native script tip message
  const getHelperHint = () => {
    if (selectedLang === 'en') {
      return "💡 Tip: For best audio results, use proper punctuation and grammar.";
    }
    return `💡 Tip: For the most realistic and accurate voice, type in the native script (e.g., '${activeLang.nativeExample}') instead of English letters (e.g., '${activeLang.latinExample}').`;
  };

  // Structured Data for Google SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BoloAI Text to Speech",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://boloai.vercel.app",
    "description": "A 100% free, unlimited AI text-to-speech converter supporting Hindi, English, and 8 other Indian languages. No signup required.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "High-quality neural AI voices",
      "Supports 10+ Indian languages",
      "Instant MP3 download",
      "No login required"
    ]
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 opacity-100 transition-opacity duration-200">
      {/* JSON-LD Structured Data Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Hidden Secondary Heading for SEO & Screen Readers */}
      <h2 className="sr-only">
        Free AI Text to Speech Converter for Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi, and English.
      </h2>

      {/* Hero Section */}
      <section className="text-center space-y-2.5 px-2">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50/90 text-blue-700 border border-blue-200/80 shadow-xs backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>No Signup or Login Needed</span>
          <span className="text-blue-300">•</span>
          <span className="text-blue-600 font-extrabold">100% Free AI Voice</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Free AI Text to Speech <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            in Hindi & 10+ Indian Languages
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Convert text into realistic human AI audio instantly. Supports pure Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi & English.
        </p>
      </section>

      {/* SEO Dedicated Language Links Navigation Pill Bar with Classy Backdrop Blur */}
      <section className="p-1 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block px-1">
          Explore Dedicated Language Pages:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.slug}
              href={`/${lang.slug}`}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-white/70 hover:bg-white/95 text-slate-700 hover:text-blue-600 border border-slate-200/80 backdrop-blur-md shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>{lang.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Clean Form Container */}
      <form onSubmit={handleSubmit} className="space-y-5 py-2">
        {/* Controls: Language & Voice Selectors */}
        <VoiceSelector
          selectedLang={selectedLang}
          onLangChange={handleLangChange}
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
        />

        {/* Text Input Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ttsTextarea"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              3. Enter Text
            </label>
            <span className={`text-xs ${text.length > 2800 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
              {text.length} / 3000 chars
            </span>
          </div>

          <textarea
            id="ttsTextarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder={activePlaceholder}
            rows={5}
            disabled={isSubmitting}
            className="w-full p-3.5 sm:p-4 bg-white/80 backdrop-blur-md border border-slate-300/80 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs transition resize-y disabled:opacity-50"
          />
        </div>

        {/* Dynamic UI Helper Hint Below Textarea */}
        <div className="flex items-start gap-2 p-3 bg-blue-50/80 backdrop-blur-md border border-blue-100/90 rounded-xl text-xs text-slate-700">
          <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{getHelperHint()}</span>
        </div>

        {/* Sample Preset Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500 block">Try Example Prompts:</span>
          <div className="flex flex-wrap items-center gap-2">
            {LANGUAGES.slice(0, 6).map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => applyPreset(lang.sampleText, lang.code)}
                className="px-2.5 py-1 text-xs font-semibold bg-white/70 hover:bg-white/95 text-slate-700 border border-slate-200/80 backdrop-blur-md rounded-lg transition shadow-xs"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button: generateBtn */}
        <button
          type="submit"
          id="generateBtn"
          disabled={isSubmitting || !text.trim()}
          className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white glass-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Creating AI Voice...</span>
            </>
          ) : (
            <>
              <span>Text to Speech</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* SEO Feature Highlights Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Signup Required</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate unlimited audio without creating an account or providing email address. 100% free forever.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">10+ Indian Languages</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            High quality realistic AI voices in Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi & English.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Free MP3 Download</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Modify voice pitch, trim silent gaps, change playback rate, and download MP3 audio files instantly.
          </p>
        </div>
      </section>
    </div>
  );
}
