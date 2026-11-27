import re

from openai import OpenAI

from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

client = OpenAI(api_key=LLM_API_KEY, base_url=LLM_BASE_URL)

SYSTEM_PROMPT = (
    "Bạn là trợ lý tra cứu tài liệu nội bộ của doanh nghiệp. "
    "Trả lời ngắn gọn, chính xác, bằng tiếng Việt (trừ khi người dùng hỏi bằng ngôn ngữ khác). "
    "Nếu không chắc chắn, hãy nói rõ là bạn không biết thay vì bịa thông tin."
)

# Qwen3 đôi khi trả kèm phần suy nghĩ <think>...</think> trước câu trả lời
THINK_TAG = re.compile(r"<think>.*?</think>", re.DOTALL)


def generate_reply(message: str) -> str:
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message},
        ],
        temperature=0.7,
        max_tokens=4096,  # Qwen3 "suy nghĩ" trước (reasoning_content), phần đó cũng tính vào max_tokens
        top_p=1,
        presence_penalty=0,
        frequency_penalty=0,
        extra_body={"top_k": 40},  # top_k không phải tham số chuẩn của OpenAI nên gửi qua extra_body
    )

    content = response.choices[0].message.content or ""
    content = THINK_TAG.sub("", content).strip()
    return content or "Xin lỗi, mô hình không trả về nội dung. Bạn thử hỏi lại nhé."
