'use client';

import React from 'react';
import { LANGUAGES, VOICES, Voice } from '@/lib/voices';
import { Globe, Mic, User, ChevronDown } from 'lucide-react';

interface VoiceSelectorProps {
  selectedLang: string;
  onLangChange: (langCode: string) => void;
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedLang,
  onLangChange,
  selectedVoice,
  onVoiceChange,
}) => {
  const filteredVoices = VOICES.filter((v) => v.langCode === selectedLang);
  const activeVoiceObj = VOICES.find((v) => v.id === selectedVoice) || filteredVoices[0];
  const activeLangObj = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Section 1: Language Dropdown */}
        <fieldset className="space-y-1.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>1. Select Language</span>
          </legend>

          <div className="relative">
            <select
              id="languageSelect"
              value={selectedLang}
              onChange={(e) => onLangChange(e.target.value)}
              aria-label="Select Language"
              className="w-full h-12 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white appearance-none cursor-pointer pr-10 transition shadow-xs"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-slate-900 py-1 font-medium">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </fieldset>

        {/* Section 2: Voice Dropdown */}
        <fieldset className="space-y-1.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1">
            <Mic className="w-4 h-4 text-blue-600" />
            <span>2. Select Voice</span>
          </legend>

          <div className="relative">
            <select
              id="voiceSelect"
              value={selectedVoice}
              onChange={(e) => onVoiceChange(e.target.value)}
              aria-label="Select AI Voice"
              className="w-full h-12 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white appearance-none cursor-pointer pr-10 transition shadow-xs"
            >
              {filteredVoices.map((voice) => (
                <option key={voice.id} value={voice.id} className="bg-white text-slate-900 py-1 font-medium">
                  {voice.name} ({voice.gender}) — {voice.localeName}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </fieldset>
      </div>

      {/* Active Voice Info Badge */}
      {activeVoiceObj && (
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-blue-50/80 border border-blue-100 rounded-xl text-xs">
          <span className="text-slate-700 font-medium flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            Selected Voice: <strong className="text-blue-900 font-bold">{activeVoiceObj.name}</strong> ({activeVoiceObj.gender})
          </span>
          <span className="text-slate-500 font-semibold hidden sm:inline">
            {activeLangObj.name} ({activeLangObj.nativeName})
          </span>
        </div>
      )}
    </div>
  );
};
