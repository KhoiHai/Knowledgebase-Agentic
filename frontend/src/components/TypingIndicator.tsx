import BotAvatar from "./BotAvatar";

export default function TypingIndicator() {
  return (
    <div className="animate-rise flex items-start gap-3">
      <BotAvatar />
      <div className="flex gap-1.5 rounded-[24px] rounded-tl-md bg-white px-5 py-5 shadow-soft">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="typing-dot size-2 rounded-full bg-brand-500" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  );
}
