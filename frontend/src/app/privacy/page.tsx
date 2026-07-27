'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 py-4">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Last updated: July 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">1. Data Privacy & Confidentiality</h2>
            <p>
              Your privacy is paramount at BoloAI. We do not collect, save, or harvest your input text or synthesized MP3 audio on our servers. All processing is transient and in-memory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">2. Cookies & Local Storage</h2>
            <p>
              BoloAI does not use tracking cookies or persistent advertising trackers. Transient session data may be kept locally in your web browser solely to deliver instant audio playback.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">3. Third-Party Services</h2>
            <p>
              BoloAI relies on free public API infrastructure. No personal user credentials, email addresses, or phone numbers are ever required or logged.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
