'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Terms & Conditions</h1>
            <p className="text-xs text-slate-500">Last updated: July 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">1. Acceptance of Terms</h2>
            <p>
              By accessing and using BoloAI ("the Application"), you agree to comply with and be bound by these Terms & Conditions. BoloAI provides 100% free text-to-speech audio generation services for personal and commercial educational use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">2. Free Usage & Services</h2>
            <p>
              BoloAI is completely free for all users. You can generate speech in multiple Indian languages (Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi) and English without any subscription fees or account creation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use BoloAI to generate content that is illegal, defamatory, hateful, harassing, or intended for deceptive impersonation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">4. Disclaimer & Limitations</h2>
            <p>
              BoloAI is provided "as is" without warranty of any kind. Audio files generated on the platform are stored temporarily in your local browser session and are not stored on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-800">5. Contact</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at support@boloai.app.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
