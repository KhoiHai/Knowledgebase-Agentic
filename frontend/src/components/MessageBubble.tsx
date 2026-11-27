import { CheckCheck } from "lucide-react";
import type { Message } from "../types";
import BotAvatar from "./BotAvatar";

export default function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="animate-rise flex flex-col items-end">
        <div className="max-w-[80%] rounded-[24px] rounded-br-md bg-ink px-5 py-3.5 text-[15px] leading-relaxed whitespace-pre-wrap text-white">
          {message.content}
        </div>
        <span className="mt-1.5 flex items-center gap-1 text-xs text-muted">
          {message.time}
          <CheckCheck className="size-4 text-brand-500" />
        </span>
      </div>
    );
  }

  return (
    <div className="animate-rise flex items-start gap-3">
      <BotAvatar />
      <div className="flex max-w-[80%] flex-col items-start">
        <div
          className={`rounded-[24px] rounded-tl-md px-5 py-3.5 text-[15px] leading-relaxed whitespace-pre-wrap shadow-soft ${
            message.error ? "bg-red-50 text-red-700" : "bg-white"
          }`}
        >
          {message.content}
        </div>
        <span className="mt-1.5 text-xs text-muted">{message.time}</span>
      </div>
    </div>
  );
}
