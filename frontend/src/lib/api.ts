// Mọi lời gọi backend gom về đây
export async function sendChat(message: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    // Lấy thông báo lỗi từ FastAPI ({"detail": "..."}) nếu có
    const body = await res.json().catch(() => null);
    throw new Error(typeof body?.detail === "string" ? body.detail : `Lỗi máy chủ (HTTP ${res.status})`);
  }
  const data: { reply: string } = await res.json();
  return data.reply;
}

export function nowTime(): string {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}
