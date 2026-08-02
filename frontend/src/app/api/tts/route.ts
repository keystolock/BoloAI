import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const voice = searchParams.get('voice') || 'hi-IN-SwaraNeural';
  const pitch = searchParams.get('pitch') || '+0Hz';
  const trimSilence = searchParams.get('trim_silence') !== 'false';

  if (!text.trim()) {
    return NextResponse.json({ detail: 'Text parameter cannot be empty.' }, { status: 400 });
  }

  // Backend candidates to proxy fetch on Vercel
  const backendBaseUrl =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000';

  const candidates = [
    backendBaseUrl,
    'http://localhost:8000',
    'http://localhost:7860',
  ].filter((url, index, self) => url && self.indexOf(url) === index);

  for (const baseUrl of candidates) {
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, '')}/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&pitch=${encodeURIComponent(pitch)}&trim_silence=${trimSilence}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'audio/mpeg',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const audioBuffer = await res.arrayBuffer();
        if (audioBuffer.byteLength > 0) {
          return new Response(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Disposition': 'attachment; filename=speech.mp3',
              'Cache-Control': 'public, max-age=3600',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      }
    } catch (err: any) {
      console.warn(`Vercel API Proxy failed for ${baseUrl}:`, err.message || err);
    }
  }

  return NextResponse.json(
    {
      detail:
        'Backend TTS service is currently offline or deploying. Please ensure your Python FastAPI backend (Hugging Face / Uvicorn) is running and NEXT_PUBLIC_BACKEND_URL is set in Vercel.',
    },
    { status: 503 }
  );
}
