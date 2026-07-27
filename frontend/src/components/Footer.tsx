'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">BoloAI</span>
          <span>© {new Date().getFullYear()} BoloAI. All rights reserved.</span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="font-medium text-slate-600 hover:text-blue-600 underline underline-offset-2 transition-colors"
          >
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="font-medium text-slate-600 hover:text-blue-600 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <span className="text-slate-400">Free AI Speech</span>
        </div>
      </div>
    </footer>
  );
};
