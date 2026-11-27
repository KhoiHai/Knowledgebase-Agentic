"""Đọc cấu hình từ file backend/.env (không hard-code API key trong code)."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")

LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://mkp-api.fptcloud.com")
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "Qwen3.6-27B")
