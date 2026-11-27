import { SquarePen } from "lucide-react";
import BotAvatar from "./BotAvatar";

interface Props {
  onNewChat: () => void;
  canReset: boolean;
}

export default function ChatHeader({ onNewChat, canReset }: Props) {
  return (
    <header className="flex items-center gap-4 px-5 pt-6 pb-4 sm:px-8">
      <BotAvatar size="lg" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-extrabold tracking-tight">Knowledgebase Agentic</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <span className="size-2 rounded-full bg-emerald-500" />
          Trợ lý tra cứu tài liệu doanh nghiệp
        </p>
      </div>
      <button
        onClick={onNewChat}
        disabled={!canReset}
        title="Cuộc trò chuyện mới"
        className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold shadow-soft transition hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SquarePen className="size-4" />
        <span className="hidden sm:inline">Chat mới</span>
      </button>
    </header>
  );
}
