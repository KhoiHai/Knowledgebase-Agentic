import { ArrowUp, Paperclip } from "lucide-react";
import { useState, type FormEvent } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function Composer({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const canSend = text.trim() !== "" && !disabled;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="px-5 pt-2 pb-5 sm:px-8 sm:pb-7">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full bg-white p-2 shadow-soft ring-1 ring-black/5">
        <button
          type="button"
          disabled
          title="Upload tài liệu (sắp có)"
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted disabled:opacity-50"
        >
          <Paperclip className="size-5" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hỏi về tài liệu của công ty..."
          autoFocus
          className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Gửi"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow ring-4 ring-brand-100 transition hover:scale-105 disabled:scale-100 disabled:from-neutral-300 disabled:to-neutral-300 disabled:shadow-none disabled:ring-transparent"
        >
          <ArrowUp className="size-5" strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
