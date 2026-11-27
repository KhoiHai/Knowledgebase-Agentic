import logging

from fastapi import APIRouter, HTTPException
from openai import APIConnectionError, APIStatusError, AuthenticationError

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_reply

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    try:
        return ChatResponse(reply=generate_reply(req.message))
    except AuthenticationError:
        raise HTTPException(status_code=502, detail="API key của LLM không hợp lệ. Kiểm tra LLM_API_KEY trong backend/.env.")
    except APIConnectionError:
        raise HTTPException(status_code=502, detail="Không kết nối được tới dịch vụ LLM.")
    except APIStatusError as e:
        logger.exception("LLM trả về lỗi")
        raise HTTPException(status_code=502, detail=f"Dịch vụ LLM báo lỗi ({e.status_code}).")
