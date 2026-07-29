'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { VOICES } from '@/lib/voices';
import { Download, RefreshCw, Volume2, AlertCircle, Loader2, Play, Pause, CheckCircle2, ArrowLeft, Gauge, Sliders, Scissors } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const text = searchParams.get('text') || '';
  const voice = searchParams.get('voice') || 'hi-IN-SwaraNeural';

  const [pitch, setPitch] = useState<string>('+0Hz');
  const [trimSilence, setTrimSilence] = useState<boolean>(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceObj = VOICES.find((v) => v.id === voice) || VOICES[0];

  const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (!text) {
      setError('No text parameter found. Please enter text on the home page.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchAudio = async () => {
      setIsLoading(true);
      setError(null);

      // Backend URL Candidate List for resilient fetch
      const candidateUrls = [
        process.env.NEXT_PUBLIC_BACKEND_URL,
        'http://localhost:8000',
        'http://localhost:7860',
        '' // Relative path fallback
      ].filter((url, index, self) => url !== undefined && self.indexOf(url) === index);

      let success = false;
      let lastErrorMessage = 'Failed to connect to AI Voice Backend service.';

      for (const baseUrl of candidateUrls) {
        if (!isMounted) break;
        try {
          const endpoint = baseUrl 
            ? `${baseUrl.replace(/\/$/, '')}/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&pitch=${encodeURIComponent(pitch)}&trim_silence=${trimSilence}`
            : `/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&pitch=${encodeURIComponent(pitch)}&trim_silence=${trimSilence}`;

          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'audio/mpeg',
            },
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || `Server status ${response.status}: ${response.statusText}`);
          }

          const blob = await response.blob();
          if (blob.size === 0) {
            throw new Error('Audio generation produced empty file content.');
          }

          const generatedBlobUrl = URL.createObjectURL(blob);

          if (isMounted) {
            setAudioUrl(generatedBlobUrl);
            setIsLoading(false);
            success = true;
          }
          break; // Stop loop on successful fetch
        } catch (err: any) {
          console.warn(`TTS Fetch attempt failed for ${baseUrl}:`, err);
          lastErrorMessage = err.message || lastErrorMessage;
        }
      }

      if (!success && isMounted) {
        setError(lastErrorMessage);
        setIsLoading(false);
      }
    };

    fetchAudio();

    return () => {
      isMounted = false;
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [text, voice, pitch, trimSilence]);

  // Dynamically update audio playback rate
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Toggle play/pause (Permission-free mobile playback)
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log('Mobile audio playback error:', e);
          setIsPlaying(false);
        });
    }
  };

  // Download MP3 file
  const handleDownload = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    const sanitizedFileName = `BoloAI_${voiceObj.name}_${Date.now()}.mp3`;
    link.download = sanitizedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full space-y-6 max-w-xl mx-auto opacity-100 transition-opacity duration-200">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Editor</span>
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50/90 text-blue-700 border border-blue-200/80 shadow-xs backdrop-blur-md">
          <Volume2 className="w-3.5 h-3.5 text-blue-600" />
          <span>AI Speech Ready</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Listen & Download Speech
        </h1>
      </div>

      {/* Main Result Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
        {/* Text Preview Card */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Voice: {voiceObj.name} ({voiceObj.gender})</span>
            <span>{voiceObj.localeName}</span>
          </div>
          <p className="text-sm text-slate-800 italic line-clamp-3">
            "{text}"
          </p>
        </div>

        {/* Dynamic Voice Fine-Tuning Controls (Pitch & Silence Trimming) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200">
          {/* Pitch Control */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Voice Pitch</span>
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-lg border border-slate-200">
              {[
                { label: 'Lower', value: '-10Hz' },
                { label: 'Normal', value: '+0Hz' },
                { label: 'Higher', value: '+10Hz' },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPitch(p.value)}
                  className={`py-1 text-[11px] font-semibold rounded transition ${
                    pitch === p.value
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Natural Silence Trimming Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-blue-600" />
              <span>Natural Silence Trimming</span>
            </label>
            <button
              type="button"
              onClick={() => setTrimSilence(!trimSilence)}
              className={`w-full py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between transition ${
                trimSilence
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <span>Trim Long Silent Gaps</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trimSilence ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {trimSilence ? 'ACTIVE' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <Loader2 className="w-9 h-9 text-blue-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-600">
              Updating audio with pitch & silence modifications...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-red-700 font-semibold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>Conversion Failed</span>
            </div>
            <p className="text-xs text-slate-600">{error}</p>
            <button
              id="retryBtn"
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Audio Player Interface */}
        {!isLoading && !error && audioUrl && (
          <div className="space-y-6">
            <div className="bg-blue-50/60 p-6 rounded-xl border border-blue-100 flex flex-col items-center justify-center space-y-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>

              {/* Mobile-friendly HTML5 Audio Player */}
              <audio
                id="player"
                ref={audioRef}
                src={audioUrl}
                controls
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full mt-2 accent-blue-600"
              />
            </div>

            {/* Playback Speed Controls Row (Just 1x, no '(Default)' text) */}
            <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span>Interactive Playback Speed</span>
              </div>
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {SPEED_OPTIONS.map((rate) => {
                  const isActive = playbackRate === rate;
                  return (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleSpeedChange(rate)}
                      className={`flex-1 py-2 text-xs rounded-lg transition-all font-semibold ${
                        isActive
                          ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                          : 'bg-white hover:bg-slate-200/80 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {rate}x
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: downloadBtn & retryBtn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="downloadBtn"
                onClick={handleDownload}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white glass-button flex items-center justify-center gap-2 shadow-sm"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Downloaded MP3!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download MP3</span>
                  </>
                )}
              </button>

              <button
                id="retryBtn"
                onClick={() => router.push('/')}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading Result Page...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
