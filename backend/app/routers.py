from fastapi import APIRouter, HTTPException
from .schemas import QueryRequest, QueryResponse
from .services.llm_client import ask_llm

router = APIRouter()

@router.post("/ask", response_model=QueryResponse)
async def ask(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question is empty")
    try:
        answer, raw = await ask_llm(req.question, req.chat_history)
        return QueryResponse(question=req.question, answer=answer, raw=raw)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))