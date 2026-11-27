import { useEffect, useRef, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import Composer from "./components/Composer";
import EmptyState from "./components/EmptyState";
import MessageBubble from "./components/MessageBubble";
import TypingIndicator from "./components/TypingIndicator";
import { nowTime, sendChat } from "./lib/api";
import type { Message } from "./types";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Tự cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text: string) {
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await sendChat(text);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content: reply, time: nowTime() }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content:
            err instanceof TypeError
              ? "Không kết nối được backend. Kiểm tra FastAPI đã chạy chưa nhé."
              : (err as Error).message,
          time: nowTime(),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-dvh items-center justify-center sm:p-6">
      <div className="flex h-dvh w-full max-w-5xl flex-col overflow-hidden bg-surface sm:h-[min(880px,calc(100dvh-48px))] sm:rounded-[40px] sm:shadow-[0_30px_80px_-30px_rgb(23_23_28/0.35)] sm:ring-1 sm:ring-white">
        <ChatHeader onNewChat={() => setMessages([])} canReset={!isEmpty && !loading} />

        <main className={`flex-1 px-5 sm:px-8 ${isEmpty ? "overflow-hidden" : "overflow-y-auto"}`}>
          {isEmpty ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-5 py-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </main>

        <Composer onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
