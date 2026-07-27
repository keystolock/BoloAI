# BoloAI 🎙️

BoloAI is a multi-language Text to Speech convertor platform. Built with a split architecture (Frontend +  Backend), it supports voices across Hindi and 10+ Indian languages.

This repository contains the FastAPI backend for **BoloAI**, an interactive, 100% free Neural Text-to-Speech application using Microsoft Edge Neural Voices via Python's `edge-tts`.
---

## 🌟 Key Features

1. Multilingual Support: Native text-to-speech interaction supporting Hindi, English, and 10+ Indian languages.
2. Dual-Terminal Architecture: Decoupled architecture using a Python backend engine alongside a responsive web frontend.
3. Low Latency Processing: Built for fast processing.
4. Download: Real-time unlimited and free mp3 audio audio file ready to download in seconds.

---

## 🛠️ Project Setup & Installation

This repository runs two local components (Frontend and Backend). Follow the steps below to run both terminals:

### 1. Backend Setup (Python API Engine)

Open your First Terminal in VS Code and run:

`bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run (recommended)
python -m uvicorn main:app --reload --port 8000



### 2. Frontend Setup
Open your Second terminal in vs code

`bash
# Navigate to backend directory
cd frontend

# Install Pyhon dependencies
npm install

# Run
npm run dev

### Run the website into localhost