'use client';

import React from 'react';
import { LANGUAGES, VOICES } from '@/lib/voices';
import { Globe, Mic, Check } from 'lucide-react';

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

  return (
    <div className="space-y-5">
      {/* 1. Language Selection Fieldset & Legend */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <span>1. Choose Language</span>
        </legend>

        {/* Responsive flex-wrap container ensuring all 10 languages fit inside the box */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLangChange(lang.code)}
                aria-label={`Select ${lang.name} language`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                <span className="text-[10px] opacity-80">({lang.nativeName})</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 2. Voice Selection Fieldset & Legend */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
          <Mic className="w-4 h-4 text-blue-600" />
          <span>2. Choose AI Voice</span>
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredVoices.map((voice) => {
            const isSelected = selectedVoice === voice.id;
            return (
              <button
                key={voice.id}
                type="button"
                onClick={() => onVoiceChange(voice.id)}
                aria-label={`Select ${voice.name} AI voice`}
                className={`p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 text-blue-950 ring-2 ring-blue-600/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{voice.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        voice.gender === 'Female'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {voice.gender}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5">{voice.localeName}</span>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};
