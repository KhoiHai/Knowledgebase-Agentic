"""Điểm khởi động: tạo app, gắn các router, phục vụ giao diện web."""
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api import chat

app = FastAPI(title="Knowledgebase Agentic")

# Mỗi tính năng mới = 1 router mới, gắn vào đây
app.include_router(chat.router)

# Khi dev: frontend chạy riêng bằng `npm run dev` (cổng 5173).
# Sau khi `npm run build`: FastAPI phục vụ luôn bản build tại http://localhost:8000/
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
