import io
import os
from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
import edge_tts

app = FastAPI(
    title="BoloAI Neural TTS API",
    description="100% Free AI Text-to-Speech API using Microsoft Edge TTS with Pitch and Rate Tuning",
    version="1.1.0"
)

# Enable CORS for Vercel frontend, mobile browsers & local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)

@app.get("/")
def read_root():
    return {
        "service": "BoloAI AI TTS API",
        "status": "online",
        "version": "1.1.0",
        "docs": "/docs"
    }

@app.get("/api/tts")
async def text_to_speech(
    text: str = Query(..., description="Text to convert to speech"),
    voice: str = Query("hi-IN-SwaraNeural", description="AI voice ID"),
    pitch: str = Query("+0Hz", description="Pitch adjustment e.g. +0Hz, +10Hz, -10Hz"),
    rate: str = Query("+0%", description="Speech rate adjustment e.g. +0%, +20%, -20%"),
    trim_silence: bool = Query(True, description="Trim extra spaces and silent punctuation for natural flow")
):
    """
    Synthesizes speech from text using edge-tts with pitch and rate controls.
    """
    # Clean up text and normalize excessive punctuation silences
    clean_text = text.strip()
    if trim_silence:
        # Normalize multiple spaces, tabs, and repeated punctuation marks to prevent long silent gaps
        import re
        clean_text = re.sub(r'\s+', ' ', clean_text)
        clean_text = re.sub(r'([.,!?।])\1+', r'\1', clean_text)

    if not clean_text:
        raise HTTPException(status_code=400, detail="Text parameter cannot be empty.")
    
    try:
        # edge-tts Communicate supports pitch and rate parameters directly
        communicator = edge_tts.Communicate(
            text=clean_text,
            voice=voice,
            pitch=pitch,
            rate=rate
        )
        audio_bytes = io.BytesIO()
        
        async for chunk in communicator.stream():
            if chunk["type"] == "audio":
                audio_bytes.write(chunk["data"])
                
        audio_content = audio_bytes.getvalue()
        
        if not audio_content:
            raise HTTPException(status_code=500, detail="Audio generation returned empty data.")

        return Response(
            content=audio_content,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "attachment; filename=speech.mp3",
                "Cache-Control": "public, max-age=3600",
                "Access-Control-Allow-Origin": "*"
            }
        )
    except Exception as e:
        print(f"TTS synthesis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"TTS synthesis error: {str(e)}")
