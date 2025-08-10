# Interactive Q&A LLM App

A full-stack web application that provides interactive Q&A functionality using Large Language Models (LLM). Built with FastAPI backend and Next.js frontend.

## Tech Stack

- **Backend**: FastAPI, Python 3.8+
- **Frontend**: Next.js, React, Tailwind CSS
- **LLM Provider**: Google Gemini API
- **HTTP Client**: httpx (async)
- **Styling**: Tailwind CSS
- **Markdown Rendering**: react-markdown

## Project Structure

```
interactive-qa-llm-app/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   └── llm_client.py
│   │   ├── utils/
│   │   │   └── prompt.py
│   │   ├── main.py
│   │   ├── routers.py
│   │   └── schemas.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── components/
│   │   └── QABox.js
│   ├── pages/
│   │   └── index.js
│   └── package.json
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Gemini API key from Google AI Studio

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp ../.env.example .env
# Edit .env and add your Gemini API key
```

5. Run the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
GOOGLE_API_KEY=your_api_key_here
BACKEND_PORT=8000
FRONTEND_ORIGIN=http://localhost:3000
```

## API Endpoints

### POST /api/ask

Request body:
```json
{
  "question": "What documents do I need to travel from Kenya to Ireland?"
}
```

Response:
```json
{
  "question": "What documents do I need to travel from Kenya to Ireland?",
  "answer": "# Summary\n\n...",
  "raw": { ... }
}
```

## Prompts Used

The system uses structured prompts to ensure consistent response formatting:

```
You are an expert assistant. When given a question, respond in Markdown with headings in this exact order:
1. Summary (1-2 sentences)
2. Required Documents (bulleted list)
3. Passport Requirements (bulleted list)
4. Additional Documents (bulleted list)
5. Travel Advisories / Notes (short)
Keep answers practical and concise. If you are unsure, say so and give resources.

User question: {question}
```

## Features

- ✅ Interactive Q&A interface
- ✅ Real-time LLM responses via Gemini API
- ✅ Markdown rendering for structured responses
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ CORS-enabled API
- ✅ Structured prompt engineering

## Testing

Test the backend API directly:
```bash
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What documents for Kenya to Ireland travel?"}'
```

## Rate Limits & Notes

- Gemini API has rate limits on free tier
- Responses are limited to 700 tokens
- Keep API keys secure and never commit them to version control
- The adapter pattern in `llm_client.py` makes it easy to switch LLM providers

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables if needed

### Backend (Render/Railway)
1. Use `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
2. Set environment variables: `LLM_PROVIDER`, `GEMINI_API_KEY`

## License

MIT License