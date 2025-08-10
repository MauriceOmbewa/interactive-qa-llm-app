#!/bin/bash
echo "🚀 Starting FastAPI Backend..."
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000