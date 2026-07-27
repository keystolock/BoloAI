---
title: BoloAI Neural TTS API
emoji: 🎙️
colorFrom: indigo
colorTo: violet
sdk: docker
app_port: 7860
pinned: false
license: mit
short_description: Free Neural Text-to-Speech API for BoloAI
---

# BoloAI - Neural Text-to-Speech Backend API

This repository contains the FastAPI backend for **BoloAI**, an interactive, 100% free Neural Text-to-Speech application using Microsoft Edge Neural Voices via Python's `edge-tts`.

## Features
- **Zero Cost Architecture**: Uses `edge-tts` without any paid API keys or subscription fees.
- **Fast & Memory Streamed**: Converts text directly to MP3 in memory using `io.BytesIO`.
- **CORS Configured**: Ready for frontend integration on Vercel or localhost.

## API Endpoint

### GET `/api/tts`
**Query Parameters:**
- `text` (required): The text string to synthesize.
- `voice` (optional, default: `hi-IN-SwaraNeural`): Edge TTS Voice identifier.

**Response:**
Returns `audio/mpeg` MP3 byte stream with header `Content-Disposition: attachment; filename=speech.mp3`.
