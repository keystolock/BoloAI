# BoloAI Deployment Guide (100% Free Stack)

BoloAI is designed to run 100% free with **Vercel** (Frontend) and **Hugging Face Spaces** (Backend).

---

## 1. Backend Deployment: Hugging Face Spaces (FastAPI + `edge-tts`)

1. Go to [Hugging Face Spaces](https://huggingface.co/new-space).
2. Choose a name for your Space (e.g., `boloai-tts-api`).
3. Select **Docker** as the SDK.
4. Set Space Hardware to **CPU basic - 2 vCPU · 16 GB - FREE**.
5. Upload all files from the `backend/` directory (`main.py`, `requirements.txt`, `Dockerfile`, `README.md`).
6. Once deployed, Hugging Face will provide your public Space URL:
   `https://<your-hf-username>-boloai-tts-api.hf.space`

---

## 2. Frontend Deployment: Vercel (Next.js)

1. Push the repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your repository and set the **Root Directory** to `frontend`.
4. Add the following Environment Variable:
   - `NEXT_PUBLIC_BACKEND_URL`: `https://<your-hf-username>-boloai-tts-api.hf.space` (or `http://localhost:8000` for local dev)
5. Click **Deploy**.

---

## 3. Local Development

### Start Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
