import os
import httpx
from dotenv import load_dotenv
from ..utils.prompt import build_prompt

# Load environment variables from .env file
load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")
API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

async def ask_llm(question: str):
    prompt = build_prompt(question)
    
    if LLM_PROVIDER == "gemini":
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "maxOutputTokens": 700,
                "temperature": 0.7
            }
        }
        async with httpx.AsyncClient(timeout=30) as client:
            r = await client.post(url, json=payload)
            r.raise_for_status()
            j = r.json()
            content = j["candidates"][0]["content"]["parts"][0]["text"]
            return content, j
    else:
        raise NotImplementedError("Provider not implemented yet")