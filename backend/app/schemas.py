from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class QueryRequest(BaseModel):
    question: str
    chat_history: Optional[List[ChatMessage]] = []

class QueryResponse(BaseModel):
    question: str
    answer: str
    raw: dict | None = None