'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none rounded-lg p-1 transition"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Bolo<span className="text-blue-600">AI</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase">
              Free AI Voice Generator
            </span>
          </div>
        </Link>

        {/* Simple Header Badge */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Free Unlimited Voice
          </span>
        </div>
      </div>
    </header>
  );
};
