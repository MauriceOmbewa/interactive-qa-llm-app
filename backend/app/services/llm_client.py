import os
import httpx
from dotenv import load_dotenv
from ..utils.prompt import build_prompt

# Load environment variables from .env file
load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")
API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

async def ask_llm(question: str, chat_history=None):
    if not API_KEY:
        raise ValueError("API key not found. Please set GEMINI_API_KEY or GOOGLE_API_KEY in your .env file")
    
    prompt = build_prompt(question, chat_history)
    
    if LLM_PROVIDER == "gemini":
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={API_KEY}"
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "maxOutputTokens": 700,
                "temperature": 0.7
            }
        }
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                r = await client.post(url, json=payload)
                r.raise_for_status()
                j = r.json()
                content = j["candidates"][0]["content"]["parts"][0]["text"]
                return content, j
        except httpx.HTTPStatusError as e:
            raise ValueError(f"API request failed: {e.response.status_code} - {e.response.text}")
        except Exception as e:
            raise ValueError(f"LLM request failed: {str(e)}")
    else:
        raise NotImplementedError("Provider not implemented yet")