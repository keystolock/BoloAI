import io
import os
from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
import edge_tts

app = FastAPI(
    title="BoloAI Neural TTS API",
    description="100% Free Neural Text-to-Speech API using Microsoft Edge TTS",
    version="1.0.0"
)

# Allow requests from frontend (Vercel & local development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "BoloAI Neural TTS API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/tts")
async def text_to_speech(
    text: str = Query(..., description="Text to convert to speech"),
    voice: str = Query("hi-IN-SwaraNeural", description="Neural voice ID")
):
    """
    Synthesizes speech from text using edge-tts and returns raw MP3 stream.
    """
    clean_text = text.strip()
    if not clean_text:
        raise HTTPException(status_code=400, detail="Text parameter cannot be empty.")
    
    try:
        communicator = edge_tts.Communicate(text=clean_text, voice=voice)
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
                "Cache-Control": "public, max-age=3600"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS synthesis error: {str(e)}")
